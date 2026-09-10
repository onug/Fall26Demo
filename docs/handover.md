# Handover — Fall26Demo

For Peter and Tony, and anyone picking this up before October 28, 2026.

## What you are picking up

The keynote demo for the ONUG Fall AI Networking Summit in New York. It opens the Summit, runs about five minutes with live pauses, and sends the audience to the three working-group sessions. It is the successor to the Dallas AOMC demo and deliberately looks like it.

The arc it implements is `docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx`. That document is a working draft for co-chair review. The demo is a faithful first cut of it, built so the arc can be reviewed as a running thing rather than a Word file. Expect to change the script.

Current state: **v0.1.0**, everything runs, narration is recorded, script is too long. See `docs/release-notes.md`.

## Get it running in five minutes

```bash
git clone https://github.com/onug/Fall26Demo.git
cd Fall26Demo/web-demo
npm install
npm run dev
```

Open http://localhost:3000, press `F` for fullscreen, `Space` to advance. The recorded narration plays automatically after the first key press (browsers require a gesture before audio). `N` mutes it.

Requirements: Node 20 or newer (built on Node 26), npm. Python 3 only if you regenerate narration. macOS only for the keychain lookup and audio-duration measurement; everything else is cross-platform.

## Where things live

| Path | What |
|------|------|
| `web-demo/lib/steps.ts` | **The script.** Every step: title, narration, events, topology changes, metrics, pause markers. This is the file you will edit most. |
| `web-demo/lib/data.ts` | Lanes, the nine controls, topology node positions, business-unit agents, proof points, vendor lanes. |
| `web-demo/lib/types.ts` | The data model. Read this first if you want to add a new kind of step. |
| `web-demo/components/` | React components. `DemoStage.tsx` is the orchestrator; `Topology.tsx` is the SVG. |
| `web-demo/public/narration/*.mp3` | Recorded narration, one file per step id. |
| `web-demo/narration/script.json` | Exported script, machine-readable. |
| `docs/narration-script.md` | Exported script, human-readable, with word counts and audio durations. Send this to reviewers. |
| `docs/presenter-guide.md` | Run of show, talking points per pause, table of every number on screen. |
| `docs/vendor-guide.md` | How vendors fork and pick a lane. Draft until the challenge mechanics are final. |
| `CLAUDE.md` | Architecture notes and common tasks, written for Claude Code but useful for humans. |

## The edit loop

1. Change a step's `narration` (or anything else) in `web-demo/lib/steps.ts`.
2. `npm run dev` and check it in the browser. Press the beat number to jump straight there.
3. Regenerate just that step's audio:
   ```bash
   python3 scripts/generate-narration.py --force --only <step-id>
   ```
4. `npm run narration:export` to refresh `script.json` and `docs/narration-script.md`.
5. Commit and push.

The step id is the `id` field on the step object, for example `b1-pull` or `b4-gate-fail`. Ids are stable and double as audio filenames, so do not rename an id without regenerating its audio.

## Narration and the ElevenLabs account

- Voice: the cloned **Nick Lippis** voice on the ONUG ElevenLabs account (voice id `16VamcPQIJBvVLoE1Zss`). Sarah (`EXAVITQu4vr4xnSDxMaL`) was the Dallas voice and is one flag away: `--voice EXAVITQu4vr4xnSDxMaL`.
- The API key is **not** in the repo. The generator reads `ELEVENLABS_API_KEY` from the environment, or on Nick's Mac from the keychain item labelled `elevenlabs`. If you need to regenerate, get the key from Nick and export it in your shell.
- A full regeneration bills about 10,400 characters at the current script length. Use `--only` for single steps.
- Playback order in the demo: if `public/narration/<id>.mp3` exists it plays; otherwise the browser's speech synthesis reads the same text. So a missing file degrades gracefully, it does not break the demo.

## The first job: cut the script in half

The arc says roughly five minutes pre-produced. The recorded narration is 11.4 minutes. Each step's narration should come down to about 20 to 30 words. The longest are listed at the bottom of `docs/narration-script.md`. Suggested approach:

- Keep the numbers and the one-line principle in each step; cut the explanation. The presenter pauses are where explanation lives.
- Beat 6's proof-points narration (90 words) can drop to the three org names and the through-line; the cards carry the detail.
- Beat 2 and Beat 4 have two "explain the gate" moments each; one is enough.

After the cut: regenerate all audio with `--force`, re-export, and update the presenter guide's timing.

## Things that are deliberately not done

- **Vendor overrides.** Dallas let a vendor swap its product name and logo into the "enable" and "blocked" steps via `vendor-config.ts`. The Fall equivalent is per-lane overrides. Not built; waiting on the arc lock and the challenge mechanics (submission format, voting, deadlines).
- **Public repo.** Private until Nick flips it. Vendors need it public to fork.
- **Video export.** The arc calls for a pre-produced, playable file. This demo is the interactive source; producing the MP4 is a screen-capture job once the script is locked. Record at 1920×1080 with text narration hidden (`T`).
- **Live demo / Docker.** Dallas had a Dockerized live environment. Fall is web-only by design; the keynote is not a deep dive.

## Accounts and access

| What | Who / where |
|------|-------------|
| GitHub repo | `onug/Fall26Demo`, private. Admins: Nick (`nicklippis`), Tony (`tfarinacci`). Peter is `securitysonar` and needs to be added. |
| ElevenLabs | ONUG account; key with Nick. |
| Dallas reference | `github.com/onug/AOMC-demo`, public. Same architecture; its `docs/vendor-guide.md` is the model for ours. |
| Arc document | `docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx` in this repo; the working copy may also live in the ONUG Collaborative shared drive. |

## What happens next (from the arc)

1. Co-chair review of the arc with the collaborative's practitioners. Use the running demo and `docs/narration-script.md` as the review material.
2. Revise the arc; edit `steps.ts` to match.
3. Cut and lock the script; regenerate narration.
4. Hand the locked build to production for the graphics pass and the MP4.
5. Decide the co-presenter; split the pause-point talking points.
6. Finalize vendor challenge mechanics; finish `docs/vendor-guide.md`; make the repo public.

## Questions

Nick Lippis, nick@onug.net. Tony Farinacci for anything about the Dallas demo's internals.
