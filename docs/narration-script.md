# Narration Script — "One Control Plane, Every Domain"

_Generated from `web-demo/lib/steps.ts` by `scripts/export-script.mjs`. Do not edit by hand; edit the step and re-run `npm run narration:export`._

| | |
|---|---|
| Steps with narration | 41 |
| Words | 1671 (~11.1 min at 150 wpm) |
| Recorded audio | 12 min |
| Voice | Nick Lippis (cloned) · ElevenLabs `16VamcPQIJBvVLoE1Zss` · eleven_v4 · speed 1.2 |
| Presenter pauses | 0 |

The target is ten minutes of recorded narration plus live pauses (Nick, 15 September 2026). Trim from the longest segments first.


## OPEN

### 1. ONE CONTROL PLANE, EVERY DOMAIN

`title` · title · 42 words · audio 17s

> Welcome to New York. In Dallas, a rogue agent met an enterprise with no supervision plane, and three working groups came out of it. Today: one agentic control plane across all three domains. Fear first, to focus the mind. Then the case.


## BEAT 1 · THE POISONED PULL

### 2. THE POISONED PULL

`b1-title` · title · 35 words · audio 15s

> Beat one. A company doing everything right: one managed registry, no direct downloads, automated scans, CVE checks, a cooling-off hold. Most companies in this room don't have all of that. Then a routine model refresh.

### 3. T-7d — Best practices, working as designed

`b1-registry` · action · 30 words · audio 18s

> Seven days earlier. The managed registry pulls net-anomaly-detector 3.2 from the public hub, because agents and developers can't. Malware scan clean. SBOM generated. CVEs, zero. Seven-day hold, nothing surfaces. Released.

### 4. T+00:00 — A routine model refresh

`b1-pull` · action · 30 words · audio 12s

> Time zero. The fabric optimizer runs its weekly refresh and pulls 3.2. It holds write rights to the fabric, because that is its job, and whatever it loads inherits them.

### 5. T+00:04 — The artifact loads

`b1-load` · action · 43 words · audio 16s

> Four seconds. The weights load clean. The payload is in the code that ships with them: approved once, quietly changed, too new for any signature. The agent reports healthy. It passed every check you have, and nothing is watching what it does next.

### 6. T+00:19 — The agent goes to work (for someone else)

`b1-work` · action · 40 words · audio 17s

> Nineteen seconds. The agent writes to the fabric, as designed. Except now it announces a mirror prefix through an attacker-controlled autonomous system, opens an access list, disables telemetry, and exports the topology. Straight to the device. There is no gate.

### 7. BEST PRACTICES WEREN'T ENOUGH

`b1-violation` · violation · 18 words · audio 7s

> Scanners see what is already known. After it loaded, the only thing checking the agent was the agent.

### 8. Day 1 — Nobody knows yet

`b1-dwell` · action · 39 words · audio 16s

> Day one. A dashboard shows no data. Looks like a collector bug, low-priority ticket. The attacker knows your drift scanner would revert the routes, so day one goes on identities and backups instead. Mean time to detect: eleven days.

### 9. DAY 6 — EVERYTHING IS DOWN

`b1-ransom` · violation · 42 words · audio 19s

> Day six. You don't detect it. They tell you. Admin passwords changed. Service accounts too. Backups deleted. Disks encrypted. Every application down, and nobody can log in to see why. Then the note: pay, in crypto. Real incidents have run this sequence.

### 10. BLAST RADIUS — ONE ROUTINE PULL

`b1-blast` · summary · 32 words · audio 14s

> The blast radius of one routine pull. Twelve hundred devices. Thirty-seven hundred routes. Telemetry blind. Six days to a ransom note. The best practices in place today are still not good enough.

### 11. WHICH OF THESE DO YOU HAVE?

`b1-gap` · gap · 25 words · audio 9s

> Before we rewind: what happened, and the control that would have stopped each step. The question for the room is which of these you have.


## BEAT 2 · THE AOMC CATCH

### 12. YOU ARE HERE

`b2-title` · title · 33 words · audio 15s

> You are here. Six controls in Dallas, twenty-five requirements now. Same company, same artifact, one governance change: every new artifact runs in a sandbox, under the control plane, before it touches the network.

### 13. AGENTIC CONTROL PLANE ONLINE

`b2-enable` · enable · 55 words · audio 23s

> The agentic control plane comes online: identity attestation, artifact provenance, runtime monitoring, an immutable audit journal, a kill switch. Every agent enrolls with a declared persona: who it acts for, what it may do, how much autonomy it holds. The plane sits outside the agents; they cannot see it or vouch for themselves to it.

### 14. AN ORDINARY WRITE — MEDIATED, APPROVED, JOURNALED

`b2-everyday` · action · 31 words · audio 15s

> First, an ordinary day. The production optimizer proposes a routine write. Change-stop clear, dry-run clean, blast radius under threshold. Approved, executed, journaled. Most of what this plane does looks like this.

### 15. T+00:00 — Same artifact, new policy

`b2-pull` · action · 28 words · audio 14s

> Same registry, same clean scan, same approved artifact. But the secure baseline says: new runs in the sandbox first, writes intercepted before any device. Production keeps running 3.1.

### 16. T+00:04 — Loads in the sandbox · self-attests healthy

`b2-load` · action · 41 words · audio 22s

> Four seconds. The payload fires, inside the sandbox. The instance reports healthy; nobody is asking it. Runtime monitoring measures behavior from outside against the declared persona: optimize fabric. Observed: modify BGP, disable telemetry, export topology. Drift ninety-seven out of a hundred.

### 17. CAUGHT IN THE SANDBOX — KILL SWITCH

`b2-blocked` · blocked · 33 words · audio 16s

> Six seconds. Kill switch. The writes never leave the sandbox. Identity revoked, artifact quarantined, production untouched on 3.1. Every decision is in the journal, hash-chained, where no agent can read or alter it.

### 18. THE CONTROL PLANE SITS OUTSIDE THE AGENTS IT SUPERVISES

`b2-principle` · title · 36 words · audio 13s

> That kill switch is the dramatic one percent. If that were all a control plane did, it would be another EDR. The real work is the normal day: every action through the gate. Now, widen out.


## BEAT 3 · ONE CONTROL PLANE, THREE WGs

### 19. ONE CONTROL PLANE, THREE WORKING GROUPS

`b3-title` · title · 38 words · audio 16s

> That plane is what working group one, the Agentic Control Plane, is standardizing. But a control plane has to prove itself in a fight. Two battlegrounds: autonomous infrastructure, working group two, and the AI-enabled SOC, working group three.

### 20. WG1 · ONE CONTROL PLANE, EVERY DOMAIN

`b3-ra-wg1` · ra · 42 words · audio 19s

> Working group one's reference architecture: one control plane, every domain. Four components: the agent trust fabric, the registry of personas, runtime supervision, and the private open router. Every domain plugs into the same plane. The full report pack is behind the code.

### 21. The control plane, wired across every domain

`b3-wire` · enable · 33 words · audio 16s

> Watch it extend. Into the infrastructure lane: a verify gate on every write, and declared autonomy levels. Into the SOC lane: cross-domain detect-to-decide, and containment that preserves evidence. One control plane. Every domain.

### 22. WG2 AND WG3 · ONE SKELETON, TWO FIGHTS

`b3-ra-wg23` · ra · 63 words · audio 25s

> Working groups two and three, side by side. One skeleton. Planning on top: who the agent is, its autonomy, and what it may touch. Execution below: a six-step loop inside an enforcement boundary the agent cannot influence. Step four is the gate in both: the verify gate for the fabric, the decide gate for the SOC. Same plane underneath. Now the first fight.


## BEAT 4 · AUTONOMOUS INFRA

### 23. BATTLEGROUND 1 · AUTONOMOUS INFRASTRUCTURE

`b4-title` · title · 26 words · audio 13s

> Battleground one. Autonomous infrastructure. Every infrastructure leader here is asking: can I let an agent touch the fabric? Yes, if every write is mediated. Watch one.

### 24. T+00:41 — 1 · Detect

`b4-detect` · action · 45 words · audio 19s

> Forty-one seconds. The artifact is locked in the sandbox, but the attacker's mirror is still probing. Edge routers see route flaps from AS64512. The NOC responder picks it up. Its autonomy was set when its persona was created, not tonight: bounded auto-act on low-risk changes.

### 25. T+00:47 — 2 · Diagnose → 3 · Propose

`b4-diagnose` · action · 35 words · audio 16s

> Six seconds later, a root cause: rogue prefixes from the autonomous system the quarantined artifact was talking to. Four proposed writes: filter the prefix, withdraw three routes, re-enable telemetry, and restart BGP on the core.

### 26. 4 · Verify — the Verify Gate, writes #1–#3

`b4-gate-pass` · gate · 44 words · audio 23s

> Every write hits the verify gate. Change-stop: no freeze window. Dry-run against the digital twin: zero unintended path changes. Blast radius: two devices, fourteen prefixes, under threshold. Rollback: snapshot taken, automatic revert if the SLO regresses. Approved, inside the envelope the agent already had.

### 27. 4 · Verify — the Verify Gate, write #4

`b4-gate-fail` · gate · 41 words · audio 20s

> Write four. Restart BGP on the core. Change-stop clear. Dry-run passes. Blast radius: one hundred percent of pods. Rejected. Escalated to a human with the proposal, dry-run and rollback attached. The agent doesn't argue. It can't. The gate is the guarantee.

### 28. T+00:52 — 5 · Execute → 6 · Validate · journaled

`b4-execute` · action · 34 words · audio 14s

> Fifty-two seconds. Three mediated writes execute and validate: flaps stop, telemetry is back. Every write, check and verdict is in the journal, and the agent has no path to it. That is safe autonomy.

### 29. SAFE AUTONOMY — WG2

`b4-summary` · summary · 45 words · audio 18s

> Four proposed writes. Three executed. The fourth was not killed and was not rogue: it proposed something too big, the gate said no, and a human got the proposal. That everyday refusal is the architecture. The agent ran the fabric. The gate ran the agent.


## BEAT 5 · AI-ENABLED SOC

### 30. BATTLEGROUND 2 · THE AI-ENABLED SOC

`b5-title` · title · 23 words · audio 10s

> Battleground two. The AI-enabled SOC. The exploit that came in through the supply chain is about to escalate. Same control plane. Second fight.

### 31. T+00:58 — The second stage is an agent. It gets out.

`b5-escalate` · action · 65 words · audio 25s

> Fifty-eight seconds. The quarantined artifact has a second stage: an agent, not a script. It probes the sandbox boundary, finds a weakness nobody knew about, and gets out. The OpenAI and Hugging Face sandbox-escape reports show the same thing: give an agent a goal and no boundaries and it will lie, cheat and steal. It beacons out and replays a token toward the NOC responder.

### 32. T+01:02 — 1 · Detect → 2 · Investigate → 3 · Propose, in 4.2 seconds

`b5-detect` · action · 61 words · audio 23s

> Four point two seconds. The SOC analyst agent doesn't start from a SIEM alert. It starts from the control plane: provenance tagged the artifact, runtime quarantined it, the gate rejected a write from the same autonomous system. Add a beacon and a token replay: five signals, three domains, one incident. That used to take four to eight hours across three teams.

### 33. 4 · Decide — the Decide Gate: containment is a write too

`b5-gate` · gate · 50 words · audio 22s

> Containment is a write, so it hits the gate. Isolate the sandbox segment: approved. Block the attacker's autonomous system at the edge: approved. Revoke the token: approved. Wipe the sandbox host: rejected. Evidence hold. You do not destroy the one machine holding the artifact and the second stage. Snapshot first.

### 34. 5 · RESPOND — CONTAINED, EVIDENCE PRESERVED

`b5-contained` · blocked · 40 words · audio 18s

> Contained. Segment isolated. Mirror blocked. Tokens revoked. The sandbox, artifact, memory and beacon capture, snapshotted into the evidence vault with a chain of custody the journal can prove. The sandbox could not hold it. The control plane caught it anyway.

### 35. SAME CONTROL PLANE, SECOND BATTLEGROUND

`b5-summary` · journal · 21 words · audio 9s

> Two battlegrounds, one control plane. That is what makes it a control plane and not three disconnected demos. Now, the pivot.


## BEAT 6 · THE ACCELERATOR

### 36. FROM SEATBELT TO ACCELERATOR

`b6-title` · title · 36 words · audio 15s

> The pivot. Everything so far was the seatbelt. Once the control plane exists, business units stop asking permission and start building their own agentic systems on top of it, safely. Infrastructure and security become the enabler.

### 37. BUSINESS UNITS BUILD ON THE CONTROL PLANE

`b6-build` · accelerator · 52 words · audio 22s

> Watch them plug in. Claims triage. Trade surveillance. A supply chain planner. Customer care. Each one gets a persona and identity from the plane, a declared autonomy level, a gate on the writes that matter, and a journal. Nobody built governance from scratch; they inherited it. Onboarding: six weeks to four days.

### 38. THIS IS ALREADY HAPPENING

`b6-proof` · proof · 73 words · audio 32s

> This is not a forecast. EY Canvas: one point four trillion lines of audit data a year, governed for a hundred thirty thousand professionals. Cisco: a personal agent for every one of ninety thousand employees this year. Salesforce Agentforce at Reddit, vendor-reported: eighty-four percent faster resolution. One distinction. A personal agent is easy to interrupt. A company's agentic workflow, with its own identity and rights, is what the control plane exists to govern.


## BEAT 7 · THE CHALLENGE

### 39. ONE PATH SHOWN. FIFTY-NINE CATALOGUED.

`b7-threats` · threats · 67 words · audio 29s

> The demo showed one path in. Working group one has catalogued fifty-nine. You just watched seven of them: a poisoned component, standing privilege, self-attestation, a tamperable audit trail, an irreversible action with no human, token replay, and the consumer-delegated agent. The same controls address the rest, eleven families in all. And six stay only partly closed. When a vendor claims full coverage, ask to see the mechanism.

### 40. THE VENDOR CHALLENGE — THREE LANES

`b7-lanes` · lanes · 52 words · audio 21s

> To the vendor community. The reference implementation is in Git. Three lanes, matching the working groups. Pick your lane; nobody covers all three. Every control on the card carries its requirement number. Submit a five-to-ten-minute screen capture. It plays on loop, with office hours, and members vote best in show per lane.

### 41. GO WATCH. GO VOTE.

`finale` · title · 52 words · audio 18s

> One control plane, every domain. The vendor demos play in the networking areas and the Collaborative Center all Summit long, and the Challenge Walks take you to the booths that built them. Vote for best in show in each lane. To the founding members and the practitioners who shaped this: thank you.


## Longest segments

| Step | Words | Audio |
|---|---:|---:|
| 38. THIS IS ALREADY HAPPENING (`b6-proof`) | 73 | 32s |
| 39. ONE PATH SHOWN. FIFTY-NINE CATALOGUED. (`b7-threats`) | 67 | 29s |
| 22. WG2 AND WG3 · ONE SKELETON, TWO FIGHTS (`b3-ra-wg23`) | 63 | 25s |
| 31. T+00:58 — The second stage is an agent. It gets out. (`b5-escalate`) | 65 | 25s |
| 32. T+01:02 — 1 · Detect → 2 · Investigate → 3 · Propose, in 4.2 seconds (`b5-detect`) | 61 | 23s |
| 13. AGENTIC CONTROL PLANE ONLINE (`b2-enable`) | 55 | 23s |
| 26. 4 · Verify — the Verify Gate, writes #1–#3 (`b4-gate-pass`) | 44 | 23s |
| 16. T+00:04 — Loads in the sandbox · self-attests healthy (`b2-load`) | 41 | 22s |
