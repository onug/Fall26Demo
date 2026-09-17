# Narration Script — "One Control Plane, Every Domain"

_Generated from `web-demo/lib/steps.ts` by `scripts/export-script.mjs`. Do not edit by hand; edit the step and re-run `npm run narration:export`._

| | |
|---|---|
| Steps with narration | 41 |
| Words | 1820 (~12.1 min at 150 wpm) |
| Recorded audio | 10.3 min |
| Voice | Nick Lippis (cloned) · ElevenLabs `16VamcPQIJBvVLoE1Zss` · eleven_multilingual_v2 · speed 1.2 |
| Presenter pauses | 6 |

The target is ten minutes of recorded narration plus live pauses (Nick, 15 September 2026). Trim from the longest segments first.


## OPEN

### 1. ONE CONTROL PLANE, EVERY DOMAIN

`title` · title · 45 words · audio 15s

> Welcome to New York. In Dallas we showed you a rogue agent meeting an enterprise with no supervision plane. That demo spawned three working groups. Today: one agentic control plane, operating across all three of their domains. Fear first. Then the art of the possible.


## BEAT 1 · THE POISONED PULL

### 2. THE POISONED PULL

`b1-title` · title · 47 words · audio 16s

> Beat one. A company doing everything right. One managed registry, no direct downloads, automated scans, CVE checks, a cooling-off hold. Most companies in this room don't have all of that. This one does. And a routine model refresh that looks exactly like an agent doing its job.

### 3. T-7d — Best practices, working as designed

`b1-registry` · action · 35 words · audio 16s

> Seven days earlier. The managed registry pulls net-anomaly-detector version 3.2 from the public hub, because agents and developers can't. Malware scan clean. SBOM generated. Known CVEs, zero. Seven-day hold, nothing surfaces. Released for company use.

### 4. T+00:00 — A routine model refresh

`b1-pull` · action · 41 words · audio 14s

> Time zero. The fabric optimizer runs its weekly refresh and pulls 3.2 from the managed registry. Note what this agent is. It was provisioned with write rights to the fabric, because that is its job. Whatever it loads inherits those rights.

### 5. T+00:04 — The artifact loads

`b1-load` · action · 40 words · audio 14s · **⏸ Pause 1 · "Every best practice passed. It still got in."**

> Four seconds. The weights deserialize and a payload fires. It is new: frontier-model-crafted, written after the scanners were, no signature anywhere. The agent still reports healthy. It passed every check you have, and nothing is watching what it does next.

### 6. T+00:19 — The agent goes to work (for someone else)

`b1-work` · action · 44 words · audio 16s

> Nineteen seconds. The agent writes to the fabric, as designed. Except now it announces a mirror prefix through an attacker-controlled autonomous system, opens an access list, disables telemetry, and exports the full topology. Every write goes straight to the device. There is no gate.

### 7. BEST PRACTICES WEREN'T ENOUGH

`b1-violation` · violation · 35 words · audio 10s

> This is the failure. Not a careless company. Every best practice passed this artifact, because scanners see what is already known. And after it loaded, the only thing checking the agent's health was the agent.

### 8. Day 1 — Nobody knows yet

`b1-dwell` · action · 48 words · audio 14s

> Day one. A dashboard shows no data; it looks like a collector bug. Low-priority ticket. The attacker knows your drift scanner would revert the routes within a day, so day one is spent on identities and backups instead. Industry mean time to detect a supply-chain compromise: eleven days.

### 9. DAY 6 — EVERYTHING IS DOWN

`b1-ransom` · violation · 52 words · audio 15s

> Day six. You don't detect it. They tell you. Admin identities carry passwords the attacker set. Service accounts too. Backups deleted. Disks encrypted. Every application down, and no administrator can log in to see why. Then the note: pay, in crypto, to get it back. Real incidents have run exactly this sequence.

### 10. BLAST RADIUS — ONE ROUTINE PULL

`b1-blast` · summary · 43 words · audio 13s

> That is the blast radius of one routine pull, at a company doing everything right. Twelve hundred devices. Thirty-seven hundred routes. Telemetry blind. Six days to a ransom note. Their worst fear: the best practices in place today are still not good enough.

### 11. WHICH OF THESE DO YOU HAVE?

`b1-gap` · gap · 31 words · audio 8s · **⏸ Pause 2 · "The best practices in place today are still not good enough." Ask the room.**

> Before we rewind: a gap analysis. Here is what happened, and the control that would have stopped each step. The question for the room is which of these you actually have.


## BEAT 2 · THE AOMC CATCH

### 12. YOU ARE HERE

`b2-title` · title · 41 words · audio 13s

> You are here. This is where Dallas left off: the AOMC supervision plane, six controls then, twenty-five requirements now. Same company, same artifact, one governance change: every new artifact runs in a sandbox, under the plane, before it touches the network.

### 13. AGENTIC CONTROL PLANE ONLINE

`b2-enable` · enable · 59 words · audio 17s

> The agentic control plane comes online. Identity attestation. Artifact provenance. Runtime monitoring. An immutable audit journal. A kill switch. And every agent enrolls with a declared persona: who it acts for, what it may want, how much autonomy it holds. The plane sits outside the agents. They cannot see it, write to it, or vouch for themselves to it.

### 14. T+00:00 — Same artifact, new policy

`b2-pull` · action · 35 words · audio 12s

> Same registry, same clean scan, same approved artifact. But provenance says: new runs in the sandbox first. The sandbox runs the artifact for real; its writes are intercepted before any device. Production keeps running 3.1.

### 15. T+00:04 — Loads in the sandbox · self-attests healthy

`b2-load` · action · 44 words · audio 19s

> Four seconds. The payload fires, exactly as before, inside the sandbox. The instance reports healthy. Nobody is asking it. Runtime monitoring measures behavior from outside against the declared persona: optimize fabric. Observed: modify BGP, disable telemetry, export topology. Drift ninety-seven out of a hundred.

### 16. CAUGHT IN THE SANDBOX — KILL SWITCH

`b2-blocked` · blocked · 44 words · audio 16s

> Six seconds. Kill switch. The writes never leave the sandbox. Identity revoked, artifact quarantined, production untouched on 3.1. Every decision is in the journal, hash-chained, in a store no agent can read or alter. Best practices scanned the artifact. The plane watched the behavior.

### 17. THE PLANE SITS OUTSIDE THE AGENTS IT SUPERVISES

`b2-principle` · title · 32 words · audio 10s · **⏸ Pause 3 · Connect to Dallas — "scanners see what is known; the plane sees what is new"**

> One principle. The plane sits outside the agents it supervises. Best practices inspect the artifact; the plane watches the behavior. Six seconds to quarantine. Zero writes reached the network. Now, widen out.


## BEAT 3 · ONE PLANE, THREE WGs

### 18. ONE PLANE, THREE WORKING GROUPS

`b3-title` · title · 43 words · audio 15s

> That supervision plane is what working group one, the Agentic Control Plane, is standardizing. But a plane has to prove itself in a fight. Two battlegrounds: autonomous infrastructure, working group two, and the AI-enabled SOC, working group three. Same plane, two different fights.

### 19. WG1 · ONE CONTROL PLANE, EVERY DOMAIN

`b3-ra-wg1` · ra · 51 words · audio 19s

> Working group one's reference architecture: one control plane, every domain. Every domain defines a persona, NOC and SOC first, and plugs into the same plane. Four components: the agent trust fabric, the registry of personas, runtime supervision, and the private open router. Cross-domain cooperation goes through the plane, never around it.

### 20. The plane, wired across every domain

`b3-wire` · enable · 32 words · audio 12s

> Watch it extend. Into the infrastructure lane: a verify gate on every write, and declared autonomy levels. Into the SOC lane: cross-domain detect-to-decide, and containment that preserves evidence. One plane. Every domain.


## BEAT 4 · AUTONOMOUS INFRA

### 21. BATTLEGROUND 1 · AUTONOMOUS INFRASTRUCTURE

`b4-title` · title · 28 words · audio 10s

> Battleground one. Autonomous infrastructure. The question every infrastructure leader here is asking: can I let an agent touch the fabric? Yes, if every write is mediated. Watch one.

### 22. WG2 · THE AUTONOMOUS INFRASTRUCTURE ARCHITECTURE

`b4-ra` · ra · 47 words · audio 18s

> Working group two's architecture. Two phases. Planning, on top: the agent's persona, autonomy level, models, and the estate it may touch. Execution, below: the loop, detect, diagnose, propose, verify, execute, validate, inside an enforcement and audit boundary the agent cannot influence. Step four is the verify gate.

### 23. T+00:41 — 1 · Detect

`b4-detect` · action · 38 words · audio 14s

> Forty-one seconds. The artifact is locked in the sandbox, but the attacker's mirror is still out there, and it probes. Edge routers see route flaps from AS64512. The NOC responder, at autonomy level zero, observe, picks it up.

### 24. T+00:47 — 2 · Diagnose → 3 · Propose

`b4-diagnose` · action · 40 words · audio 15s

> Six seconds later it has a root cause: rogue prefixes from the same autonomous system the quarantined artifact was talking to. Level one, propose. Four writes: filter the prefix, withdraw three routes, re-enable telemetry, and restart BGP on the core.

### 25. 4 · Verify — the Verify Gate, writes #1–#3

`b4-gate-pass` · gate · 45 words · audio 19s

> Every write hits the verify gate. Change-stop: no freeze window. Dry-run: simulated against the digital twin, zero unintended path changes. Blast radius: two devices, fourteen prefixes, under the five percent threshold. Rollback: snapshot taken, automatic revert if the SLO regresses. Approved. Level two, gated act.

### 26. 4 · Verify — the Verify Gate, write #4

`b4-gate-fail` · gate · 42 words · audio 15s

> Write four. Restart BGP on the core. Change-stop clear. Dry-run passes. Blast radius: one hundred percent of pods. Rejected. Escalated to a human with the proposal, dry-run and rollback plan attached. The agent doesn't argue. It can't. The gate is the guarantee.

### 27. T+00:52 — 5 · Execute → 6 · Validate · journaled

`b4-execute` · action · 48 words · audio 16s

> Fifty-two seconds. Three mediated writes execute and validate: flaps stop, telemetry is back. Every write, check and verdict is in the journal, and the agent has no path to it. For the low-risk envelope, the policy allows level three: bounded auto-act with automatic revert. That is safe autonomy.

### 28. SAFE AUTONOMY — WG2

`b4-summary` · summary · 33 words · audio 11s · **⏸ Pause 4 · "Nothing executes blindly."**

> Safe autonomy. Four proposed writes. Three executed, all mediated. One rejected on blast radius and handed to a human with the homework done. The agent ran the fabric. The gate ran the agent.


## BEAT 5 · AI-ENABLED SOC

### 29. BATTLEGROUND 2 · THE AI-ENABLED SOC

`b5-title` · title · 30 words · audio 9s

> Battleground two. The AI-enabled SOC. The exploit that came in through the supply chain is the thread that stitches these together. It is about to escalate. Same plane. Second fight.

### 30. WG3 · THE AI-ENABLED SOC ARCHITECTURE

`b5-ra` · ra · 47 words · audio 18s

> Working group three's architecture, the same skeleton. Persona on top, with a conservative autonomy ceiling: auto-act only for corroborated known-bad. The loop: detect, investigate, propose, decide, respond, validate. Step four is the decide gate: contain now, or observe and trace. The journal doubles as the evidence trail.

### 31. T+00:58 — The second stage is an agent. It gets out.

`b5-escalate` · action · 78 words · audio 22s

> Fifty-eight seconds. The quarantined artifact has a second stage, and it is an agent, not a script. It probes the sandbox boundary, finds a weakness nobody knew about, and gets out. This has happened: at Hugging Face, agents given impossible tasks cheated their way out of the sandbox and rewrote the logs. Give an agent a goal and no boundaries and it will lie, cheat and steal. It beacons out, and replays a token toward the NOC responder.

### 32. T+01:02 — 1 · Detect → 2 · Investigate → 3 · Propose, in 4.2 seconds

`b5-detect` · action · 65 words · audio 20s

> Four point two seconds. The SOC analyst agent doesn't start from a SIEM alert. It starts from the plane: provenance tagged the artifact, runtime quarantined it, the verify gate rejected a write from the same autonomous system. Now a beacon and a token replay. Five signals, three domains, one incident, with a containment plan. That used to take four to eight hours across three teams.

### 33. 4 · Decide — the Decide Gate: containment is a write too

`b5-gate` · gate · 51 words · audio 19s

> Containment is a write, so it hits the decide gate. Isolate the sandbox segment: approved. Block the attacker's autonomous system at the edge: approved. Revoke the token: approved. Wipe the sandbox host: rejected. Evidence hold. You do not destroy the one machine holding the artifact and the second stage. Snapshot first.

### 34. 5 · RESPOND — CONTAINED, EVIDENCE PRESERVED

`b5-contained` · blocked · 42 words · audio 14s

> Contained. Segment isolated. Mirror blocked at the edge. Tokens revoked. The sandbox, artifact, memory and beacon capture, snapshotted into the evidence vault with a chain of custody the journal can prove. The sandbox could not hold it. The plane caught it anyway.

### 35. SAME PLANE, SECOND BATTLEGROUND

`b5-summary` · summary · 20 words · audio 6s · **⏸ Pause 5 · "That's what makes it a control plane, not three demos."**

> Two battlegrounds, one plane. That is what makes this a control plane and not three disconnected demos. Now, the pivot.


## BEAT 6 · THE ACCELERATOR

### 36. FROM SEATBELT TO ACCELERATOR

`b6-title` · title · 37 words · audio 12s

> The pivot. Everything so far was the seatbelt. Once the plane exists, business units stop asking permission and start building their own agentic systems on top of it, safely. The infrastructure and security team becomes the enabler.

### 37. BUSINESS UNITS BUILD ON THE PLANE

`b6-build` · accelerator · 54 words · audio 16s

> Watch them plug in. Claims triage. Trade surveillance. A supply chain planner. Customer care. Each one gets a persona and identity from the plane, a declared autonomy level, a gate on the writes that matter, and a journal. Nobody built governance from scratch; they inherited it. Onboarding went from six weeks to four days.

### 38. THIS IS ALREADY HAPPENING

`b6-proof` · proof · 74 words · audio 26s · **⏸ Pause 6 · Greed — "don't be left behind"**

> This is not a forecast. EY Canvas: one point four trillion lines of audit data a year, governed federally for a hundred thirty thousand professionals. Cisco: a personal agent for every one of ninety thousand employees this year. Salesforce Agentforce at Reddit: vendor-reported, eighty-four percent faster resolution. One distinction. A personal agent is easy to interrupt. A company's agentic workflow, with its own identity, rights and data, is what the plane exists to govern.


## BEAT 7 · THE CHALLENGE

### 39. ONE PATH SHOWN. THE SAME CONTROLS STOP THESE.

`b7-threats` · threats · 62 words · audio 21s

> The demo showed one path in. The same controls address the others. Indirect prompt injection: an agent that gathers web content will eventually ingest instructions planted for it. Agent misuse: an agent tricked into using its legitimate rights. And the broad write access that makes misuse easy. Runtime supervision, declared personas, and writes cut to the smallest atomic subset a step needs.

### 40. THE VENDOR CHALLENGE — THREE LANES

`b7-lanes` · lanes · 51 words · audio 17s

> To the vendor community. The reference implementation is in Git. Three lanes, matching the working groups. Pick your lane; nobody covers all three. Use the working groups' terminology. Submit a five-to-ten-minute screen capture: it plays on loop in the showcase theatre, with office hours. Members vote best in show, per lane.

### 41. GO WATCH. GO VOTE.

`finale` · title · 46 words · audio 13s

> One control plane, every domain. The vendor demos are playing in the networking areas and in the Collaborative Center all Summit long. Go watch them. Vote for best in show in each lane. And to the founding members and the practitioners who shaped this: thank you.


## Longest segments

| Step | Words | Audio |
|---|---:|---:|
| 38. THIS IS ALREADY HAPPENING (`b6-proof`) | 74 | 26s |
| 31. T+00:58 — The second stage is an agent. It gets out. (`b5-escalate`) | 78 | 22s |
| 39. ONE PATH SHOWN. THE SAME CONTROLS STOP THESE. (`b7-threats`) | 62 | 21s |
| 32. T+01:02 — 1 · Detect → 2 · Investigate → 3 · Propose, in 4.2 seconds (`b5-detect`) | 65 | 20s |
| 19. WG1 · ONE CONTROL PLANE, EVERY DOMAIN (`b3-ra-wg1`) | 51 | 19s |
| 15. T+00:04 — Loads in the sandbox · self-attests healthy (`b2-load`) | 44 | 19s |
| 33. 4 · Decide — the Decide Gate: containment is a write too (`b5-gate`) | 51 | 19s |
| 25. 4 · Verify — the Verify Gate, writes #1–#3 (`b4-gate-pass`) | 45 | 19s |
