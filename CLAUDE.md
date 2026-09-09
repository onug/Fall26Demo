# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The keynote demo for the ONUG Fall AI Networking Summit (New York, October 28, 2026). It is the successor to the Dallas Spring 2026 AOMC demo (`github.com/onug/AOMC-demo`) and deliberately mirrors that project's web-demo structure so vendors who forked Dallas recognize it.

One deliverable: `web-demo/`, a presenter-controlled Next.js presentation. The narrative arc it implements is `docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx` (seven beats, fear then greed, three working-group lanes).

## Running

```bash
cd web-demo
npm install
npm run dev        # http://localhost:3000, press F for fullscreen
npm run build      # static export to web-demo/out/
```

Keys: `Space`/`→` next, `←` back, `1`–`7` jump to beat, `F` fullscreen, `N` mute voice, `T` toggle text, `R` reset.

## Architecture

Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion. Static export, no runtime network calls.

```
web-demo/
├── app/                 layout.tsx, page.tsx (renders <DemoStage/>), globals.css (keyframes, glows)
├── lib/
│   ├── types.ts         Step, DemoState, ControlKey, LaneKey, GateProposal, Metrics, ...
│   ├── data.ts          LANES, CONTROLS (9 capabilities), BASE_NODES/BASE_EDGES, BU_AGENTS, PROOF_POINTS, VENDOR_LANES
│   ├── steps.ts         THE SCRIPT — every step of the seven beats, with narration and pause markers
│   └── audio.ts         Narration: /narration/<step-id>.mp3 first, browser TTS fallback
└── components/
    ├── DemoStage.tsx    Orchestrator: useReducer, state replay, keyboard, layout switch by phase
    ├── Topology.tsx     SVG: control-plane band (WG1), infra lane (WG2), SOC lane (WG3), external
    ├── ControlPlanePanel.tsx  Right column: 9 capabilities grouped by lane + autonomy ladder
    ├── ImpactPanel.tsx  Fear metrics ("without the plane") and defense metrics ("with the plane")
    ├── VerifyGatePanel.tsx    Beat 4/5: change-stop · dry-run · blast radius · rollback · evidence hold
    ├── AuditJournal.tsx       Immutable, hash-chained journal table
    ├── EventFeed.tsx, NarrationPanel.tsx, StepIndicator.tsx, TitleSlide.tsx
    ├── ViolationOverlay.tsx, BlockedOverlay.tsx
    ├── AcceleratorView.tsx    Beat 6: business units plug into the plane
    ├── ProofPoints.tsx        Beat 6: EY / Cisco / Salesforce cards
    └── VendorLanes.tsx        Beat 7: the three-lane challenge
```

**State replay.** `buildStateForStep(n)` in `DemoStage.tsx` rebuilds state from step 0 to n on every navigation, so backward navigation is always correct. A step with `resetState: true` (Beat 2's "You are here") wipes accumulated state, which is how the demo "rewinds" the poisoned pull.

**Step phases** drive layout: `title`, `accelerator`, `proof`, `lanes` are full-screen cards; everything else is the dashboard (event feed, topology, control plane, impact). `violation` and `blocked` phases also fire the red/green overlays. `gate` phases show the verify-gate panel under the topology; `showAudit: true` shows the journal.

**Controls.** Nine capabilities, not the Dallas six. WG1: identity, artifact provenance, runtime monitoring, audit journal, kill switch. WG2: verify gate, autonomy levels. WG3: detect→decide, deliberate containment. The demo never enumerates the 25 WG1 requirements on stage; AOMC is the vehicle, not the checklist.

## Common tasks

- **Change narration or add a step**: edit `web-demo/lib/steps.ts`. Each step's `id` doubles as the audio filename.
- **Move a node / add a node**: `BASE_NODES` in `web-demo/lib/data.ts`. The SVG viewBox is 1000×660: plane band y 28–98, infra lane x 20–350, SOC lane x 370–700, external x 720–980. Check that new straight-line edges don't pass through other nodes.
- **Change proof points, BU agents, vendor lanes**: the arrays at the bottom of `web-demo/lib/data.ts`.
- **Add recorded narration**: drop `web-demo/public/narration/<step-id>.mp3`. No code change.
- **Adjust animations**: keyframes in `web-demo/app/globals.css`; Framer transitions inline in components.

## Design decisions

- **Presenter-controlled.** Nothing auto-advances. Presenter pause points are data (`pausePoint` on a step) and render as a header badge.
- **Fear then greed.** Beat 1 is red, Beats 2–5 are orange/blue/cyan (the plane and its two battlegrounds), Beat 6 is purple, Beat 7 green. `TitleSlide` and `StepIndicator` key colors off the beat.
- **Proof points are framed, not just quoted.** Cisco is framed around ambition (not the headcount debate); Salesforce numbers are marked vendor-reported. Keep that framing if the copy changes.
- **Presentation-first code.** Readability during a live demo beats production patterns.
