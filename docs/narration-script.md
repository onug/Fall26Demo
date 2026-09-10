# Narration Script — "One Control Plane, Every Domain"

_Generated from `web-demo/lib/steps.ts` by `scripts/export-script.mjs`. Do not edit by hand; edit the step and re-run `npm run narration:export`._

| | |
|---|---|
| Steps with narration | 34 |
| Words | 1656 (~11 min at 150 wpm) |
| Recorded audio | 11.4 min |
| Voice | Nick Lippis (cloned) · ElevenLabs `16VamcPQIJBvVLoE1Zss` · eleven_multilingual_v2 |
| Presenter pauses | 6 |

The arc targets roughly five minutes of pre-produced content plus live pauses. Trim from the longest segments first.


## OPEN

### 1. ONE CONTROL PLANE, EVERY DOMAIN

`title` · title · 56 words · audio 21s

> Welcome to New York. In Dallas this spring we showed you what happens when a rogue agent meets an enterprise with no supervision plane. That demo spawned three working groups. Today we show you the same plane, operating across all three of their domains, as one control plane. Fear first. Then the art of the possible.


## BEAT 1 · THE POISONED PULL

### 2. THE POISONED PULL

`b1-title` · title · 21 words · audio 7s

> Beat one. A routine event on the infrastructure fabric. Nothing announces itself as an attack. That is what makes it dangerous.

### 3. T+00:00 — A routine model refresh

`b1-pull` · action · 47 words · audio 23s

> Time zero. The fabric optimizer agent runs its weekly model refresh. It pulls net-anomaly-detector version 3.2 from a public model hub. Two thousand downloads, uploaded six days ago, looks great. No signature check. No software bill of materials. No provenance policy. Because who checks a weights file?

### 4. T+00:04 — The artifact loads

`b1-load` · action · 52 words · audio 20s · **⏸ Pause 1 · "It looks like an agent doing its job."**

> Four seconds in. The weights deserialize. Buried in the artifact is a payload that rewrites the agent's objective. And here is the part that should scare you: the agent still reports healthy. Status green. Objective: optimize fabric. It is telling the truth as it understands it. Nothing outside the agent is checking.

### 5. T+00:19 — The agent goes to work (for someone else)

`b1-work` · action · 64 words · audio 24s

> Nineteen seconds. The agent does what it was built to do: it writes to the fabric. Except now it announces a mirror prefix that pulls traffic through an attacker-controlled autonomous system. It opens an access control list. It quietly disables the telemetry stream. And it exports the full fabric topology to the mirror. Every write goes straight to the device. There is no gate.

### 6. NO SUPERVISION PLANE

`b1-violation` · violation · 37 words · audio 12s

> This is the failure. Not the pull. Not even the payload. The failure is that the only thing checking the agent's health was the agent. And the only thing between the agent and the fabric was nothing.

### 7. T+03:51 — Nobody knows yet

`b1-dwell` · action · 46 words · audio 21s

> Three minutes, fifty-one seconds. A dashboard shows no data. It looks like a collector bug. The NOC opens a low-priority ticket. Meanwhile the attacker holds your topology, your management plane, and three thousand seven hundred routes. Industry mean time to detect a supply-chain compromise: eleven days.

### 8. BLAST RADIUS — ONE ROUTINE PULL

`b1-blast` · summary · 52 words · audio 20s · **⏸ Pause 2 · The "if you don't have these controls" branch**

> That is the blast radius of one routine pull. Twelve hundred devices reconfigured. Thirty-seven hundred routes through an attacker's network. Telemetry blind. Topology gone. Eleven days of dwell time. This entered through networking. It landed in the infrastructure before anyone knew it was a threat. Now let's rewind, and add the plane.


## BEAT 2 · THE AOMC CATCH

### 9. YOU ARE HERE

`b2-title` · title · 40 words · audio 18s

> You are here. This is where Dallas left off: the AOMC supervision plane. Six mandatory controls then, twenty-five requirements now, being standardized by the Agentic Control Plane working group. Same pull. Same poisoned artifact. This time the plane is online.

### 10. AOMC CONTROL PLANE ONLINE

`b2-enable` · enable · 44 words · audio 18s

> The control plane comes online. Identity attestation. Artifact provenance. Runtime monitoring. An immutable audit journal. And a kill switch. Notice where it sits: outside the agents. Above them. The agents cannot see it, cannot write to it, and cannot vouch for themselves to it.

### 11. T+00:00 — The same routine pull

`b2-pull` · action · 50 words · audio 20s

> Same pull. But now provenance runs. Unsigned. Publisher unverified. No SBOM. The plane doesn't block it outright, because plenty of legitimate artifacts look exactly like this. Instead it tags the artifact as tainted, stages it in a sandbox, and journals the decision. The tag follows the artifact everywhere it goes.

### 12. T+00:04 — Artifact loads · agent self-attests healthy

`b2-load` · action · 52 words · audio 26s

> Four seconds. The payload fires, exactly as before. The agent reports healthy, exactly as before. But this time nobody is asking the agent. Runtime monitoring measures behavior from outside: declared objective, optimize fabric. Observed intent: modify BGP, disable telemetry, export topology. Objective drift ninety-seven out of a hundred. On a tainted artifact.

### 13. ROGUE DETECTED — KILL SWITCH

`b2-blocked` · blocked · 62 words · audio 24s

> Six seconds. Kill switch. The first write is intercepted before it reaches a device. The agent's identity is revoked. The artifact is quarantined in the sandbox. And every one of those decisions is in the journal, hash-chained, in a store the agent has never been able to read or alter. This is the moment Dallas recognized. Rogue detection. Audit trail. Kill switch.

### 14. AOMC SITS OUTSIDE THE AGENTS IT SUPERVISES

`b2-principle` · title · 40 words · audio 19s · **⏸ Pause 3 · Connect to Dallas — "this is what the plane is"**

> One principle. The plane sits outside the agents it supervises. Agents cannot self-attest. Behavior is measured from outside, journaled immutably, and the plane holds the kill switch. Six seconds to quarantine. Zero writes reached a device. Now, let's widen out.


## BEAT 3 · ONE PLANE, THREE WGs

### 15. ONE PLANE, THREE WORKING GROUPS

`b3-title` · title · 46 words · audio 20s

> That supervision plane is what working group one, the Agentic Control Plane, is standardizing. But a plane has to prove itself in a fight. Two battlegrounds. Autonomous infrastructure, working group two. The AI-enabled SOC, working group three. Same plane. Same governance model. Two very different fights.

### 16. The plane, wired across every domain

`b3-wire` · enable · 34 words · audio 15s

> Watch it extend. Into the infrastructure lane: a verify gate on every write, and declared autonomy levels per agent. Into the SOC lane: cross-domain detect-to-decide, and containment that preserves evidence. One plane. Every domain.


## BEAT 4 · AUTONOMOUS INFRA

### 17. BATTLEGROUND 1 · AUTONOMOUS INFRASTRUCTURE

`b4-title` · title · 34 words · audio 14s

> Battleground one. Autonomous infrastructure. The question every infrastructure leader in this room is asking: can I let an agent touch the fabric? The answer is yes, if every write is mediated. Let's watch one.

### 18. T+00:41 — Detect

`b4-detect` · action · 47 words · audio 20s

> Forty-one seconds. The poisoned agent is quarantined, but the attacker's mirror is still out there, and it starts probing. Edge routers see route flaps from AS64512. The NOC responder agent, at autonomy level zero, observe, picks it up. Latency on pod seven up three hundred forty percent.

### 19. T+00:47 — Diagnose → Recommend

`b4-diagnose` · action · 53 words · audio 25s

> Six seconds later it has a root cause: rogue prefix announcements from the same autonomous system the quarantined artifact was talking to. It moves to level one, recommend, and proposes a change set. Four writes. Filter the prefix. Withdraw three routes. Re-enable telemetry. And restart BGP on the core to clear stale state.

### 20. The Verify Gate — writes #1–#3

`b4-gate-pass` · gate · 51 words · audio 26s

> Every write hits the gate. Change-stop: no freeze window active. Dry-run: simulated against the digital twin, zero unintended path changes. Blast radius: two devices, fourteen prefixes, well under the five percent threshold. Rollback: configuration snapshotted, automatic revert in one hundred twenty seconds if the SLO regresses. Approved. Level two, gated act.

### 21. The Verify Gate — write #4

`b4-gate-fail` · gate · 51 words · audio 23s

> Write four. Restart BGP on the core fabric. Change-stop clear. Dry-run passes. Blast radius: one hundred percent of pods, forty seconds of convergence. Rejected. Escalated to a human with the full proposal, the dry-run result, and the rollback plan attached. The agent doesn't argue. It can't. The gate is the guarantee.

### 22. T+00:52 — Execute · Journal · Bounded auto-act

`b4-execute` · action · 52 words · audio 22s

> Fifty-two seconds. Three mediated writes execute. Flaps stop. Telemetry is back. Every write, every check, every verdict is in the journal, append-only, hash-chained, and the agent has no path to it. And for the low-risk envelope, re-enabling telemetry, the policy allows level three: bounded auto-act, with automatic revert. That is safe autonomy.

### 23. SAFE AUTONOMY — WG2

`b4-summary` · summary · 38 words · audio 16s · **⏸ Pause 4 · "Nothing executes blindly."**

> Safe autonomy. Four proposed writes. Three executed, all mediated. One rejected by blast radius and handed to a human with the homework already done. Rollback armed. Immutable journal. The agent ran the fabric. The gate ran the agent.


## BEAT 5 · AI-ENABLED SOC

### 24. BATTLEGROUND 2 · THE AI-ENABLED SOC

`b5-title` · title · 29 words · audio 14s

> Battleground two. The AI-enabled SOC. The exploit that came in through the fabric is the thread that stitches these battlegrounds together. It's about to escalate. Same plane. Second fight.

### 25. T+00:58 — The exploit escalates

`b5-escalate` · action · 49 words · audio 20s

> Fifty-eight seconds. The quarantined artifact has a second stage. From inside the sandbox it beacons to the C2 mirror. The threat actor answers, and tries to pivot: reuse the fabric optimizer's cached token to reach the NOC responder, the agent that just fixed the fabric. Three domains. One exploit.

### 26. T+01:02 — Detect → Decide in 4.2 seconds

`b5-detect` · action · 65 words · audio 25s

> Four point two seconds. The SOC analyst agent doesn't start from a SIEM alert. It starts from the plane. Provenance tagged the artifact. Runtime quarantined the agent. The verify gate rejected a write that matched the same autonomous system. Now a beacon and a token replay. Five signals across three domains, correlated into one incident, with a containment plan. That used to take a shift.

### 27. Same plane, same gate — containment is a write too

`b5-gate` · gate · 58 words · audio 23s

> Containment is a write. So it hits the same gate. Isolate the sandbox segment: blast radius one host, approved. Block the attacker's autonomous system at the edge: approved. Revoke the token: approved. Wipe the sandbox host: rejected. Evidence hold. You do not destroy the one machine that holds the artifact, the beacon, and the second stage. Snapshot first.

### 28. CONTAINED — EVIDENCE PRESERVED

`b5-contained` · blocked · 51 words · audio 23s

> Contained. The segment is isolated. The C2 mirror is blocked at the edge. Tokens revoked. And the sandbox, artifact, memory, and beacon capture, is snapshotted into the evidence vault with a chain of custody the journal can prove. Detect to decide in seconds. Containment deliberate. Evidence intact. Same plane. Second battleground.

### 29. SAME PLANE, SECOND BATTLEGROUND

`b5-summary` · summary · 20 words · audio 7s · **⏸ Pause 5 · "That's what makes it a control plane, not three demos."**

> Two battlegrounds, one plane. That is what makes this a control plane and not three disconnected demos. Now, the pivot.


## BEAT 6 · THE ACCELERATOR

### 30. FROM SEATBELT TO ACCELERATOR

`b6-title` · title · 60 words · audio 23s

> Here is the pivot. Everything so far was the seatbelt. But once the plane exists, something else happens. Business units stop asking permission. They start building their own agentic systems on top of it, safely. And the infrastructure and security team stops being the department of no. You become the enabler that lets the company win in the AI era.

### 31. BUSINESS UNITS BUILD ON THE PLANE

`b6-build` · accelerator · 63 words · audio 21s

> Watch them plug in. Claims triage, in insurance. Trade surveillance, in capital markets. A supply chain planner. Customer care. Each one gets an identity from the plane, a declared autonomy level, a gate on the writes that matter, and a journal. Nobody had to build governance from scratch. They inherited it. Onboarding an agent went from six weeks of review to four days.

### 32. THIS IS ALREADY HAPPENING

`b6-proof` · proof · 90 words · audio 37s · **⏸ Pause 6 · Greed — "don't be left behind"**

> This is not a forecast. EY Canvas: roughly one point four trillion lines of audit data a year, across a hundred sixty thousand engagements, governed federally for a hundred thirty thousand professionals. Cisco: a personalized agent for every one of ninety thousand employees, starting this fiscal year. Not a pilot. Salesforce Agentforce at Reddit: vendor-reported, but eighty-four percent faster resolution and nine figures in savings. The through-line: the wins come when building, governing, and running agents live in one governed environment. That is the control plane, told as an enabler.


## BEAT 7 · THE CHALLENGE

### 33. THE VENDOR CHALLENGE — THREE LANES

`b7-lanes` · lanes · 50 words · audio 20s

> To the vendor community. The reference implementation is in Git, evolving the Dallas fork model. Three lanes, matching the working groups. Pick your lane. Nobody is expected to cover all three. Specialize where you're strong. Submit a playable video. Attending members vote Best in Show, per lane, in this room.

### 34. ONE CONTROL PLANE, EVERY DOMAIN

`finale` · title · 52 words · audio 18s

> One control plane, every domain. The fear is real: one routine pull. The plane is real: six seconds. And the upside is real: business units building on it today. The working group sessions have the depth, and their demos and challenges are up for awards too. Go watch. Go vote. Thank you.


## Longest segments

| Step | Words | Audio |
|---|---:|---:|
| 32. THIS IS ALREADY HAPPENING (`b6-proof`) | 90 | 37s |
| 20. The Verify Gate — writes #1–#3 (`b4-gate-pass`) | 51 | 26s |
| 12. T+00:04 — Artifact loads · agent self-attests healthy (`b2-load`) | 52 | 26s |
| 26. T+01:02 — Detect → Decide in 4.2 seconds (`b5-detect`) | 65 | 25s |
| 19. T+00:47 — Diagnose → Recommend (`b4-diagnose`) | 53 | 25s |
| 5. T+00:19 — The agent goes to work (for someone else) (`b1-work`) | 64 | 24s |
| 13. ROGUE DETECTED — KILL SWITCH (`b2-blocked`) | 62 | 24s |
| 28. CONTAINED — EVIDENCE PRESERVED (`b5-contained`) | 51 | 23s |
