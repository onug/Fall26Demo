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
| 2 | Beat 1 title | The Poisoned Pull. A company doing everything right. | |
| 3 | T-7d Best practices, working as designed | Managed Registry pulls v3.2 from the public hub. Scan clean, SBOM, 0 CVEs, 7-day hold, released. | |
| 4 | T+00:00 A routine model refresh | Fabric agent pulls v3.2 from the managed registry, not the hub. "NO SUPERVISION PLANE" ghosted at the top. | |
| 5 | T+00:04 The artifact loads | Novel payload fires. No scanner has a signature. Agent still reports HEALTHY. Registry marked PASSED EVERY SCAN. | **Pause 1** — "Every best practice passed. It still got in." |
| 6 | T+00:19 The agent goes to work | Routes poisoned, ACL opened, telemetry dark, topology exfiltrated. Counters climb. | |
| 7 | BEST PRACTICES WEREN'T ENOUGH | Red flash. The failure named. | |
| 8 | T+03:51 Nobody knows yet | Low-priority ticket. Threat actor appears. 11-day dwell. Scanner signature ships on day 11. | |
| 9 | Blast radius | Eight red bullets, the first one: every best practice passed. | **Pause 2** — "The best practices in place today are still not good enough." |
| 10 | Beat 2 title: You Are Here | Rewind. Dallas → 25 requirements. One governance change: new artifacts run sandboxed first. | |
| 11 | AOMC Control Plane online | Orange band appears above the lanes. Five WG1 controls light up. | |
| 12 | T+00:00 Same artifact, new policy | Registry releases v3.2; provenance routes it to the sandbox. Production stays on v3.1. | |
| 13 | T+00:04 Loads in the sandbox, self-attests healthy | Payload fires inside the sandbox. Runtime ignores self-attestation. Drift 97/100. | |
| 14 | CAUGHT IN THE SANDBOX — KILL SWITCH | Green shield. Writes never leave the sandbox. Identity revoked, artifact quarantined, production untouched. | |
| 15 | AOMC sits outside the agents | Principle card. Best practices inspect the artifact; the plane watches the behavior. 6 seconds, 0 writes. | **Pause 3** — connect to Dallas |
| 16 | Beat 3 title: One Plane, Three WGs | | |
| 17 | The plane, wired across every domain | WG2 and WG3 lanes light up. Verify gate node appears. | |
| 18 | Beat 4 title: Battleground 1 | | |
| 19 | T+00:41 Detect | NOC agent at autonomy level 0 sees route flaps from the attacker's AS. | |
| 20 | T+00:47 Diagnose → Recommend | Level 1. Four proposed writes. | |
| 21 | Verify gate, writes 1–3 | Four checks pass in sequence. APPROVED. Level 2. | |
| 22 | Verify gate, write 4 | Blast radius 100% of pods. REJECTED → ESCALATED to a human. | |
| 23 | T+00:52 Execute, journal, bounded auto-act | Flaps clear. Level 3 only inside the low-risk envelope. | |
| 24 | Safe autonomy — WG2 | Six green bullets. | **Pause 4** — "Nothing executes blindly." |
| 25 | Beat 5 title: Battleground 2 | | |
| 26 | T+00:58 The exploit escalates | Sandbox beacons to C2. Threat actor replays a token toward the NOC agent. | |
| 27 | T+01:02 Detect → Decide in 4.2s | Five signals, three domains, one incident. Token replay dead on arrival (identity revoked at T+6). | |
| 28 | Same plane, same gate | Containment plan hits the gate. "Wipe host" REJECTED by evidence hold. | |
| 29 | CONTAINED — EVIDENCE PRESERVED | Green shield. Segment isolated, C2 blocked, sandbox snapshotted to the vault. | |
| 30 | Same plane, second battleground | Green bullets plus the full audit journal. | **Pause 5** — "That's what makes it a control plane, not three demos." |
| 31 | Beat 6 title: From Seatbelt to Accelerator | The pivot. | |
| 32 | Business units build on the plane | Four BU agents plug into the plane: claims, surveillance, supply chain, care. 6 weeks → 4 days. | |
| 33 | This is already happening | EY Canvas · Cisco · Salesforce Agentforce at Reddit. Governance-board footnote. | **Pause 6** — greed, "don't be left behind" |
| 34 | Beat 7: The Vendor Challenge | Three lanes. Pick one. Submit an MP4. Best in Show per lane. | |
| 35 | Finale | Fear / plane / accelerator in three lines. Go watch, go vote. | |

## Talking points at each pause

**Pause 1 (step 5).** This company did everything right: one managed registry, no direct downloads, scans, SBOM, CVE checks, a seven-day hold. The artifact passed all of it, because the payload was written after the scanners were. Ask the room: which of these controls do you have? Then: which of them watches what the agent does after it loads?

**Pause 2 (step 9).** Mick Currey's line: show them their worst fear. The best practices in place today are still not good enough. Scanners are a snapshot of what is already known; frontier models will write malware nobody has a signature for. Eleven days is the industry mean; the ticket said "review Monday."

**Pause 3 (step 15).** Bridge to Dallas. The six controls became twenty-five requirements. The one principle: the plane sits outside the agents; agents cannot vouch for themselves. Best practices inspect the artifact, the plane watches the behavior. Mick's other option, if asked: even if an artifact slips past the sandbox, the plane sits outside every agent, so the first environment it lands in is the blast radius, not the enterprise. That is exactly what Beat 5 shows when the second stage tries to break out.

**Pause 4 (step 24).** The infrastructure question: can I let an agent touch the fabric? Yes, when every write is mediated. Point at write #4: the gate said no, handed a human the homework, and the agent could not argue.

**Pause 5 (step 30).** Containment is a write too, so it hit the same gate. Same plane, same governance model, different fight. The evidence hold is the detail security leaders will remember.

**Pause 6 (step 33).** The pivot from fear to greed. The plane is the enablement layer. Keep Cisco framed around ambition. Mark Salesforce as vendor-reported. Land the footnote: prove the controls and your own governance board moves faster.

## Numbers used on screen

| Figure | Where | Status |
|--------|-------|--------|
| 7-day cooling-off hold, 214 SBOM components, 0 CVEs | Beat 1 | Illustrative; "X days" per Mick Currey, adjust to a co-chair's real hold |
| 1,214 devices, 3,708 routes, $180M+, 11 days | Beat 1 | Illustrative, synthetic enterprise |
| 6 seconds to quarantine, 0 writes reached the network, production on v3.1 | Beat 2 | Demo-defined |
| 0.8% blast radius (approved), 100% of pods (rejected) | Beat 4 | Demo-defined |
| 4.2 seconds detect-to-decide, 5 signals, 3 domains | Beat 5 | Demo-defined |
| 6 weeks → 4 days approval cycle | Beat 6 | Illustrative |
| EY Canvas ~1.4T lines, 160K engagements, 150+ countries, 130K professionals | Beat 6 | Public, per the arc |
| Cisco ~90,000 employees, FY starting late July 2026 | Beat 6 | Public, per the arc; frame around ambition |
| Salesforce Agentforce at Reddit 84%, $100M+ | Beat 6 | Vendor-reported, per the arc |

Confirm the public figures against the source articles before the arc is locked.
