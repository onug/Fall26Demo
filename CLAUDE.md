# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The keynote demo for the ONUG Fall AI Networking Summit (New York, October 28, 2026): "One Control Plane, Every Domain". It is the successor to the Dallas Spring 2026 AOMC demo (`github.com/onug/AOMC-demo`) and deliberately mirrors that project's web-demo structure so vendors who forked Dallas recognize it.

One deliverable: `web-demo/`, a presenter-controlled Next.js presentation. The narrative arc it implements is `docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx` (seven beats, fear then greed, three working-group lanes). The arc is a working draft; the script will change after co-chair review.

Supporting docs: `README.md` (run it), `docs/handover.md` (state of the project, edit loop, open items), `docs/presenter-guide.md` (run of show), `docs/release-notes.md`, `docs/vendor-guide.md`, `docs/narration-script.md` (generated, do not hand-edit).

## Running

```bash
cd web-demo
npm install
npm run dev              # http://localhost:3000, press F for fullscreen
npm run build            # static export to web-demo/out/
npm run narration:export # steps.ts → narration/script.json + docs/narration-script.md
npm run narration:generate   # export, then ElevenLabs MP3s for steps without audio
npm run qa               # script integrity check + type-check
```

Keys: `Space`/`→` next, `←` back, `1`–`7` jump to beat, `F` fullscreen, `N` mute voice, `T` toggle text, `R` reset.

For browser verification in this session, `.claude/launch.json` defines a `web-demo` server on port 3100.

## Architecture

Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion. Static export, no runtime network calls.

```
web-demo/
├── app/                   layout.tsx, page.tsx (renders <DemoStage/>), globals.css (keyframes, glows)
├── lib/
│   ├── types.ts           Step, DemoState, ControlKey, LaneKey, GateProposal, Metrics, ...
│   ├── data.ts            LANES, CONTROLS (9 capabilities), BASE_NODES/BASE_EDGES, BU_AGENTS, PROOF_POINTS, VENDOR_LANES
│   ├── steps.ts           THE SCRIPT — 41 steps across seven beats, with narration and pause markers
│   ├── audio.ts           Narration playback: /narration/<step-id>.mp3 first, browser TTS fallback
│   └── assets.ts          asset(path): prefixes NEXT_PUBLIC_BASE_PATH for images under public/
├── scripts/
│   ├── export-script.mjs  Transpiles steps.ts with the bundled TypeScript compiler, writes script.json + docs/narration-script.md
│   ├── qa.mjs             Script integrity check (npm run qa): replays steps, validates references, audio, export freshness
│   └── generate-narration.py  ElevenLabs TTS via urllib; key from env ELEVENLABS_API_KEY or keychain item "elevenlabs"
├── narration/script.json  Exported narration script (generated)
├── public/narration/      41 MP3s, one per step id (generated, committed)
├── public/ra/             The three reference-architecture drawings as SVG (Peter's ONUG-theme redraws, from his ACP wiki pack)
├── public/logos/          Member marks, copied from the collaborative portal's app/static/founding/
└── components/
    ├── DemoStage.tsx      Orchestrator: useReducer, state replay, keyboard, layout switch by phase
    ├── Topology.tsx       SVG: control-plane band (WG1), infra lane (WG2), SOC lane (WG3), external
    ├── ControlPlanePanel.tsx  Right column: 9 capabilities grouped by lane + autonomy ladder
    ├── ImpactPanel.tsx    Fear metrics ("without the plane") and defense metrics ("with the plane")
    ├── VerifyGatePanel.tsx    Beat 4/5: change-stop · dry-run · blast radius · rollback · evidence hold
    ├── AuditJournal.tsx   Immutable, hash-chained journal table
    ├── EventFeed.tsx, NarrationPanel.tsx, StepIndicator.tsx, TitleSlide.tsx
    ├── ViolationOverlay.tsx, BlockedOverlay.tsx
    ├── RACard.tsx         phase 'ra': a reference-architecture drawing on a white panel, three takeaways beside it
    ├── GapCard.tsx        Beat 1: what happened / the control / HAD IT or MISSING
    ├── ThreatCard.tsx     Beat 7: the other threat scenarios the same controls stop
    ├── LogoWall.tsx       Title strip and finale wall of member marks (wordmark when no file)
    ├── AcceleratorView.tsx    Beat 6: business units plug into the plane
    ├── ProofPoints.tsx    Beat 6: EY / Cisco / Salesforce cards
    └── VendorLanes.tsx    Beat 7: the three-lane challenge
```

**State replay.** `buildStateForStep(n)` in `DemoStage.tsx` rebuilds state from step 0 to n on every navigation, so backward navigation is always correct. A step with `resetState: true` (Beat 2's "You are here") wipes accumulated state, which is how the demo "rewinds" the poisoned pull.

**Step phases** drive layout: `title`, `accelerator`, `proof`, `lanes`, `ra`, `gap`, `threats` are full-screen cards; everything else is the dashboard (event feed, topology, control plane, impact). `violation` and `blocked` phases also fire the red/green overlays. `gate` phases show the verify-gate panel under the topology; `showAudit: true` shows the journal.

**Controls.** Nine capabilities, not the Dallas six. WG1: identity, artifact provenance, runtime monitoring, audit journal, kill switch. WG2: verify gate, autonomy levels. WG3: detect→decide, deliberate containment. The demo never enumerates the 24 WG1 requirements on stage (24, not 25: Peter, 17 Sep 2026); AOMC is the vehicle, not the checklist.

**Narration.** Every step has `narration` text. Playback (`lib/audio.ts`) tries the MP3 for the step id and falls back to `speechSynthesis`. The `id` is therefore a contract: renaming a step id orphans its audio.

## Common tasks

- **Change narration or add a step**: edit `web-demo/lib/steps.ts`, then `npm run narration:export` and regenerate the audio for that step (`python3 scripts/generate-narration.py --force --only <step-id>`). Commit the MP3 with the text change.
- **Move a node / add a node**: `BASE_NODES` in `web-demo/lib/data.ts`. The SVG viewBox is 1000×660: plane band y 28–98, infra lane x 20–350, SOC lane x 370–700, external x 720–980. Edges are straight lines; check new ones don't pass through other nodes (the model-pull edge from the hub at y=200 was moved above the SOC row for this reason).
- **Change proof points, BU agents, vendor lanes**: the arrays at the bottom of `web-demo/lib/data.ts`. Each entry in `CONTROLS` carries `reqs`, the WG requirement ids from Peter's vendor three-lane challenge report (17 Sep 2026); the Beat 7 card prints them per lane. Keep them in step with his crosswalk.
- **Replace a reference-architecture drawing**: the SVGs in `public/ra/` are the 1200-wide `<svg>` cut out of Peter's `report-onug-wg<N>-architecture-reference.html` pages (his ACP wiki pack, emailed 16 Sep 2026 as `ACP-local-wiki.zip`, re-sent 17 Sep as `ACP-local-wiki-v2.zip` with the same drawings, headed for GitHub Pages under onug/), with HTML named entities (`&middot;` etc.) converted to characters and a white background rect prepended; `RA_CARDS` in `data.ts` carries the version string and the takeaways. Update both. The control plane is deliberately one card, the personas version (Peter, 17 Sep).
- **Add a member mark**: drop the file in `public/logos/` and add it to `FOUNDING_MEMBERS`, `PRACTITIONER_MEMBERS` or `REVIEWERS` in `data.ts`. Marks must read on a white tile. `ebay.svg` and `huntington.svg` came from Wikimedia Commons because the ONUG Drive folders have no mark for them; replace with company-supplied artwork when it arrives. Mick Currey is credited by name and ONUG role only, never with Fidelity (his request, August 2026); Baird Kaake without an employer until he says.
- **Change the voice**: `VOICE_ID` in `scripts/export-script.mjs` (the cloned Nick Lippis voice is the default; Sarah was Dallas), then regenerate with `--force`.
- **Adjust animations**: keyframes in `web-demo/app/globals.css`; Framer transitions inline in components.

## Verifying a change

1. `npm run qa` in `web-demo`: replays every step and checks ids, node/edge references, hidden-endpoint edges, audio files, and that `script.json` matches the narration text; then type-checks. Must be 0 failures; treat warnings as bugs unless deliberate.
2. `npm run build` (static export must succeed; it is what production will serve).
3. Walk the affected beat in the browser at 1920×1080. Note: in a hidden browser tab, Framer Motion entrance animations do not run, so screenshots taken from a background tab can look blank or dim. Read the DOM (computed opacity) or front the tab before judging.
4. If narration text changed, regenerate that step's audio and confirm the file is served (`curl -I http://localhost:3000/narration/<id>.mp3`).

`next dev` can hang at "Starting..." on this Mac because Watchpack fails to watch `~/Desktop` (EINTR, a cloud-synced folder); when that happens, `npm run build` and serve `out/` with `python3 -m http.server 3100` instead. A server started inside the sandboxed Bash tool is unreachable from the browser; start it outside the sandbox. There are no automated tests, consistent with the Dallas demo. Do not add a test framework for presentation code.

## Design decisions

- **Presenter-controlled.** Nothing auto-advances. Presenter pause points are data (`pausePoint` on a step) and render as a header badge.
- **Fear then greed.** Beat 1 is red, Beats 2–5 are orange/blue/cyan (the plane and its two battlegrounds), Beat 6 is purple, Beat 7 green. `TitleSlide` and `StepIndicator` key colors off the beat.
- **Proof points are framed, not just quoted.** Cisco is framed around ambition (not the headcount debate); Salesforce numbers are marked vendor-reported. Keep that framing if the copy changes. The figures themselves are unverified until the arc locks.
- **Ten minutes of audio.** Nick's target (15 Sep 2026). `npm run narration:export` reports recorded minutes; keep it near 10.
- **Illustrative numbers.** Device counts, dollar exposure, dwell time, ransom figures, detect-to-decide seconds are demo-defined. Keep them consistent across `steps.ts`, the presenter guide, and the release notes when changing one.
- **Presentation-first code.** Readability during a live demo beats production patterns.

## Working agreements

- Commit MP3s alongside the script change that produced them.
- This checkout lives in a cloud-synced folder, and the sync drops `name 2.ext` duplicate files next to files that were recreated. Before `git add -A` or a portal import, run `find . -name "* 2.*" -not -path "*/node_modules/*"` and delete what it finds; they have reached both repositories once already (15 Sep) and broke the portal's manifest-size test.
- Never write the ElevenLabs key anywhere in the repo, including scripts, `.env` files, or docs. The generator reads it at run time.
- Repo administration (adding collaborators, changing visibility) via `gh api` is blocked for Claude in auto mode unless `.claude/settings.json` allows `Bash(gh api:*)`. Hand the command to the user otherwise.
- Nick's collaborators: Tony Farinacci is `tfarinacci` (org admin); Peter is `securitysonar` (outside collaborator, add per repo).
