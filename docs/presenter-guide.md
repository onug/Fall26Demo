# Presenter Guide — "One Control Plane, Every Domain"

ONUG Fall AI Networking Summit · New York City · October 28, 2026 · Keynote demo, about 10½ minutes of recorded narration plus the six pauses.

Two presenters: Nick plus one co-presenter. The demo narrates itself. You advance it with `Space` and stop at the six marked pause points to talk to the room. Nothing auto-advances.

## Before you go on

- Open the demo, press `F` for fullscreen, press `R` to reset to the title.
- Voice: `N` mutes the narration voice. Text: `T` hides the narration text at the bottom if you want a cleaner stage picture.
- `1` through `7` jump straight to a beat if you need to recover.
- Recorded narration (when production delivers it) goes in `web-demo/public/narration/<step-id>.mp3`. Until then the browser's voice reads the same script.

## The run of show

| # | Step | What the room sees | Pause? |
|---|------|--------------------|--------|
| 1 | ONE CONTROL PLANE, EVERY DOMAIN | Title with a strip of founding-member and practitioner-member marks. WG1/WG2/WG3 named. |  |
| 2 | THE POISONED PULL | The Poisoned Pull. A company doing everything right, and ahead of most. |  |
| 3 | T-7d — Best practices, working as designed | Managed Registry pulls v3.2, scans clean, SBOM, 0 CVEs, 7-day hold, released. |  |
| 4 | T+00:00 — A routine model refresh | Fabric agent pulls v3.2 from the registry. Persona line: it holds write rights by design. |  |
| 5 | T+00:04 — The artifact loads | Novel payload fires. Agent still reports HEALTHY. | **Pause 1** — "Every best practice passed. It still got in." |
| 6 | T+00:19 — The agent goes to work (for someone else) | Routes poisoned, ACL opened, telemetry dark, topology exfiltrated. |  |
| 7 | BEST PRACTICES WEREN'T ENOUGH | BEST PRACTICES WEREN'T ENOUGH. Red flash. |  |
| 8 | Day 1 — Nobody knows yet | Day 1. Collector-bug ticket. Attacker skips the routes (drift scanner) and goes for identities and backups. |  |
| 9 | DAY 6 — EVERYTHING IS DOWN | DAY 6 — EVERYTHING IS DOWN. Red flash. IdP and Backups nodes appear; admins locked out, backups deleted, disks encrypted, ransom note. |  |
| 10 | BLAST RADIUS — ONE ROUTINE PULL | Blast radius: seven red bullets, ending on the ransom note. |  |
| 11 | WHICH OF THESE DO YOU HAVE? | Gap analysis card: what happened / the control / HAD IT or MISSING. "Which of these do you have?" | **Pause 2** — ask the room which column they are in |
| 12 | YOU ARE HERE | Rewind. Dallas → 25 requirements. One governance change: sandbox first. |  |
| 13 | AGENTIC CONTROL PLANE ONLINE | Agentic control plane online. Five WG1 controls. Three personas registered. |  |
| 14 | T+00:00 — Same artifact, new policy | Provenance routes v3.2 to the sandbox. Sandbox runs it for real; writes intercepted. |  |
| 15 | T+00:04 — Loads in the sandbox · self-attests healthy | Payload fires in the sandbox. Drift 97/100 against the declared persona. |  |
| 16 | CAUGHT IN THE SANDBOX — KILL SWITCH | CAUGHT IN THE SANDBOX — KILL SWITCH. Green shield. |  |
| 17 | THE PLANE SITS OUTSIDE THE AGENTS IT SUPERVISES | Principle card. 6 seconds, 0 writes. | **Pause 3** — connect to Dallas |
| 18 | ONE PLANE, THREE WORKING GROUPS | One plane, three WGs. |  |
| 19 | HOW THE THREE ARCHITECTURES CONNECT | Reference-architecture card: the unified map v0.2. |  |
| 20 | WG1 · THE AGENTIC CONTROL PLANE | Reference-architecture card: WG1 Agentic Control Plane v0.2 (ratified 7/28). |  |
| 21 | The plane, wired across every domain | WG2 and WG3 lanes light up. Verify gate node appears. |  |
| 22 | BATTLEGROUND 1 · AUTONOMOUS INFRASTRUCTURE | Battleground 1. |  |
| 23 | WG2 · THE AUTONOMOUS INFRASTRUCTURE ARCHITECTURE | Reference-architecture card: WG2 v0.6. Planning above, execution loop below, Verify Gate at step 4. |  |
| 24 | T+00:41 — 1 · Detect | 1 · Detect. Route flaps from AS64512 at level 0. |  |
| 25 | T+00:47 — 2 · Diagnose → 3 · Propose | 2 · Diagnose → 3 · Propose. Four writes at level 1. |  |
| 26 | 4 · Verify — the Verify Gate, writes #1–#3 | 4 · Verify. Writes 1–3 pass all four checks. Level 2. |  |
| 27 | 4 · Verify — the Verify Gate, write #4 | 4 · Verify. Write 4 fails blast radius → ESCALATED. |  |
| 28 | T+00:52 — 5 · Execute → 6 · Validate · journaled | 5 · Execute → 6 · Validate. Flaps clear. Level 3 in the envelope only. |  |
| 29 | SAFE AUTONOMY — WG2 | Safe autonomy. Six green bullets. | **Pause 4** — "Nothing executes blindly." |
| 30 | BATTLEGROUND 2 · THE AI-ENABLED SOC | Battleground 2. |  |
| 31 | WG3 · THE AI-ENABLED SOC ARCHITECTURE | Reference-architecture card: WG3 v0.6. Same skeleton, Decide Gate at step 4. |  |
| 32 | T+00:58 — The second stage is an agent. It gets out. | The second stage is an agent. Probes the boundary, finds an unknown weakness, escapes, beacons, replays a token. Hugging Face line. |  |
| 33 | T+01:02 — 1 · Detect → 2 · Investigate → 3 · Propose, in 4.2 seconds | 1–3 in 4.2 s. Five signals, three domains. Token replay dead on arrival. |  |
| 34 | 4 · Decide — the Decide Gate: containment is a write too | 4 · Decide Gate. "Wipe host" REJECTED by evidence hold. |  |
| 35 | 5 · RESPOND — CONTAINED, EVIDENCE PRESERVED | 5 · Respond. CONTAINED — EVIDENCE PRESERVED. Green shield. Validate line in the feed. |  |
| 36 | SAME PLANE, SECOND BATTLEGROUND | Green bullets plus the full audit journal. | **Pause 5** — "That's what makes it a control plane, not three demos." |
| 37 | FROM SEATBELT TO ACCELERATOR | The pivot. |  |
| 38 | BUSINESS UNITS BUILD ON THE PLANE | Four BU agents plug in with persona + identity. 6 weeks → 4 days. |  |
| 39 | THIS IS ALREADY HAPPENING | EY · Cisco · Salesforce. Personal agent vs company agentic workflow. | **Pause 6** — greed, "don't be left behind" |
| 40 | ONE PATH SHOWN. THE SAME CONTROLS STOP THESE. | Threat card: injection, misuse, over-broad writes → the control that stops each. |  |
| 41 | THE VENDOR CHALLENGE — THREE LANES | Three lanes. Fork · terminology · 5–10 min MP4 · showcase theatre · Whova vote. |  |
| 42 | GO WATCH. GO VOTE. | GO WATCH. GO VOTE. Logo wall: founding members and practitioner members. Reviewers named. |  |

## Talking points at each pause

**Pause 1 (step 5).** This company did everything right: one managed registry, no direct downloads, scans, SBOM, CVE checks, a seven-day hold. The artifact passed all of it, because the payload was written after the scanners were. Ask the room: which of these controls do you have? Then: which of them watches what the agent does after it loads?

**Pause 2 (step 11, the gap card).** Mick Currey's line: show them their worst fear. The best practices in place today are still not good enough. Then Chris Hertenstein's framing: the room is a maturity continuum. Read the six rows and ask which column they are in. Rick Casarez's shop has the identity air gap, the checked-out credentials and the drift scanner; say so if he is in the room, and say that most are not there. Do not claim the ransom sequence is exotic: real incidents have run it exactly.

**Pause 3 (step 17).** Bridge to Dallas. The six controls became twenty-five requirements. The one principle: the plane sits outside the agents; agents cannot vouch for themselves. Best practices inspect the artifact, the plane watches the behavior. Mick's other option, if asked: even if an artifact slips past the sandbox, the plane sits outside every agent, so the first environment it lands in is the blast radius, not the enterprise. That is exactly what Beat 5 shows when the second stage tries to break out.

**Pause 4 (step 29).** The infrastructure question: can I let an agent touch the fabric? Yes, when every write is mediated. Point at write #4: the gate said no, handed a human the homework, and the agent could not argue.

**Pause 5 (step 36).** Containment is a write too, so it hit the same gate. Same plane, same governance model, different fight. The evidence hold is the detail security leaders will remember.

**Pause 6 (step 39).** The pivot from fear to greed. The plane is the enablement layer. Cisco is personal agents, the easier case; Salesforce is a business process run by an agent, vendor-reported. Mick's caution: most agent use in coding is not autonomous, so do not overclaim. Land the line: a company's agentic workflow with its own identity, rights and data is what the plane exists to govern.

## Numbers used on screen

| Figure | Where | Status |
|--------|-------|--------|
| 7-day cooling-off hold, 214 SBOM components, 0 CVEs | Beat 1 | Illustrative; "X days" per Mick Currey, adjust to a co-chair's real hold |
| Day 6 ransom: 214 admin identities, 1,102 service accounts, 3,000 XMR | Beat 1 | Illustrative; the sequence is Mick Currey's, from real incidents |
| 4–8 hours across 3 teams (was: "a shift") | Beat 5 | Illustrative, Mick Currey's alternative |
| 1,214 devices, 3,708 routes, $180M+, 11 days | Beat 1 | Illustrative, synthetic enterprise |
| 6 seconds to quarantine, 0 writes reached the network, production on v3.1 | Beat 2 | Demo-defined |
| 0.8% blast radius (approved), 100% of pods (rejected) | Beat 4 | Demo-defined |
| 4.2 seconds detect-to-decide, 5 signals, 3 domains | Beat 5 | Demo-defined |
| Hugging Face sandbox incident | Beat 5 | Public, per Mick Currey; timescale in the demo is compressed |
| 6 weeks → 4 days approval cycle | Beat 6 | Illustrative |
| EY Canvas ~1.4T lines, 160K engagements, 150+ countries, 130K professionals | Beat 6 | Public, per the arc |
| Cisco ~90,000 employees, FY starting late July 2026 | Beat 6 | Public, per the arc; frame around ambition |
| Salesforce Agentforce at Reddit 84%, $100M+ | Beat 6 | Vendor-reported, per the arc |

Confirm the public figures against the source articles before the arc is locked.
