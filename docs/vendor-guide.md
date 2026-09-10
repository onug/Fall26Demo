# Vendor Guide — The Three-Lane Challenge

**Status: draft.** The challenge mechanics (submission deadline, video format, voting) are being finalized by ONUG. This page describes the structure and how to work with the reference implementation. It will be updated when the mechanics are locked and the repository is made public.

## The structure

The keynote shows one control plane operating across three working-group domains. The vendor challenge mirrors that: three lanes, matching the working groups.

| Lane | Working group | The challenge | What "prove it" looks like |
|------|---------------|---------------|----------------------------|
| 1 | Agentic Control Plane | Supervise agents from outside. No self-attestation. | Identity and provenance for every agent and artifact · runtime rogue detection and kill switch · immutable, hash-chained audit journal |
| 2 | Autonomous Infrastructure | Let agents run the fabric, with every write mediated. | Verify gate: change-stop, dry-run, blast radius, rollback · declared autonomy levels per agent · bounded auto-act with automatic revert |
| 3 | AI-Enabled SOC | Compress detect-to-decide to seconds without destroying evidence. | Cross-domain correlation: fabric + plane + SOC · deliberate, gated containment · evidence preserved with chain of custody |

**Pick your lane.** No vendor is expected to cover all three. Specializing where you are strong is the structure, not a concession.

## How it works

1. **Fork** `github.com/onug/Fall26Demo` (once public).
2. **Pick a lane** and show your product doing that lane's job inside the keynote's story. The poisoned pull, the verify gate, the containment sequence are the shared narrative; your product is what makes the catch, gates the write, or preserves the evidence.
3. **Submit a playable video** (MP4) of your version. ONUG shows submissions at various places and times throughout the conference.
4. **Best in Show, per lane.** Attending members vote in the room.

The working groups' own demos and challenges are also up for awards; the keynote points the audience toward them.

## Working with the reference implementation

The demo is a Next.js app in `web-demo/`. Everything you would change is data:

- **`web-demo/lib/steps.ts`** is the script. Each step has a title, narration, event-feed lines, topology changes, and metrics. To put your product on screen, edit the steps in your lane's beat: Beat 2 for Lane 1, Beat 4 for Lane 2, Beat 5 for Lane 3.
- **`web-demo/lib/data.ts`** holds the control names and details shown in the right-hand panel (`CONTROLS`), the topology nodes, and the lane definitions.
- **Narration** is text on each step, played from `web-demo/public/narration/<step-id>.mp3` if present, otherwise read by the browser. Record your own, or run the ElevenLabs generator with your own key (`scripts/generate-narration.py`).

Rules of the road, carried over from Dallas:

- **Do not change the violation steps.** The failure is shared; what differs is the catch.
- **Keep the AOMC framing.** Your product is shown as the implementation of a control-plane capability, not as a replacement for the plane.
- Match the visual language (dark theme, the beat colors) so the audience reads your video as part of the same story.

## Per-lane overrides (planned)

Dallas shipped `vendor-config.ts`: one file where a vendor set its name, logo, accent color, and a product name plus custom text per control, with the merge engine leaving violation steps untouched. The Fall equivalent is a per-lane override: one lane, its enable and blocked steps, and the panel badges. It will land after the arc is locked. Until then, edit `steps.ts` directly in your fork.

## Recording your video

- Run `npm run build` and serve `web-demo/out/`, or use `npm run dev`.
- Press `F` for fullscreen and `T` to hide the narration text if you want a cleaner frame.
- Capture at 1920×1080. Advance with `Space`; the recorded narration finishes before you move on.
- Target the same length as the keynote segment for your lane, about 60 to 90 seconds.

## Contact

ONUG Collaborative working groups: Peter, peter@onug.net. Demo repository: Nick Lippis, nick@onug.net.
