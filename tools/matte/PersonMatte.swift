// PersonMatte.swift — per-frame person segmentation using Apple's Vision framework.
//
// Reads a video, runs VNGeneratePersonSegmentationRequest on every frame, and
// writes a grayscale MATTE video (person = white, background = black) at the
// source resolution and frame rate. tools/cutout_video.py then alphamerges the
// matte back onto the source to produce a real alpha channel.
//
// Vision ships with macOS — no model downloads, no API keys, no per-frame cost,
// and it runs on the Neural Engine. That is why this is Swift and not rembg.
//
// Build:  swiftc -O -o tools/matte/person-matte tools/matte/PersonMatte.swift
// Usage:  person-matte <input.mov> <matte.mov> [fast|balanced|accurate]

import AVFoundation
import CoreImage
import Foundation
import Vision

// ── args ────────────────────────────────────────────────────────────────────
let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("usage: person-matte <input> <matte-out> [fast|balanced|accurate]\n".data(using: .utf8)!)
    exit(2)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
let qualityName = args.count > 3 ? args[3] : "accurate"
let quality: VNGeneratePersonSegmentationRequest.QualityLevel = {
    switch qualityName {
    case "fast": return .fast
    case "balanced": return .balanced
    default: return .accurate
    }
}()

func die(_ msg: String) -> Never {
    FileHandle.standardError.write("person-matte: \(msg)\n".data(using: .utf8)!)
    exit(1)
}

// ── source ──────────────────────────────────────────────────────────────────
let asset = AVURLAsset(url: inURL)
let sem = DispatchSemaphore(value: 0)
var track: AVAssetTrack?
var natural = CGSize.zero
var fps: Float = 30
var transform = CGAffineTransform.identity

Task {
    guard let t = try? await asset.loadTracks(withMediaType: .video).first else { sem.signal(); return }
    track = t
    natural = (try? await t.load(.naturalSize)) ?? .zero
    fps = (try? await t.load(.nominalFrameRate)) ?? 30
    transform = (try? await t.load(.preferredTransform)) ?? .identity
    sem.signal()
}
sem.wait()
guard let videoTrack = track else { die("no video track in \(inURL.lastPathComponent)") }
if fps <= 0 { fps = 30 }

// honour rotation metadata so portrait clips do not come out sideways
let rotated = abs(transform.b) == 1 && abs(transform.c) == 1
let outSize = rotated ? CGSize(width: natural.height, height: natural.width) : natural
let W = Int(outSize.width.rounded()), H = Int(outSize.height.rounded())
guard W > 0, H > 0 else { die("bad dimensions \(W)x\(H)") }

guard let reader = try? AVAssetReader(asset: asset) else { die("cannot open reader") }
let readerOut = AVAssetReaderTrackOutput(
    track: videoTrack,
    outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
readerOut.alwaysCopiesSampleData = false
reader.add(readerOut)

// ── destination (grayscale carried in luma; ffmpeg reads it with format=gray) ─
try? FileManager.default.removeItem(at: outURL)
guard let writer = try? AVAssetWriter(outputURL: outURL, fileType: .mov) else { die("cannot open writer") }
let writerIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: W,
    AVVideoHeightKey: H,
    // the matte must survive compression — soft edges are the whole point
    AVVideoCompressionPropertiesKey: [AVVideoQualityKey: 1.0,
                                      AVVideoAverageBitRateKey: W * H * 8],
])
writerIn.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(
    assetWriterInput: writerIn,
    sourcePixelBufferAttributes: [
        kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
        kCVPixelBufferWidthKey as String: W,
        kCVPixelBufferHeightKey as String: H,
    ])
writer.add(writerIn)

guard writer.startWriting() else { die("startWriting failed: \(writer.error?.localizedDescription ?? "?")") }
writer.startSession(atSourceTime: .zero)
guard reader.startReading() else { die("startReading failed: \(reader.error?.localizedDescription ?? "?")") }

// ── segmentation loop ───────────────────────────────────────────────────────
let ciContext = CIContext(options: [.useSoftwareRenderer: false])
let request = VNGeneratePersonSegmentationRequest()
request.qualityLevel = quality
request.outputPixelFormat = kCVPixelFormatType_OneComponent8

var frames = 0
var missed = 0

while let sample = readerOut.copyNextSampleBuffer() {
    guard let src = CMSampleBufferGetImageBuffer(sample) else { continue }
    let pts = CMSampleBufferGetPresentationTimeStamp(sample)

    var matte: CIImage
    let handler = VNImageRequestHandler(cvPixelBuffer: src, orientation: .up, options: [:])
    if (try? handler.perform([request])) != nil,
       let mask = (request.results?.first)?.pixelBuffer {
        let m = CIImage(cvPixelBuffer: mask)
        // Vision returns the mask at its own working resolution — scale to source
        let sx = CGFloat(CVPixelBufferGetWidth(src)) / m.extent.width
        let sy = CGFloat(CVPixelBufferGetHeight(src)) / m.extent.height
        matte = m.transformed(by: CGAffineTransform(scaleX: sx, y: sy))
    } else {
        // no person found: emit a fully transparent frame rather than a wrong one
        missed += 1
        matte = CIImage(color: .black).cropped(to: CGRect(x: 0, y: 0,
                                                          width: CGFloat(CVPixelBufferGetWidth(src)),
                                                          height: CGFloat(CVPixelBufferGetHeight(src))))
    }

    if rotated || transform != .identity {
        matte = matte.transformed(by: transform)
        matte = matte.transformed(by: CGAffineTransform(translationX: -matte.extent.origin.x,
                                                       y: -matte.extent.origin.y))
    }

    while !writerIn.isReadyForMoreMediaData { usleep(2000) }
    guard let pool = adaptor.pixelBufferPool else { die("no pixel buffer pool") }
    var outBuf: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(kCFAllocatorDefault, pool, &outBuf)
    guard let dst = outBuf else { die("cannot allocate output buffer") }

    // Buffers come back from the pool RECYCLED, still holding an old frame, and
    // ciContext.render only touches the image's own extent. Compositing over a
    // full-size black field first guarantees every pixel is written — otherwise
    // stale mattes bleed through and the cutout ghosts worse as the clip runs.
    let field = CIImage(color: .black).cropped(to: CGRect(x: 0, y: 0, width: CGFloat(W), height: CGFloat(H)))
    let frameImage = matte.composited(over: field)
    ciContext.render(frameImage, to: dst, bounds: field.extent, colorSpace: CGColorSpaceCreateDeviceRGB())
    adaptor.append(dst, withPresentationTime: pts)

    frames += 1
    if frames % 30 == 0 {
        FileHandle.standardError.write("  \(frames) frames\r".data(using: .utf8)!)
    }
}

writerIn.markAsFinished()
let done = DispatchSemaphore(value: 0)
writer.finishWriting { done.signal() }
done.wait()

if writer.status != .completed { die("write failed: \(writer.error?.localizedDescription ?? "?")") }

let pct = frames > 0 ? Int(Double(missed) / Double(frames) * 100) : 0
print("matte: \(frames) frames  \(W)x\(H) @\(String(format: "%.2f", fps))fps  quality=\(qualityName)  no-person=\(missed) (\(pct)%)")
if pct > 25 {
    FileHandle.standardError.write("person-matte: WARNING — no person detected in \(pct)% of frames; check the source\n".data(using: .utf8)!)
}
