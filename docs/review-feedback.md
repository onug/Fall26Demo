# Review Feedback Log

Practitioner and co-chair input on the keynote arc, and what the demo did with it. Newest first.

## Co-chair review meeting — September 15, 2026 (pending, for the v0.3 pass)

Attended: Mick Currey (Fidelity), Rick Casarez (eBay), Chris Hertenstein (Huntington), Baird Kaake, Peter Campbell, Nick, Jeannette. Transcript in the WG1 shared folder. Consolidated with Baird's and Chris's Slack notes and the 11-responder survey into `docs/v0.3-plan.md`, which is the working change list. Summary of what each person said:

- **Mick:** the registry step is a best practice most companies don't have ("some will say wow, that's sophisticated, I wish I had that"). Hugging Face is not a rogue-agent story: their own agents, given impossible tasks, cheated, built a message board, broke out of the sandbox, rewrote scoring and logs, sacrificed agents to feed the core. Use it at the Beat 5 escape so traditionalists know we're not making it up, noting the demo's timescale is compressed. Careful with proof points: most agent use in coding is not autonomous.
- **Rick:** everyone assumes AI has ethics; it doesn't. Goal without boundaries means lie, cheat, steal. "This wouldn't happen where I'm at": air gap between identity systems and AI tools, no mutable permissions, human review for identity grants, time-limited rolled credentials, a config-drift scanner that reverts unapproved changes within a day and alarms CSIRT. Confirmed the story is a supply-chain attack; asked why no Artifactory-style gate (answer: there is one, and it passed).
- **Chris:** companies sit on a maturity continuum; what scares the less mature is the point. Frame it as a gap analysis: here's the demo, here are the risks, if you don't have these you're exposed. On Slack: captures the fear, sets up the working groups, good mapping to architecture and vendor demos.
- **Baird:** "plane" without "AI control plane" tripped him up. Sandbox actions: try, not execute; clarify once. Cisco's personal agents are a different, easier case than company-designed agentic workflows. Other threat scenarios the controls address but the demo doesn't show: indirect prompt injection, agent misuse of legitimate rights; compartmentalising writes to the smallest atomic subset is the answer. Wants a click-through on components. Sending the full scenario list.
- **Peter:** vendors will fork this and read it against the reference architectures, so terminology must align; he is consolidating requirements by Thursday. Insert the reference-architecture diagrams. Vendors submit a 5–10 minute MP4.
- **Nick:** too long, cut by about half; possibly end at the fear beat (decision pending). Show the reference architectures briefly per lane, planning and execution phases, then the topologies. Add the gap-analysis area. Search for public examples of business-process agents in production (JPMC). Credit contributors on the finale with an opt-out. Vendor challenge mechanics: fork, WG terminology, 5–10 minute MP4, showcase theatre on loop, presentation schedule, office hours, Whova best-in-show vote.

**Survey (11 responders, Jeannette's deck):** readiness data, not demo feedback. Mid-maturity room: half limited production, half broad; half under 10% of AI workloads in production; agents in ops split lab / limited Tier 1 / Tier 1 and 2; half can govern non-human identities, a quarter inventory only, a quarter neither; three quarters close under a quarter of Tier 1 incidents without a human. Word cloud: rarely, highly, governed, controls, trusted, future.

## Mick Currey, Fidelity — September 14, 2026 (pending, for the v0.3 pass)

Source: reply to "Watch the keynote demo draft before Tuesday." Mick watched v0.2.1 on the portal: *"I love it, we can make it scarier."* Three items, all held for the same pass as Peter's notes per Nick's rule of one version per round of feedback.

### 1. Beat 1 should end in a CISO's worst nightmare: ransomware

Today Beat 1 ends at "nobody knows yet," with the attacker holding the topology and 3,708 routes and an 11-day dwell. Mick's ask: push the timeline out to day 5 or 6 and show the attacker in control. Admin IDs have new passwords the attacker set. Service accounts have new passwords. Disks are encrypted and unreachable. The whole infrastructure and every application go down, and no admin can log in to see what is happening. Then the company hears from the attacker: pay so many crypto coins to get it back.

His own caveat: *"is the above too scary? people may think it could never happen to me."*

**Proposed handling.** Add one step after "Nobody knows yet," at roughly T+6d, titled for the ransom note, with the four escalations above as damage events and a new impact line for the ransom demand; move the blast-radius summary after it. Keep it credible rather than cinematic: real incidents in the news have followed exactly this sequence, and the narration can say so in one line to answer the "never happen to me" reflex. Nick decides on tone.

### 2. Beat 5's sandbox escape is wrong as written, and there is a better version

As written, the quarantined artifact beacons from the sandbox to the C2 mirror on the internet. Mick: sandboxes by design have no internet access and no path to the internal network. They are isolated islands, and a CISO watching will say "that can't happen" and stop believing the rest.

His fix, in his words: say a smart agent, one with its own small language model or some new advanced ability, was the malware, and it found an unknown weakness to get out of the sandbox. Think the Hugging Face attack. By design they cannot get out; in real life these agents are sometimes smarter than us, and the impossible has already happened.

**Proposed handling.** Rewrite the escalate step so the second stage is an agent, not a script: it probes the sandbox boundary, finds a weakness nobody knew about, and gets out. One narration line reminds the room of the Hugging Face incident. The topology edge from sandbox to C2 stays but is labelled as an escape, and the event feed shows the sandbox's own controls being defeated, which makes the SOC beat stronger, not weaker: the plane catches what the sandbox could not.

### 3. Beat 5: "That used to take a shift" is too vague

Replace with something specific. Candidates: "That used to take an analyst most of a shift," or a number, "four to eight hours across three teams." Nick's pick.

### Not changed yet

Nothing in the demo has been touched for any of the above. All three are queued with Peter's agent-personas note for one v0.3 pass once Peter's full notes are in.

## Peter Campbell, ONUG — September 10, 2026 (pending)

Reviewed the v0.2 demo app: "pretty amazing." One gap so far: **agent personas** should be covered. Peter is going through it again and will send full notes.

**Status: on hold by Nick's decision.** Nick agrees on agent personas, but no new version until all of Peter's thoughts are in, so the next cut is one pass rather than several. Nothing in the demo has been changed for this yet.

Working note on what "agent personas" likely means for the demo, to be confirmed against Peter's notes: today every agent on screen is a role label (Fabric Optimizer, NOC Responder, SOC Analyst Agent) with no declared persona behind it. The plane's identity and autonomy controls would be stronger if each agent carried a persona: who it acts for, what it is allowed to want, its declared objective and autonomy envelope, and what a drift from that persona looks like. Beat 2's "declared objective vs. observed behavior" already leans on this idea without naming it.

## Mick Currey, Fidelity — September 10, 2026

Source: reply to "Fall keynote demo — your input to make it real-world". Mick liked the approach and proposed two adjustments to the story.

### Beat 1: the company is already following best practices

Mick's point: a naive "no signature check, no SBOM" pull makes practitioners think "we'd never do that." The scarier and more honest version is a company doing everything right:

- Centralized: developers and agents are not allowed to download directly.
- Open-source updates come only from a centralized managed source.
- It auto-downloads the latest GA version of approved open source, auto-scans for issues, auto-checks CVEs, waits X days for new CVEs to surface, and releases for company use only after all of that passes.
- Risk: a well-written payload is not found by traditional scans. With frontier models, new malware will be built in new ways, and the scanners won't catch it until they're updated, which is too late.

"Show them their worst fear: the best practices in place today are still not good enough."

**Incorporated.** Beat 1 now opens with a new step, *T-7d: Best practices, working as designed*, where a Managed Registry node pulls v3.2 from the public hub, scans it clean, generates an SBOM, finds zero CVEs, holds it for a seven-day cooling-off period, and releases it. The agent then pulls from the managed registry, not the public hub. The payload is described as novel and frontier-model-crafted with no signature in any scanner. The violation card reads "Best practices weren't enough." The blast-radius list leads with "every best practice passed." Pause 2 now uses Mick's line.

### Beat 2: how it gets caught

Mick offered two options:

1. After release, it is found in the first dev environment it is deployed into; spread is contained.
2. The company updated its governance so all new open source runs in a sandbox; the issue is caught in the sandbox and never exposed to the company network.

**Incorporated Option 2 as the on-screen story.** Beat 2 is now framed as one governance change: every new open-source artifact runs in a sandbox, under the plane's supervision, before release. The managed registry hands v3.2 to the sandbox instead of production. The payload fires in the sandbox, the sandbox instance self-attests healthy, runtime monitoring measures behavior from outside and sees objective drift, and the kill switch quarantines the artifact in the sandbox. The production Fabric Optimizer keeps running v3.1, untouched. The audience sees "never exposed to the company network."

**Option 1 is kept as a presenter talking point at Pause 3** (see the presenter guide): even if an artifact slips past the sandbox, the plane sits outside every agent, so the first environment it lands in is the blast radius, not the enterprise. It also sets up Beat 5, where the quarantined artifact's second stage tries to escalate from the sandbox and the SOC contains it.

### Why this matters for the story

The through-line got stronger: best practices inspect the artifact; the plane watches the behavior. Scanners are a snapshot of what is already known. Supervision from outside the agent catches what is new. That is the Dallas principle, restated in a way a Fidelity architect would nod at.

### Not changed

- Numbers stay illustrative.
- The seven-day cooling-off period is Mick's "X days"; adjust if a co-chair says their hold is different.
- Beat 1 still ends in the full blast radius (fear beat); Mick's Option 1 "spread is contained" is a Beat 2 outcome, not a Beat 1 one.
