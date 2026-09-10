#!/usr/bin/env node
// Exports the narration script from lib/steps.ts to narration/script.json.
// Uses the TypeScript compiler already in node_modules, so no extra deps.
//
//   node scripts/export-script.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');

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

const { STEPS } = loadTsModule(resolve(root, 'lib/steps.ts'), new Map());

const segments = STEPS.filter(s => s.narration).map((s, i) => ({
  id: s.id,
  step: STEPS.indexOf(s) + 1,
  beat: s.beat,
  title: s.title,
  text: s.narration,
  words: s.narration.split(/\s+/).length,
}));

const totalWords = segments.reduce((n, s) => n + s.words, 0);
const out = {
  metadata: {
    demo: 'fall26-keynote',
    voice: 'elevenlabs',
    voice_id: '16VamcPQIJBvVLoE1Zss',
    voice_name: 'Nick Lippis (cloned)',
    model_id: 'eleven_multilingual_v2',
    notes: 'Segment ids match Step.id in lib/steps.ts; audio is served from public/narration/<id>.mp3',
    segments: segments.length,
    total_words: totalWords,
    estimated_minutes: +(totalWords / 150).toFixed(1),
  },
  segments,
};

mkdirSync(resolve(root, 'narration'), { recursive: true });
const outPath = resolve(root, 'narration/script.json');
writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${segments.length} segments (${totalWords} words, ~${out.metadata.estimated_minutes} min at 150 wpm) → ${outPath}`);
