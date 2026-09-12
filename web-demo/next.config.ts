import type { NextConfig } from 'next';

// The demo is served two ways:
//   - standalone:   npm run dev / npm run build           → served at /
//   - inside the collaborative portal (collaborative.onug.net/keynote/app/):
//     NEXT_PUBLIC_BASE_PATH=/keynote/app npm run build     → assets and audio under that prefix
// Narration playback reads NEXT_PUBLIC_BASE_PATH too (lib/audio.ts), so one variable moves both.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
