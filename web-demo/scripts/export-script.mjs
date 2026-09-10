#!/usr/bin/env node
// Exports the narration script from lib/steps.ts to:
//   - narration/script.json     (machine-readable; input to generate-narration.py)
//   - ../docs/narration-script.md (human-readable; for co-chair and production review)
// Uses the TypeScript compiler already in node_modules, so no extra deps.
//
//   node scripts/export-script.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const repo = resolve(root, '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

const VOICE_ID = '16VamcPQIJBvVLoE1Zss';
const VOICE_NAME = 'Nick Lippis (cloned)';
const MODEL_ID = 'eleven_multilingual_v2';

function loadTsModule(file, registry) {
  const src = readFileSync(file, 'utf8');
  const { outputText } = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: file,
  });
  const module = { exports: {} };
  const localRequire = (spec) => {
    if (spec.startsWith('.')) {
      const target = resolve(dirname(file), spec) + '.ts';
      if (!registry.has(target)) registry.set(target, loadTsModule(target, registry));
      return registry.get(target);
    }
    return require(spec);
  };
  vm.runInNewContext(outputText, { module, exports: module.exports, require: localRequire, console }, { filename: file });
  return module.exports;
}

// Duration of an existing MP3 in seconds (macOS afinfo), or null.
function mp3Duration(id) {
  const file = resolve(root, 'public/narration', `${id}.mp3`);
  if (!existsSync(file) || process.platform !== 'darwin') return null;
  try {
    const out = execFileSync('afinfo', [file], { encoding: 'utf8' });
    const m = out.match(/estimated duration:\s*([\d.]+)/);
    return m ? +m[1] : null;
  } catch {
    return null;
  }
}

const { STEPS, BEAT_LABELS } = loadTsModule(resolve(root, 'lib/steps.ts'), new Map());

const segments = STEPS.filter(s => s.narration).map(s => ({
  id: s.id,
  step: STEPS.indexOf(s) + 1,
  beat: s.beat,
  phase: s.phase,
  title: s.title,
  pause: s.pausePoint ?? null,
  text: s.narration,
  words: s.narration.split(/\s+/).length,
  audio_seconds: mp3Duration(s.id),
}));

const totalWords = segments.reduce((n, s) => n + s.words, 0);
const totalAudio = segments.reduce((n, s) => n + (s.audio_seconds ?? 0), 0);
const out = {
  metadata: {
    demo: 'fall26-keynote',
    voice: 'elevenlabs',
    voice_id: VOICE_ID,
    voice_name: VOICE_NAME,
    model_id: MODEL_ID,
    notes: 'Segment ids match Step.id in lib/steps.ts; audio is served from public/narration/<id>.mp3',
    segments: segments.length,
    total_words: totalWords,
    estimated_minutes: +(totalWords / 150).toFixed(1),
    recorded_minutes: totalAudio ? +(totalAudio / 60).toFixed(1) : null,
  },
  segments,
};

mkdirSync(resolve(root, 'narration'), { recursive: true });
const jsonPath = resolve(root, 'narration/script.json');
writeFileSync(jsonPath, JSON.stringify(out, null, 2) + '\n');

// ─── Markdown for reviewers ───────────────────────────
const fmt = (s) => (s == null ? '—' : `${Math.round(s)}s`);
let md = `# Narration Script — "One Control Plane, Every Domain"\n\n`;
md += `_Generated from \`web-demo/lib/steps.ts\` by \`scripts/export-script.mjs\`. Do not edit by hand; edit the step and re-run \`npm run narration:export\`._\n\n`;
md += `| | |\n|---|---|\n`;
md += `| Steps with narration | ${segments.length} |\n`;
md += `| Words | ${totalWords} (~${out.metadata.estimated_minutes} min at 150 wpm) |\n`;
md += `| Recorded audio | ${totalAudio ? `${out.metadata.recorded_minutes} min` : 'not generated'} |\n`;
md += `| Voice | ${VOICE_NAME} · ElevenLabs \`${VOICE_ID}\` · ${MODEL_ID} |\n`;
md += `| Presenter pauses | ${segments.filter(s => s.pause).length} |\n\n`;
md += `The arc targets roughly five minutes of pre-produced content plus live pauses. Trim from the longest segments first.\n\n`;

let currentBeat = -1;
for (const s of segments) {
  if (s.beat !== currentBeat) {
    currentBeat = s.beat;
    const label = BEAT_LABELS[s.beat] || (s.beat === 0 ? 'OPEN' : `BEAT ${s.beat}`);
    md += `\n## ${label || 'Open / Close'}\n\n`;
  }
  md += `### ${s.step}. ${s.title}\n\n`;
  md += `\`${s.id}\` · ${s.phase} · ${s.words} words · audio ${fmt(s.audio_seconds)}`;
  if (s.pause) md += ` · **⏸ ${s.pause}**`;
  md += `\n\n> ${s.text}\n\n`;
}

md += `\n## Longest segments\n\n| Step | Words | Audio |\n|---|---:|---:|\n`;
for (const s of [...segments].sort((a, b) => (b.audio_seconds ?? b.words) - (a.audio_seconds ?? a.words)).slice(0, 8)) {
  md += `| ${s.step}. ${s.title} (\`${s.id}\`) | ${s.words} | ${fmt(s.audio_seconds)} |\n`;
}

mkdirSync(resolve(repo, 'docs'), { recursive: true });
const mdPath = resolve(repo, 'docs/narration-script.md');
writeFileSync(mdPath, md);

console.log(`Wrote ${segments.length} segments (${totalWords} words, ~${out.metadata.estimated_minutes} min at 150 wpm${totalAudio ? `, ${out.metadata.recorded_minutes} min recorded` : ''})`);
console.log(`  → ${jsonPath}`);
console.log(`  → ${mdPath}`);
