import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ClaudeCodePromptShot } from '../../lib/kit';

// =============================================================================
// Test video 3/5 — the meta beat: the exact request that produced this video,
// typed into the kit's Claude Code terminal clone.
// =============================================================================
export const compositionConfig = { id: 'TestPrompt', durationInSeconds: 7, fps: 30, width: 1920, height: 1080 };

const TestPrompt: React.FC = () => (
  <AbsoluteFill>
    <ClaudeCodePromptShot
      prompt="lets see if we can make a nice video with this as a test"
      cwd="~/Projects/Claude-Youtube"
      responseLabel="Rendering 5 shots…"
      typeStart={18}
      perChar={1.1}
    />
  </AbsoluteFill>
);
export default TestPrompt;
