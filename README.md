# Fall26Demo — "One Control Plane, Every Domain"

Keynote demo for the **ONUG Fall AI Networking Summit**, New York City, October 28, 2026.

This is the next version of the Spring 2026 Dallas [AOMC demo](https://github.com/onug/AOMC-demo). Dallas introduced the AOMC supervision plane and its six mandatory controls. This demo shows that plane operating across all three ONUG working-group domains as **one control plane**:

| Lane | Working group | Role in the demo |
|------|---------------|------------------|
| WG1 | Agentic Control Plane | The supervision plane itself: identity, provenance, runtime monitoring, immutable journal, kill switch |
| WG2 | Autonomous Infrastructure | Battleground 1: an agent runs the fabric, every write passes the verify gate |
| WG3 | AI-Enabled SOC | Battleground 2: detect-to-decide in seconds, containment that preserves evidence |

## Documentation

| Document | Read it if you… |
|----------|-----------------|
| [docs/handover.md](docs/handover.md) | are picking this up: state of the project, the edit loop, accounts, what's next |
| [docs/release-notes.md](docs/release-notes.md) | want to know what's in v0.1.0 and what's open |
| [docs/presenter-guide.md](docs/presenter-guide.md) | are presenting: run of show, talking points at each pause, every number on screen |
| [docs/narration-script.md](docs/narration-script.md) | are reviewing the script (generated from code; word counts and audio durations per step) |
| [docs/vendor-guide.md](docs/vendor-guide.md) | are a vendor picking a lane (draft) |
| `docs/vendor-instructions.md` | Rules, timeline, format, naming and submission for the vendor challenge (draft, dates to confirm) |
| `docs/vendor-call-email.md` | Call-for-entries email to vendors (draft) |
| [docs/qa-report.md](docs/qa-report.md) | want to see what was checked and what was fixed |
| [docs/review-feedback.md](docs/review-feedback.md) | want to see what the practitioners said and what changed because of it |
| [docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx](docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx) | want the source narrative arc |
| [CLAUDE.md](CLAUDE.md) | are editing the code (architecture, common tasks, verification) |

## The seven beats

1. **The Poisoned Pull** (fear) — a company doing everything right: managed registry, scans, SBOM, CVE checks, a cooling-off hold. A novel payload passes all of it. No plane. Blast radius.
2. **The AOMC Catch** ("you are here") — same artifact, one governance change: new artifacts run in a sandbox under the plane. Caught by behavior in 6 seconds, never exposed to the network.
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

Every step carries its narration text. Playback tries a recorded file at `web-demo/public/narration/<step-id>.mp3` first and falls back to the browser's speech synthesis. Step ids are the `id` fields in `web-demo/lib/steps.ts` (for example `b1-pull`, `b4-gate-fail`).

Recorded narration is generated with ElevenLabs using the cloned **Nick Lippis** voice on the ONUG account:

```bash
cd web-demo
npm run narration:generate          # exports the script, then generates missing MP3s
python3 scripts/generate-narration.py --force --only b1-pull   # regenerate one step after editing its text
python3 scripts/generate-narration.py --list-voices             # voices on the account
python3 scripts/generate-narration.py --force --speed 1.0        # slower delivery (default is 1.2, the ElevenLabs max)
python3 scripts/generate-narration.py --voice EXAVITQu4vr4xnSDxMaL   # use "Sarah" (the Dallas voice) instead
```

The API key is read from `ELEVENLABS_API_KEY` or from the macOS keychain item labelled `elevenlabs`; it is never written to the repo. `web-demo/narration/script.json` is the exported script (id, text, word count per step) and is what production and reviewers should read.

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

See [CLAUDE.md](CLAUDE.md) for the architecture notes and common editing tasks, and [docs/handover.md](docs/handover.md) for the state of the project.

## Vendor challenge

Vendors fork this repository, pick a lane (WG1, WG2, or WG3), and show how their product satisfies that lane's controls. The submission is a playable video shown throughout the conference; attending members vote Best in Show per lane. The vendor customization mechanism from the Dallas demo (`vendor-config.ts`) is the model and will be carried over once the arc is locked.

## Licence

The code in this repository is licensed under the [Apache License 2.0](LICENSE). Fork it and build on it; the patent grant in section 3 is deliberate.

The three reference-architecture drawings in `web-demo/public/ra/` are working-group documents and are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), with credit to the ONUG Collaborative working group that produced each one. Member logos in `web-demo/public/logos/` are their owners' trademarks and are not licensed by either.
