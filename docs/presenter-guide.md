# Presenter Guide — "One Control Plane, Every Domain"

ONUG Fall AI Networking Summit · New York City · October 28, 2026 · Keynote demo, ~5–6 minutes with pauses.

Two presenters: Nick plus one co-presenter. The demo narrates itself. You advance it with `Space` and stop at the six marked pause points to talk to the room. Nothing auto-advances.

## Before you go on

- Open the demo, press `F` for fullscreen, press `R` to reset to the title.
- Voice: `N` mutes the narration voice. Text: `T` hides the narration text at the bottom if you want a cleaner stage picture.
- `1` through `7` jump straight to a beat if you need to recover.
- Recorded narration (when production delivers it) goes in `web-demo/public/narration/<step-id>.mp3`. Until then the browser's voice reads the same script.

## The run of show

| # | Step | What the room sees | Pause? |
|---|------|--------------------|--------|
| 1 | Title | One Control Plane, Every Domain. WG1/WG2/WG3 named. | |
| 2 | Beat 1 title | The Poisoned Pull | |
| 3 | T+00:00 A routine model refresh | Fabric agent pulls a model from a public hub. Looks normal. "NO SUPERVISION PLANE" ghosted at the top. | |
| 4 | T+00:04 The artifact loads | Payload fires. Agent still reports HEALTHY. | **Pause 1** — "It looks like an agent doing its job." |
| 5 | T+00:19 The agent goes to work | Routes poisoned, ACL opened, telemetry dark, topology exfiltrated. Counters climb. | |
| 6 | NO SUPERVISION PLANE | Red flash. The failure named. | |
| 7 | T+03:51 Nobody knows yet | Low-priority ticket. Threat actor appears. 11-day dwell. | |
| 8 | Blast radius | Seven red bullets. | **Pause 2** — the "if you don't have these controls" branch |
| 9 | Beat 2 title: You Are Here | Rewind. Dallas → 25 requirements. | |
| 10 | AOMC Control Plane online | Orange band appears above the lanes. Five WG1 controls light up. | |
| 11 | T+00:00 The same routine pull | Provenance tags the artifact TAINTED, stages it to a sandbox. | |
| 12 | T+00:04 Artifact loads, agent self-attests | Runtime ignores self-attestation. Drift 97/100. | |
| 13 | ROGUE DETECTED — KILL SWITCH | Green shield. Writes blocked before device. Agent quarantined. Journal. | |
| 14 | AOMC sits outside the agents | Principle card. 6 seconds, 0 writes. | **Pause 3** — connect to Dallas |
| 15 | Beat 3 title: One Plane, Three WGs | | |
| 16 | The plane, wired across every domain | WG2 and WG3 lanes light up. Verify gate node appears. | |
| 17 | Beat 4 title: Battleground 1 | | |
| 18 | T+00:41 Detect | NOC agent at autonomy level 0 sees route flaps from the attacker's AS. | |
| 19 | T+00:47 Diagnose → Recommend | Level 1. Four proposed writes. | |
| 20 | Verify gate, writes 1–3 | Four checks pass in sequence. APPROVED. Level 2. | |
| 21 | Verify gate, write 4 | Blast radius 100% of pods. REJECTED → ESCALATED to a human. | |
| 22 | T+00:52 Execute, journal, bounded auto-act | Flaps clear. Level 3 only inside the low-risk envelope. | |
| 23 | Safe autonomy — WG2 | Six green bullets. | **Pause 4** — "Nothing executes blindly." |
| 24 | Beat 5 title: Battleground 2 | | |
| 25 | T+00:58 The exploit escalates | Sandbox beacons to C2. Threat actor replays a token toward the NOC agent. | |
| 26 | T+01:02 Detect → Decide in 4.2s | Five signals, three domains, one incident. Token replay dead on arrival (identity revoked at T+6). | |
| 27 | Same plane, same gate | Containment plan hits the gate. "Wipe host" REJECTED by evidence hold. | |
| 28 | CONTAINED — EVIDENCE PRESERVED | Green shield. Segment isolated, C2 blocked, sandbox snapshotted to the vault. | |
| 29 | Same plane, second battleground | Green bullets plus the full audit journal. | **Pause 5** — "That's what makes it a control plane, not three demos." |
| 30 | Beat 6 title: From Seatbelt to Accelerator | The pivot. | |
| 31 | Business units build on the plane | Four BU agents plug into the plane: claims, surveillance, supply chain, care. 6 weeks → 4 days. | |
| 32 | This is already happening | EY Canvas · Cisco · Salesforce Agentforce at Reddit. Governance-board footnote. | **Pause 6** — greed, "don't be left behind" |
| 33 | Beat 7: The Vendor Challenge | Three lanes. Pick one. Submit an MP4. Best in Show per lane. | |
| 34 | Finale | Fear / plane / accelerator in three lines. Go watch, go vote. | |

## Talking points at each pause

**Pause 1 (step 4).** Nothing on screen announced itself as an attack. The pull succeeded, the job said SUCCESS, the agent says HEALTHY. Ask the room: who in your organization checks a weights file?

**Pause 2 (step 8).** This entered through networking. It landed in the infrastructure before anyone knew it was a threat. Eleven days is the industry mean; the ticket said "review Monday."

**Pause 3 (step 14).** Bridge to Dallas. The six controls became twenty-five requirements. The one principle worth repeating: the plane sits outside the agents. Agents cannot vouch for themselves.

**Pause 4 (step 23).** The infrastructure question: can I let an agent touch the fabric? Yes, when every write is mediated. Point at write #4: the gate said no, handed a human the homework, and the agent could not argue.

**Pause 5 (step 29).** Containment is a write too, so it hit the same gate. Same plane, same governance model, different fight. The evidence hold is the detail security leaders will remember.

**Pause 6 (step 32).** The pivot from fear to greed. The plane is the enablement layer. Keep Cisco framed around ambition. Mark Salesforce as vendor-reported. Land the footnote: prove the controls and your own governance board moves faster.

## Numbers used on screen

| Figure | Where | Status |
|--------|-------|--------|
| 1,214 devices, 3,708 routes, $180M+, 11 days | Beat 1 | Illustrative, synthetic enterprise |
| 6 seconds to quarantine, 0 writes reached a device | Beat 2 | Demo-defined |
| 0.8% blast radius (approved), 100% of pods (rejected) | Beat 4 | Demo-defined |
| 4.2 seconds detect-to-decide, 5 signals, 3 domains | Beat 5 | Demo-defined |
| 6 weeks → 4 days approval cycle | Beat 6 | Illustrative |
| EY Canvas ~1.4T lines, 160K engagements, 150+ countries, 130K professionals | Beat 6 | Public, per the arc |
| Cisco ~90,000 employees, FY starting late July 2026 | Beat 6 | Public, per the arc; frame around ambition |
| Salesforce Agentforce at Reddit 84%, $100M+ | Beat 6 | Vendor-reported, per the arc |

Confirm the public figures against the source articles before the arc is locked.
