# QA Report — v0.1.1

Date: September 10, 2026. Scope: the web demo as committed at v0.1.0, then re-run after fixes.

## Summary

| Area | Result |
|------|--------|
| Type-check (`tsc --noEmit`) | Pass |
| Production build (`next build`, static export) | Pass |
| Script integrity (`npm run qa`) | **1 failure, 40 warnings at v0.1.0 → 0 / 0 after fix** |
| Browser walk, all 34 steps | Pass: every step reached in order, no console errors, no `NaN` / `undefined` / `[object Object]` in rendered text |
| Presenter pause badges | Pass: on steps 4, 8, 14, 23, 29, 32, matching the presenter guide |
| Narration audio | Pass: 34 of 34 files present, valid MP3 headers, served as `audio/mpeg`, 20 KB to 572 KB each |
| Presenter guide vs. script | Pass: 34 rows map to 34 steps in order; pause points match; on-screen numbers match |
| Docs cross-references | Pass: README index, CLAUDE.md tree, handover paths all resolve |

## Defects found and fixed

### 1. Attacker nodes never re-appear after the rewind (visual, high)

Beat 1 shows the C2 mirror and the threat actor. Beat 2's "You are here" step resets state so the poisoned pull can replay with the plane online. Nothing after that step made those two nodes visible again, but Beat 4 and Beat 5 add edges from them: the prefix probe into the edge routers, the sandbox beacon, and the token replay. The topology only draws an edge when both endpoints are visible, so all three edges were silently dropped. The narration described an attacker the audience could not see.

Fix: show the C2 node at Beat 4's detect step with a PROBING label, show the threat actor at Beat 5's escalate step with the C2 marked SECOND STAGE, and mark the C2 BLOCKED AT EDGE on containment.

### 2. Containment blocks an edge that does not exist (script, low)

The contained step updated `e-actor-c2` to blocked. That edge was created in Beat 1 and wiped by the rewind, so the update was a no-op. Fix: the escalate step now re-creates the threat-actor → C2 edge, and containment blocks it.

Both were caught by the new integrity check, not by eye, which is the argument for keeping it in the loop.

## Checks performed

**Static.** `npx tsc --noEmit` clean. `npm run build` produces the static export with no warnings beyond Node's own deprecation notice.

**Script integrity** (`web-demo/scripts/qa.mjs`). Loads `steps.ts` and `data.ts` through the TypeScript compiler, then replays every step exactly as `DemoStage` does. Asserts: unique, filename-safe step ids; narration and title on every step; beats 1–7 all present and monotonic; gate phases carry a proposal; outcome lists carry a tone; control and metric keys exist; every topology change targets an existing node or edge; visible edges connect visible nodes; quarantine and compromise labels target existing nodes; an MP3 exists per step and is larger than 20 KB; no orphan MP3s; `narration/script.json` text matches the current narration.

**Browser walk.** Drove the app in a 1920×1080 Chromium tab by dispatching keyboard events, one step at a time with a yield for React to flush. Recorded per step: the step counter, event-feed row count, SVG element count, presence of the pause badge, and any `NaN`, `undefined`, or `[object Object]` in body text. Captured `console.error` and `window.onerror`. Result: 34 distinct steps in order, feed and SVG counts rise through each beat and drop to zero on title cards as designed, zero errors.

**Audio.** Every file requested from the dev server returns 200 with `audio/mpeg`. Byte headers are ID3 or MPEG frame sync. Total 11.4 minutes.

**Docs.** Presenter-guide rows cross-checked against step order and titles; the six mismatches reported were generic row labels ("Title", "Beat 1 title") and not defects. Numbers appearing on screen (1,214 devices, 3,708 routes, $180M+, 11 days, 6 seconds, 4.2s, 0.8%, 100%) present in both script and guide. Proof-point figures live in `data.ts`, not `steps.ts`, and match the guide.

## Not covered

- Audio *content* was not listened to end to end. Spot-checked durations against word counts (about 2.5 words per second, consistent throughout). A full listen is part of the script-cut pass.
- Framer Motion entrance animations cannot be verified from a hidden browser tab (they pause when the tab is not visible). Verified from a fronted tab on the gate, journal, and full-screen views earlier; not re-verified on every step.
- No accessibility or mobile checks. The demo targets one 1920×1080 stage screen.
- Static export not served and walked separately from the dev server. The build succeeds; the output is the same component tree.

## Known issues carried forward

From the v0.1.0 release notes: narration length (11.4 min vs ~5 target), unverified public proof-point figures, illustrative incident numbers, private repo, vendor per-lane overrides not built, co-presenter not decided.
