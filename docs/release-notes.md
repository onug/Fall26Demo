# Release Notes

## v0.3.0 — Everyone's input, one pass (September 15, 2026)

Built from `docs/v0.3-plan.md`: the 15 September co-chair review (Mick Currey, Rick Casarez, Chris Hertenstein, Baird Kaake, Peter Campbell), Mick's 14 September email, Baird's and Chris's Slack notes, and Nick's decisions of 15 September (ransomware ending, ten-minute target, close on the community message). Full log in `docs/review-feedback.md`.

- **Beat 1 ends in ransomware.** New step *Day 6 — Everything is down*: admin and service identities rotated by the attacker, backups deleted, disks encrypted, nobody can log in, then the note. Two new topology nodes (Identity · IdP, Backups) appear only for this step. The dwell step now says why the attacker doesn't touch routes on day one (Rick's drift scanner). The blast radius summary follows the ransom note. [Mick, Rick]
- **Beat 1 closes on a gap analysis.** New full-screen card *Which of these do you have?*: six rows, what happened and the control that stops it. No company is named and no score is kept (Nick: no attribution about who has what); the card asks the room. Pause 2 moves here. [Chris, Rick, Mick, Nick]
- **The write path is explained once.** The fabric optimizer was provisioned with write rights because that is its job; whatever it loads inherits them. Beat 4 pays it off at the gate. [Rick]
- **The registry step is named as ahead of most companies.** [Mick]
- **Agent personas.** Every agent enrolls with a declared persona (who it acts for, what it may want, its autonomy envelope); three personas are registered when the plane comes online, runtime monitoring measures drift against the declared persona, and the business-unit cards in Beat 6 say persona + identity. [Peter]
- **"Agentic control plane", named.** The band, the panel and each beat's first mention say agentic control plane rather than "the plane" alone. [Baird]
- **The sandbox runs the artifact for real.** One line in Beat 2: its writes are intercepted before any device. [Baird]
- **The reference architectures, one card each.** New `ra` phase and `RACard` component showing the ratified drawings unaltered on a white panel (lifted as inline SVG from the WG1 shared folder into `web-demo/public/ra/`), with planning phase, execution phase and the gate named beside them: the unified map and the WG1 control plane in Beat 3, WG2 v0.6 at the Beat 4 title, WG3 v0.6 at the Beat 5 title. Loop step names in Beats 4 and 5 now follow the drawings (detect · diagnose · propose · verify · execute · validate; detect · investigate · propose · decide · respond · validate). Beat 5's gate is the Decide Gate. [Nick, Peter]
- **Beat 5's escape rewritten.** The second stage is an agent, not a script: it probes the sandbox boundary, finds a weakness nobody knew about, and gets out. Narration cites the Hugging Face incident and Rick's line on agents and ethics. "That used to take a shift" is now "four to eight hours across three teams". [Mick, Rick]
- **Proof points.** Kept all three; the card and narration now draw the line between an employee's personal agent and a company's agentic workflow. [Baird, Mick, Nick's decision 3, option b]
- **What else the same controls stop.** New `threats` card before the vendor challenge: indirect prompt injection, agent misuse of legitimate rights, over-broad write access, each mapped to the control. Built from the three Baird gave in the meeting; grows when his list arrives. [Baird]
- **Vendor challenge mechanics on the card.** Fork, working-group terminology, 5–10 minute MP4, showcase theatre on loop, presentation schedule, office hours, Whova vote per lane. [Nick, Peter]
- **The close.** The finale is now the message to the community: the vendor demos play in the networking areas and the Collaborative Center; go watch, vote Best in Show per lane in Whova. The logo wall shows the practitioner members (Cigna, FedEx, HSBC, Memorial Sloan Kettering, RTX) and the founding technology members, marks only, no wordmarks: a company with no mark on file is not shown, because their name on a keynote screen needs their permission. The reviewers' names sit under it. The title card carries the same two groups as a strip. [Nick]
- **Narration cut to the ten-minute target.** Every existing narration trimmed; 41 of 42 segments regenerated (cloned Nick voice, speed 1.2). Recorded audio: 10.5 minutes across 42 steps (was 9.3 across 35). The presenter pauses are outside that budget.
- **Assets:** `public/ra/` (four SVGs), `public/logos/` (nineteen marks, copied from the collaborative portal's founding wall, which took them from the Collaborative Logos and Consumer Logos Drive folders; RTX converted to PNG for the portal's media-type list), `lib/assets.ts` for the base-path prefix.

## v0.2.1 — Narration speed 1.2 (September 10, 2026)

- All 35 segments regenerated with ElevenLabs `speed: 1.2` (the API maximum) at Nick's request. Speed is now a generator default and a `--speed` flag, recorded in `script.json` metadata.

## v0.2.0 — Practitioner feedback: best practices weren't enough (September 10, 2026)

Incorporates Mick Currey's (Fidelity) review of the arc. Full log in `docs/review-feedback.md`.

- **Beat 1 reframed.** The company now follows best practices: a Managed Registry node is the only source, developers and agents cannot download directly, and a new step (*T-7d: Best practices, working as designed*) shows the registry scan clean, generate an SBOM, find zero CVEs, hold for seven days, and release. The payload is novel and frontier-model-crafted with no scanner signature. The violation card is now "Best practices weren't enough." Pause lines updated to Mick's.
- **Beat 2 reframed** around one governance change: every new artifact runs in a sandbox under the plane before release. The registry hands v3.2 to a sandboxed instance; production stays on v3.1. Runtime monitoring catches the drift inside the sandbox; the kill switch quarantines it there. "Never exposed to the company network."
- **Topology:** new `managed-registry` node in the infrastructure lane and `poisoned-sandbox` node next to the sandbox; SOC row nudged up so the registry pull edge clears it.
- **Beats 4 and 5** now refer to the sandbox instance's identity and to the supply chain as the entry point.
- Step count 34 → 35. Narration regenerated for the changed steps only.

## v0.1.1 — QA pass (September 10, 2026)

- **Fixed:** the threat actor and C2 mirror nodes were shown in Beat 1, wiped by the Beat 2 rewind, and never shown again, so the attacker's probe edge in Beat 4 and the beacon and token-replay edges in Beat 5 silently failed to render. They now appear when the story needs them and the C2 node carries PROBING → SECOND STAGE → BLOCKED AT EDGE labels.
- **Fixed:** the containment step tried to block an edge that no longer existed after the rewind; the threat-actor → C2 edge is now re-created in Beat 5 and blocked on containment.
- **Added:** `npm run qa` (`web-demo/scripts/qa.mjs`), a script-integrity check that replays every step the way the demo does and validates ids, node and edge references, edges with hidden endpoints, audio files, and export freshness. It caught both bugs above.
- **Verified:** full QA report in `docs/qa-report.md`.

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
