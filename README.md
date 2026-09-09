# Fall26Demo — "One Control Plane, Every Domain"

Keynote demo for the **ONUG Fall AI Networking Summit**, New York City, October 28, 2026.

This is the next version of the Spring 2026 Dallas [AOMC demo](https://github.com/onug/AOMC-demo). Dallas introduced the AOMC supervision plane and its six mandatory controls. This demo shows that plane operating across all three ONUG working-group domains as **one control plane**:

| Lane | Working group | Role in the demo |
|------|---------------|------------------|
| WG1 | Agentic Control Plane | The supervision plane itself: identity, provenance, runtime monitoring, immutable journal, kill switch |
| WG2 | Autonomous Infrastructure | Battleground 1: an agent runs the fabric, every write passes the verify gate |
| WG3 | AI-Enabled SOC | Battleground 2: detect-to-decide in seconds, containment that preserves evidence |

The narrative arc is in [docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx](docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx). The presenter walkthrough is in [docs/presenter-guide.md](docs/presenter-guide.md).

## The seven beats

1. **The Poisoned Pull** (fear) — a routine model pull from a public hub carries a payload. No plane. Blast radius.
2. **The AOMC Catch** ("you are here") — same pull, plane online. Runtime detection, journal, kill switch in 6 seconds.
3. **One Plane, Three Working Groups** — the plane extends into the WG2 and WG3 lanes.
4. **Battleground 1: Autonomous Infrastructure** — detect, diagnose, propose; every write hits the verify gate. One write rejected by blast radius.
5. **Battleground 2: The AI-Enabled SOC** — the exploit escalates. Five signals across three domains correlated in 4.2 seconds. Containment hits the same gate. "Wipe host" rejected by evidence hold.
6. **From Seatbelt to Accelerator** (greed) — business units build on the plane. Public proof points: EY Canvas, Cisco, Salesforce Agentforce at Reddit.
7. **The Vendor Challenge** — three lanes, pick one, submit a playable MP4, Best in Show per lane.

## Running the demo

```bash
cd web-demo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and press **F** for fullscreen.

| Key | Action |
|-----|--------|
| `Space` / `→` | Next step |
| `←` | Previous step |
| `1` … `7` | Jump to the start of a beat |
| `F` | Fullscreen |
| `N` | Mute / unmute narration voice |
| `T` | Show / hide narration text |
| `R` | Reset to the title |

The demo never auto-advances. Each step's animations play, the narration reads, and the presenter advances. Steps marked with a yellow **PRESENTER PAUSE** badge in the header are the moments the arc calls out for Nick and the co-presenter to stop and talk.

### Narration

Every step carries its narration text. Playback tries a recorded file at `web-demo/public/narration/<step-id>.mp3` first and falls back to the browser's speech synthesis, so the demo is fully narrated during development and production can drop in recorded audio without touching code. Step ids are the `id` fields in `web-demo/lib/steps.ts` (for example `b1-pull`, `b4-gate-fail`).

### Static build

```bash
cd web-demo
npm run build
```

Output is a static export in `web-demo/out/`. Serve it from any static file server. No network access is needed during the presentation.

## Repository layout

```
docs/          Narrative arc (docx) and presenter guide
web-demo/      Next.js 16 + TypeScript + Tailwind v4 + Framer Motion presentation
  lib/         types.ts (model), data.ts (lanes, controls, topology, proof points), steps.ts (the script)
  components/  DemoStage (orchestrator), Topology (SVG), panels, overlays, full-screen views
```

See [CLAUDE.md](CLAUDE.md) for the architecture notes and common editing tasks.

## Vendor challenge

Vendors fork this repository, pick a lane (WG1, WG2, or WG3), and show how their product satisfies that lane's controls. The submission is a playable video shown throughout the conference; attending members vote Best in Show per lane. The vendor customization mechanism from the Dallas demo (`vendor-config.ts`) is the model and will be carried over once the arc is locked.
