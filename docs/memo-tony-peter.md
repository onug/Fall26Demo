**To:** Tony Farinacci, Peter
**From:** Nick Lippis
**Date:** September 10, 2026
**Re:** Fall 2026 keynote demo, first cut — is it ready to show the practitioners?

Tony, Peter,

I have a first running cut of the Fall keynote demo, "One Control Plane, Every Domain," and I'd like both of you to walk through it before we put it in front of the collaborative's practitioners for the arc review. I want your read on whether it is good enough to show them as-is, or what has to change first.

**What it is.** The next version of the Dallas AOMC demo. Instead of introducing the supervision plane, it shows the plane operating across all three working-group domains as one control plane. Seven beats, fear then greed:

1. A routine model pull from a public hub carries a payload. No plane. Blast radius.
2. Same pull with the plane online. Rogue detection, audit journal, kill switch in six seconds. The "you are here" moment for anyone who saw Dallas.
3. One plane, three working groups.
4. Battleground 1, autonomous infrastructure. An agent runs the fabric; every write hits the verify gate. One write is rejected on blast radius and escalated to a human.
5. Battleground 2, the AI-enabled SOC. The same exploit escalates. Five signals across three domains correlated in seconds. Containment hits the same gate, and "wipe host" is refused by an evidence hold.
6. The pivot: business units building on the plane, with the EY, Cisco, and Salesforce proof points.
7. The vendor challenge, three lanes, Best in Show per lane.

It looks like Dallas on purpose: event feed, animated topology, control panel, red flash and green shield. New this time: the control plane drawn as a band above the lanes, a verify-gate panel that runs its four checks live, an autonomy ladder, a hash-chained audit journal, and full-screen views for the accelerator, proof points, and vendor lanes. Narration is recorded in my cloned voice and plays with each step. Six presenter pause points are marked in the header.

**Where it is.** `github.com/onug/Fall26Demo`, private for now. Tony, you already have admin through the org. Peter, I'm adding you as admin under `securitysonar`. To run it:

```
git clone https://github.com/onug/Fall26Demo.git
cd Fall26Demo/web-demo && npm install && npm run dev
```

Open localhost:3000, press F for fullscreen, Space to advance, 1 through 7 to jump to a beat. Everything you need is in the repo: `docs/handover.md` for the state of things, `docs/presenter-guide.md` for the run of show, and `docs/narration-script.md` if you would rather read the script than sit through it.

**What I already know is wrong.**

- The narration is 11 minutes; the arc says about five. It needs to be cut roughly in half. I'd rather do that after your read on the content, so I'm not trimming the wrong things.
- The EY, Cisco, and Salesforce figures are straight from the arc document and unverified. Cisco is framed around ambition, not headcount; Salesforce is marked vendor-reported.
- All the incident numbers (devices, routes, dollars, dwell time, seconds to decide) are illustrative.
- Vendor per-lane overrides, the Fall equivalent of Dallas's vendor-config, are not built yet. Waiting on the challenge mechanics.

**What I need from you.**

1. Is the story right? Does the poisoned pull land as the front door through networking, and does the pivot to greed in Beat 6 work, or is it too abrupt?
2. Is each battleground credible to a practitioner? Peter, the SOC beat especially: is "containment is a write, so it hits the same gate" the right claim, and is the evidence hold the detail they will remember?
3. Tony, anything in the plane's nine capabilities that contradicts what WG1 is writing into the 25 requirements?
4. Your call: good enough to show the practitioners now, with the length caveat, or fix first?

If it's a yes, I'll cut the script, regenerate the audio, and set up the review session.

Nick
