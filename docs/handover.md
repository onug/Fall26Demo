# Handover — Fall26Demo

For Peter and Tony, and anyone picking this up before October 28, 2026.

## What you are picking up

The keynote demo for the ONUG Fall AI Networking Summit in New York, *One Control Plane, Every Domain*. It opens the Summit, runs about ten and a half minutes of recorded narration with presenter pauses, and ends by handing the room to the vendor challenge. It is the successor to the Dallas AOMC demo and deliberately looks like it.

Current state: **v0.3.3** (17 September 2026), 41 steps across seven beats, 10.5 minutes recorded in the cloned Nick Lippis voice. Everything runs, QA passes, and the build is live for members on collaborative.onug.net under Demos. The script is in co-chair review until it locks; every change since v0.2 came from a reviewer and is logged in `docs/review-feedback.md`. See `docs/release-notes.md` for what each version did.

The arc it implements is `docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx`, now well behind the script: the seven beats survive, most of the detail has been rewritten by the practitioners' review.

This repository is **public** (since 17 September 2026, so Collaborative members can fork ahead of the call to all sponsors on 28 September). Nothing programme-internal goes here: staff memos, meeting notes and Slack posts live in the private collaborative repo under `docs/keynote-internal/`.

## Get it running in five minutes

```bash
git clone https://github.com/onug/Fall26Demo.git
cd Fall26Demo/web-demo
npm install
npm run dev
```

Open http://localhost:3000, press `F` for fullscreen, `Space` to advance, a beat number to jump. The recorded narration plays after the first key press (browsers require a gesture before audio). `N` mutes it, `T` shows the narration text.

If `next dev` hangs at "Starting..." (it does on a cloud-synced folder), `npm run build` and serve `out/` with `python3 -m http.server 3100`.

Requirements: Node 20 or newer, npm. Python 3 only to regenerate narration. macOS only for the keychain lookup and audio-duration measurement.

## Where things live

| Path | What |
|------|------|
| `web-demo/lib/steps.ts` | **The script.** Every step: title, narration, events, topology changes, metrics, pause markers. The file you will edit most. |
| `web-demo/lib/data.ts` | Lanes; the nine controls with the WG requirement ids each translates; topology nodes; reference-architecture cards; gap rows; threat scenarios; proof points; vendor lanes and mechanics; member marks and reviewer credits. |
| `web-demo/lib/types.ts` | The data model. Read this first to add a new kind of step. |
| `web-demo/components/` | React. `DemoStage.tsx` orchestrates; `Topology.tsx` is the SVG; one component per full-screen card (`RACard`, `GapCard`, `ThreatCard`, `VendorLanes`, `ProofPoints`, `AcceleratorView`, `TitleSlide`, `LogoWall`). |
| `web-demo/public/narration/*.mp3` | Recorded narration, one file per step id. |
| `web-demo/public/ra/` | Peter Campbell's three reference-architecture drawings, ONUG design language, pinned to WG1 v0.2, WG2 v0.6, WG3 v0.6. |
| `web-demo/public/logos/` | Member marks for the title strip and the finale wall. |
| `docs/narration-script.md` | Exported script with word counts and durations (generated). |
| `docs/presenter-guide.md` | Run of show, talking points per pause, every number on screen. |
| `docs/review-feedback.md` | What each reviewer said and what the demo did about it. The credit ledger. |
| `docs/vendor-instructions.md` | The challenge: lanes, controls with requirement ids, timeline, rules, format, naming, glossary, the Summit. Draft v4; the Google Doc copy is linked from its status line. |
| `docs/vendor-call-email.md` | The call for entries that goes to every sponsor on 28 September. Draft. |
| `docs/vendor-guide.md` | The older fork-and-pick-a-lane guide; superseded by the instructions, kept for the Dallas-shaped reader. |
| `CLAUDE.md` | Architecture notes and common tasks, written for Claude Code and useful for humans. |

## The edit loop

1. Change a step in `web-demo/lib/steps.ts` (or a card's data in `data.ts`).
2. `npm run narration:export`, then regenerate the audio for any step whose narration changed:
   ```bash
   python3 scripts/generate-narration.py --force --only <step-id> [<step-id> ...]
   ```
3. `npm run qa` — replays every step, checks ids, references, audio and export freshness, then type-checks. Must be 0 failures.
4. `npm run build`; walk the affected beat in the browser.
5. Update `docs/presenter-guide.md` and `docs/release-notes.md` if a number, a title or the step count changed; log the reviewer's note in `docs/review-feedback.md`.
6. Commit MP3s with the script change. Delete any `name 2.ext` files the cloud sync dropped before `git add -A`.
7. Branch, PR, merge, tag `vX.Y.Z`, then ship to the portal (below).

Step ids double as audio filenames; renaming one orphans its clip.

## Narration and the ElevenLabs account

- Voice: the cloned **Nick Lippis** voice on the ONUG ElevenLabs account (voice id `16VamcPQIJBvVLoE1Zss`), speed 1.2. Sarah (`EXAVITQu4vr4xnSDxMaL`) was the Dallas voice: `--voice EXAVITQu4vr4xnSDxMaL`.
- The API key is **not** in the repo. The generator reads `ELEVENLABS_API_KEY` from the environment, or on Nick's Mac from the keychain item `elevenlabs`.
- A full regeneration bills about 11,000 characters; use `--only` for the steps that changed. Nick's target is ten minutes recorded; `npm run narration:export` prints the figure.
- Playback: `public/narration/<id>.mp3` if it exists, otherwise browser speech synthesis reads the same text, so a missing file degrades rather than breaks.

## Where members watch it, and where their notes go

The demo is inside collaborative.onug.net at `/keynote`, behind the portal's login, reached from the first card on the Demos tab (collaborative repo, AD-122). Live since 12 September 2026; v0.3.3 since 17 September. The portal holds a vendored copy of the build. To ship a new version:

1. Here: `cd web-demo && npm run build:portal` (sets `NEXT_PUBLIC_BASE_PATH=/keynote/app`). Delete any `name 2.ext` files under `out/` first; the import copies everything.
2. In the collaborative repo: `bin/import_keynote.py /path/to/Fall26Demo/web-demo/out --version vX.Y.Z`, set `version` and `updated` in `config/keynote.toml`, add the "what changed because somebody said so" rows, run the suite, PR, merge, deploy (`gcloud run deploy collab-feed --source . --region=us-east1 --project=onug-collaborative`).

**Feedback.** The form under the demo emails Nick, Peter and Tony and keeps every note on the portal's staff-only page `/keynote/feedback` (AD-130). Log each note in `docs/review-feedback.md` here with what was done, and mirror the outcome into `config/keynote.toml` there, so the member sees their note changed something.

## The vendor challenge

`docs/vendor-instructions.md` is the source of record; the Google Doc linked from its status line is the copy for marking up. Members had the demo, the repo and the instructions on 17 September; every sponsor gets them when the call opens on 28 September (`docs/vendor-call-email.md`). Dates marked ▲ are proposals until Bill Sell and Jesi confirm: intent to enter 2 October, online office hours 7 and 16 October, final video 19 October, schedule and ballots 23 October. Members' vote in Whova, Best in Show per lane; the on-site schedule for presentations, Challenge Walks and office hours is still being built and is posted in the Collaborative Slack.

## Things that are deliberately not done

- **Vendor overrides.** Dallas let a vendor swap its product name and logo into the "enable" and "blocked" steps. The Fall equivalent is per-lane overrides. Not built; vendors fork and build their own response.
- **Video export.** The interactive build is the source; the MP4 is a screen-capture job once the script locks. Record at 1920×1080, narration text hidden (`T`).
- **Live demo / Docker.** Fall is web-only by design.
- **Company artwork.** eBay's and Huntington's marks are from Wikimedia Commons until the companies supply artwork. Mick Currey is credited by name and WG1 role only, at his request; Baird Kaake by name and WG1 until he says how he wants to appear.

## Accounts and access

| What | Who / where |
|------|-------------|
| GitHub repo | `onug/Fall26Demo`, public since 17 September 2026. Admins: Nick (`nicklippis`), Tony (`tfarinacci`); Peter (`securitysonar`) is a collaborator. |
| ElevenLabs | ONUG account; key with Nick. |
| Reference architectures | Peter's "Agentic Control Plane requirements and architecture pack" (his ACP local wiki, headed for GitHub Pages under onug/) is the terminology source. The drawings in `public/ra/` are cut from it. |
| Dallas reference | `github.com/onug/AOMC-demo`, public. |
| Arc document | `docs/ONUG_Fall_2026_Keynote_Demo_Arc.docx`. |

## What happens next

1. Co-chair review closes; the script locks. Reactions before 19 September reach that review.
2. Baird says how he wants to be credited; eBay and Huntington send artwork.
3. Bill and Jesi confirm the ▲ dates; the call for entries goes to every sponsor on 28 September.
4. Office hours 7 and 16 October; final videos 19 October.
5. Screen-capture the locked build to MP4 for the production pass.
6. Nick and Peter present it on 28 October.

## Questions

Nick Lippis, nick@onug.net. Peter Campbell, peter@onug.net, for the working groups and the reference architectures. Tony Farinacci for the Dallas demo's internals.
