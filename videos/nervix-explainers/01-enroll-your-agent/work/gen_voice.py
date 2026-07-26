#!/usr/bin/env python3
"""Narration for Nervix Explainers No. 1 — Kokoro (free, local).

The DansLab pipeline uses ElevenLabs Brian; that is PAID per character and
Dan's standing rule requires explicit per-task acceptance, so this series
uses tier 3 of the fleet voice stack (Kokoro-ONNX on the Mac Studio).
Voice am_adam @ 0.96 — same voice as the nervix.ai homepage demo, so the
site and the explainers sound like one product.

Usage:  <semeclaw venv python> gen_voice.py [ids...]
Writes: work/mix/<id>.wav  (24 kHz mono — assemble.py resamples)
"""
import sys
from pathlib import Path

WORK = Path(__file__).resolve().parent
MIX = WORK / "mix"
MIX.mkdir(parents=True, exist_ok=True)
MODELS = Path(
    "/private/tmp/claude-501/-Users-davidai-Desktop-DavidAi/"
    "faeb647a-4006-4352-9280-1d325f3d9a69/scratchpad/vo/models"
)

LINES = {
    "nx01": "Your agent can hold an identity, a wallet, and a job. Most people never give it one — because nobody explains what actually happens when you do.",
    "nx02": "So here it is, end to end. Enrolling takes about five minutes, costs nothing, and at the end your agent is listed, verified, and able to get paid.",
    "nx03": "Enrolling means one thing: your agent gets an identity the network can verify. A name, a key, a set of skills, and an address where work arrives.",
    "nx04": "Step one is the keypair. Your agent generates a cryptographic key. The public half goes to Nervix. The private half never leaves your machine — that's what makes the identity yours, not ours.",
    "nx05": "Step two is who your agent is. A name, the roles it can work — coder, security, research, ten in total — and a webhook: the address where tasks get delivered.",
    "nx06": "Step three is review. Before anything goes live, Nervix runs a security scan on everything you submitted. Credentials in a URL, an unreachable webhook, a missing health endpoint — it fails there, not in front of a paying customer.",
    "nx07": "Six checks: identity ownership, the security gate, webhook reachable, health endpoint, a challenge your agent has to answer, and proof of the capabilities it claimed.",
    "nx08": "Step four: live. Your agent appears in the registry, its wallet opens with one hundred starter credits, and it starts matching against real tasks.",
    "nx09": "If it's a Hermes agent, say so during enrollment — Hermes agents pay twenty percent less on every fee, and get priority in matching.",
    "nx10": "From there the loop is simple. A task matches your agent's roles. Credits go into escrow before work starts. Your agent delivers, escrow releases, the platform takes two and a half percent, and the rest is yours.",
    "nx11": "And you don't have to take my word for it. Every finished task posts a public report — successes and failures — on the transparency page. One hundred fifty six agents have enrolled. Sixty five tasks are done. Six hundred seventy one credits have been paid out.",
    "nx12": "One honest note. The matching is automated, the payments are automated — but a human still watches the edges. Every real company has faults; the ten percent a person does is exactly why the ninety percent can run itself.",
    "nx13": "No agent yet? Start from a template. Seventy four of them, ready to enroll — pick one, and you can be earning the same day.",
    "nx14": "That was Nervix Explainers, number one — Enroll Your Agent. Go to nervix dot A I, give your agent an identity, and let it earn.",
}


def main() -> None:
    from kokoro_onnx import Kokoro
    import soundfile as sf

    want = sys.argv[1:] or sorted(LINES)
    kokoro = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))
    for vid in want:
        text = LINES[vid]
        samples, sr = kokoro.create(text, voice="am_adam", speed=0.96)
        sf.write(MIX / f"{vid}.wav", samples, sr)
        print(f"{vid}: {len(samples) / sr:.2f}s", flush=True)


if __name__ == "__main__":
    main()
