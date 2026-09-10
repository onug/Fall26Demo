# Review Feedback Log

Practitioner and co-chair input on the keynote arc, and what the demo did with it. Newest first.

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
