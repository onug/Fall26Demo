# Release Notes

## v0.1.0 — First working cut (September 10, 2026)

First end-to-end build of the ONUG Fall 2026 keynote demo, "One Control Plane, Every Domain". This is a review cut for the co-chairs, not the locked stage version. The narrative arc it implements is a working draft; expect the script to change after practitioner review.

### What's in it

**The demo.** A presenter-controlled web presentation (`web-demo/`) that plays all seven beats of the keynote arc as 34 steps. Same architecture and visual language as the Dallas AOMC demo so the audience recognizes it: event feed on the left, animated topology in the center, control plane and impact panels on the right, red flash for violations, green shield for blocks.

| Beat | Steps | What happens |
|------|------:|--------------|
| Open | 1 | Title card with the three working groups |
| 1 · The Poisoned Pull (fear) | 7 | Routine model pull carries a payload. Agent self-attests healthy while it poisons routes, opens the management plane, blinds telemetry, exfiltrates topology. Blast radius. |
| 2 · The AOMC Catch | 6 | Rewind. Control plane online. Provenance tags the artifact, runtime monitoring ignores self-attestation, kill switch in 6 seconds with zero writes reaching a device. |
| 3 · One Plane, Three WGs | 2 | The plane extends into the WG2 and WG3 lanes. |
| 4 · Autonomous Infrastructure (WG2) | 7 | Detect, diagnose, propose. Every write hits the verify gate. Write #4 fails blast radius and escalates to a human. Autonomy ladder climbs observe → bounded auto-act. |
| 5 · AI-Enabled SOC (WG3) | 6 | Exploit escalates. Five signals across three domains correlated in 4.2 seconds. Containment hits the same gate; "wipe host" rejected by evidence hold. Audit journal shown in full. |
| 6 · Seatbelt to Accelerator (greed) | 3 | Business units plug into the plane. Public proof points: EY Canvas, Cisco, Salesforce Agentforce at Reddit. Governance-board footnote. |
| 7 · The Vendor Challenge | 2 | Three lanes, pick one, submit an MP4, Best in Show per lane. Finale. |

**Nine control-plane capabilities** replace the Dallas six: WG1 identity attestation, artifact provenance, runtime monitoring, immutable audit journal, kill switch; WG2 verify gate, autonomy levels; WG3 detect→decide, deliberate containment.

**New visual elements** beyond Dallas: the control plane rendered as a band above the lanes (and a ghosted "NO SUPERVISION PLANE" in Beat 1), a verify-gate node and animated four-check gate panel, an autonomy ladder, a hash-chained audit journal, and three full-screen views for the accelerator, proof points, and vendor lanes.

**Presenter features.** Keys 1–7 jump to a beat. Six presenter pause points are marked in the header. Narration voice (`N`) and text (`T`) toggle independently. Nothing auto-advances.

**Recorded narration.** All 34 steps voiced with the cloned Nick Lippis voice on the ONUG ElevenLabs account, checked into `web-demo/public/narration/`. Regeneration is one command; the key is read from the macOS keychain and never stored in the repo.

**Docs.** README, CLAUDE.md, presenter guide, handover, vendor guide, and a generated narration script for review.

### Known issues and open items

1. **Narration is too long.** Recorded audio totals 11.4 minutes against a target of roughly 5 minutes plus pauses. The script needs to be cut by about half. Longest segments: proof points (37s), gate pass (26s), Beat 2 load (26s), SOC detect (25s). See `docs/narration-script.md`.
2. **Public proof-point figures are unverified.** EY Canvas, Cisco, and Salesforce numbers come from the arc document and must be checked against sources before the arc locks. The Cisco framing deliberately avoids the headcount debate; Salesforce is marked vendor-reported.
3. **All incident numbers are illustrative.** Device counts, route counts, dollar exposure, dwell time, detect-to-decide seconds, and approval-cycle times are demo-defined, not sourced.
4. **Repo is private.** Vendors cannot fork until it is made public. Tony has admin access; Peter (`securitysonar`) must be added as a collaborator.
5. **Vendor customization not carried over.** Dallas had `vendor-config.ts` for vendor branding and per-control overrides. The Fall mechanism (per-lane overrides) is designed but not implemented, pending the arc lock and the vendor challenge mechanics.
6. **Co-presenter not decided.** The pause-point talking points in the presenter guide are written for Nick; they need splitting once the co-presenter is chosen.
7. **No automated tests.** The demo is verified by type-check, production build, and a manual walk-through. That is consistent with the Dallas demo and appropriate for presentation code.

### Verification performed

- `tsc --noEmit` clean; `next build` static export succeeds.
- Every step walked in a 1920×1080 browser; overlays, gate panel, journal, and all three full-screen views confirmed rendering.
- All 34 MP3s generated, served by the dev server with `audio/mpeg`, durations measured.

### Commits

```
7da18c8 Add ElevenLabs narration pipeline and recorded audio (cloned Nick Lippis voice)
16ca4a6 Add Fall 2026 keynote web demo: One Control Plane, Every Domain
e15dd26 Initial commit: scaffold Fall26Demo
```
