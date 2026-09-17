# Vendor Instructions — The Fall 2026 Challenge

ONUG Fall AI Networking Summit · New York City · 28 October 2026

**Status: draft for Nick, Peter, Bill and Jesi, 16 September 2026.** Shareable copy: [Google Doc, draft v3](https://docs.google.com/document/d/15qbvUx6v6O8ZEzRj6owaeaxLsGbGupmShl2HVfFEnGo/edit) in Nick's *Demo Fall 26* Drive folder (v1 and v2 are renamed as superseded; v3 adds the controls-to-requirements table; keep the Doc in step with this file). Dates marked ▲ are proposals that need a yes before this goes to vendors. Everything else follows what was agreed at the 15 September co-chair review and the 16 September team meeting (the challenge is open to every sponsor, not only Collaborative members; founding members had the demo and these instructions first and carry their marks in the Collaborative Center).

## 1. What this is

The keynote demo, *One Control Plane, Every Domain*, shows what happens to a company doing everything right when a poisoned artifact reaches an agent, and then shows the same company with an agentic control plane in place across three domains. It ends by handing the room to you.

**The challenge is a response, not a repeat.** The keynote has already shown the attack. Your demo shows how your product answers it in one of three lanes, using the working groups' reference architectures and their words.

| Lane | Working group | The challenge | What "prove it" looks like |
|------|---------------|---------------|----------------------------|
| 1 | WG1 · Agentic Control Plane | Supervise agents from outside. No self-attestation. | Identity and provenance for every agent and artifact · declared personas · runtime drift detection and kill switch · immutable, hash-chained audit journal |
| 2 | WG2 · Autonomous Infrastructure | Let agents run the fabric with every write mediated. | The Verify Gate on every write: change-stop · dry-run · blast radius · rollback · declared autonomy levels · bounded auto-act with automatic revert |
| 3 | WG3 · AI-Enabled SOC | Compress detect-to-decide to seconds without destroying evidence. | Cross-domain correlation · the Decide Gate: contain now or observe and trace · evidence preserved with chain of custody |

**The controls you are judged on, by number, and the working-group requirements each one translates.** From Peter Campbell's vendor three-lane challenge report (17 September 2026), which checks the demo against the 24-requirements crosswalk. None of this is new scope: each control is a requirement already in that lane's document, phrased as something a vendor can be asked to show.

| Lane | Control | Requirements |
|------|---------|--------------|
| 1 · WG1 | #1 Identity Attestation · cryptographic non-human identity, mutual auth | TF-1, TF-5 |
| 1 · WG1 | #2 Artifact Provenance · approved source, SBOM, new artifacts run sandboxed first | REG-5, REG-2 |
| 1 · WG1 | #3 Runtime Monitoring · behaviour measured from outside the agent | RS-2 |
| 1 · WG1 | #4 Immutable Audit Journal · append-only, hash-chained, agent has no access | RS-3 |
| 1 · WG1 | #5 Kill Switch · quarantine at machine speed | RS-4 |
| 2 · WG2 | #6 Verify Gate · change-stop, dry-run, blast radius, rollback | LOOP-4 |
| 2 · WG2 | #7 Autonomy Levels · observe → recommend → gated act → bounded auto-act (revert on failure is LOOP-6 under the L3 tier) | PER-1 |
| 3 · WG3 | #8 Detect → Decide · cross-domain correlation in seconds | RES-4, LOOP-4 |
| 3 · WG3 | #9 Deliberate Containment · evidence preserved before anything is destroyed | LOOP-5, RS-3 |

The demo's Beat 7 card shows the same numbers per lane. Your one-page summary should say which of these numbers the video covers.

Pick the lane where you are strongest. Nobody is expected to cover all three. A company may enter more than one lane, with a separate video for each.

**Collaborative members first.** Members of the ONUG Collaborative receive the demo, the repository and these instructions on 17 September, eleven days before the call opens to every other sponsor on 28 September. That is deliberate: the members wrote the reference architectures the challenge is judged against, and the head start is part of what membership buys. Founding members also carry their marks in the Collaborative Center, where the videos play.

## 2. Timeline

| Date | Milestone | Who |
|------|-----------|-----|
| Thu 17 Sep | **Members first.** Collaborative members get the demo on collaborative.onug.net, the private repository and these instructions. | Nick |
| ▲ Mon 28 Sep | Call opens to every sponsor. Repository made public, these instructions sent to all sponsoring vendors. | Nick, Peter |
| ▲ Fri 2 Oct | **Intent to enter** due: company, lane(s), booth number, whether you want a theatre presentation slot, and who will be at the booth during the Challenge Walks. | Vendor → Bill and Jesi |
| ▲ Wed 7 Oct | Office hours 1: the repository, the reference architectures, the terminology, Q&A. Recorded. | Peter, Nick |
| ▲ Wed 14 Oct | Optional checkpoint: send a rough cut for feedback on fit and terminology. | Vendor → Bill and Jesi |
| ▲ Fri 16 Oct | Office hours 2: final Q&A, submission mechanics, voting walkthrough. Recorded. | Peter, Nick |
| ▲ **Mon 19 Oct, 11:59 PM ET** | **Final video due.** Late videos play in the theatre but are not on the ballot. | Vendor → Bill and Jesi |
| ▲ Fri 23 Oct | Theatre presentation schedule and Whova ballots published. | Bill, Jesi |
| Wed 28 Oct | Summit. Videos on loop in the Collaborative Center and the networking areas. Presentations and office hours in the theatre. Members vote in Whova. Best in Show per lane announced at the close. | Everyone |

Nine days between the deadline and the Summit is what Bill needs to load the loops, build the schedule and test the ballots. It is not padding.

## 3. Rules

1. **Answer the challenge in your lane.** Show your product doing that lane's job inside the keynote's story: the catch in the sandbox, the gated write, the contained escape. Do not restate the attack; the keynote does that.
2. **Use the working groups' terminology.** The words on screen and in your narration must match the reference architectures, so that a member who watched the keynote recognises what they are looking at. The glossary in section 6 is the list. If your product calls something by another name, say both once, then use ours.
3. **Fork, don't reinvent.** The reference implementation is `github.com/onug/Fall26Demo`. Fork it and build on it, or build your own recording that follows the same beats. Either is fine. What is not fine is a generic product demo with a WG label on the front.
4. **Do not alter the failure.** Beat 1 is shared ground. What differs between vendors is the catch, the gate, the containment.
5. **Real product, plainly labelled.** Show what ships. Anything on the roadmap is marked on screen as roadmap. No claims of ONUG endorsement, certification or preference: ONUG has not evaluated your product, and the award is the members' vote.
6. **Your product, not the competition.** No competitor names, screenshots or comparisons.
7. **One lane per video.** A second lane is a second video and a second entry.
8. **Length: five to ten minutes.** Over ten will not be loaded. Under five is fine if it does the job.
9. **You own it; ONUG may play it.** You keep the rights. By entering you allow ONUG to play the video on loop at the Summit, in the Whova app, on collaborative.onug.net and on onug.net afterwards, and to use stills from it in Summit coverage. Clear any music, fonts and stock footage for that use.
10. **The keynote's narration is Nick's voice and stays in the keynote.** Record your own narration. Do not reuse the keynote's audio files.
11. **Be at your booth for the Challenge Walks.** During each scheduled walk your submission plays at your booth and a person who built it is there to talk it through. That is where members decide how to vote.

## 4. Format

Videos play on loop in open seating areas, often with the sound down, and in the theatre with the sound up. Build for both.

| Item | Requirement |
|------|-------------|
| Container and codec | MP4, H.264 video, AAC audio |
| Resolution and frame rate | 1920 × 1080, 30 fps (25 fps accepted) |
| Length | 5 to 10 minutes |
| File size | 2 GB or under |
| Audio | Stereo, spoken narration, normalised to about −16 LUFS. No music under the narration. |
| On-screen text | Captions burned in, or narration text on screen (the reference demo does this with the `T` key). Assume the sound is off. |
| Opening card, 5 seconds | Company name and mark · lane number and working-group name · "A response to the ONUG Fall 2026 challenge" |
| Closing card, 5 seconds | Company name · one contact for follow-up · nothing else |
| Recording | Screen capture at native resolution, cursor visible only when it matters, no notification pop-ups, no browser chrome |

A rough cut for the 14 October checkpoint can be any format; the 19 October final must meet the table.

## 5. Naming and how to send

**One file name pattern, lowercase, hyphens, no spaces:**

```
<company>-wg<lane>-demo-ny26.mp4
```

Examples:

```
cisco-wg1-demo-ny26.mp4
netbrain-wg2-demo-ny26.mp4
cpacket-wg3-demo-ny26.mp4
palc-networks-wg2-demo-ny26.mp4
```

The company token is the short name everyone uses, not the legal name. A resubmission before the deadline gets a version suffix, `cisco-wg1-demo-ny26-v2.mp4`, and replaces the earlier file. Companion files carry the same stem:

| File | Purpose |
|------|---------|
| `<stem>.mp4` | The video |
| `<stem>.srt` | Captions, if not burned in (optional) |
| `<stem>-summary.pdf` | One page: what the video shows, which controls in the lane it covers, one contact (required) |
| `<stem>-logo.png` or `.svg` | Your mark on a transparent or white background, for the theatre signage and the ballot (required) |

**Where it goes.** Jesi will create a Google Drive folder, *Fall 2026 Vendor Demos*, with one subfolder per lane, and send each entering company an upload link with the acknowledgement of their intent to enter. Upload the files there; do not email video attachments. Then send one email so there is a record:

```
To:      bill@onug.net, jesi@onug.net
Cc:      peter@onug.net
Subject: Fall26 demo submission — <Company> — WG<lane>

Company, lane, file names uploaded, presenter name if you requested a theatre slot,
and the one contact for questions.
```

Bill and Jesi confirm receipt within two business days. No confirmation means it did not arrive.

**Intent to enter** is the same email on 2 October with the subject `Fall26 demo intent — <Company>`, listing the lane or lanes, your booth number, whether you want a theatre presentation slot, who will be at the booth during the Challenge Walks, and who your technical contact is for office hours.

## 6. Glossary — the words to use

These are the working groups' terms as the keynote uses them. The reference-architecture drawings are in the repository under `web-demo/public/ra/` and on the cards in the demo.

| Term | Meaning |
|------|---------|
| Agentic control plane | The supervision layer that sits outside every agent. Agents enroll in it, every action is mediated by it, and no agent can vouch for itself to it. Formerly "AOMC supervision plane". |
| Persona | What an agent declares at enrollment: who it acts for, what it may want, its autonomy level, the estate it may touch. Runtime drift is measured against it. |
| Identity attestation · artifact provenance · runtime monitoring · immutable audit journal · kill switch | The five WG1 capabilities on screen in Beat 2. |
| Sandbox first | New artifacts run in a sandbox under the control plane before they touch the network. The sandbox runs the artifact for real; its writes are intercepted before any device. |
| Planning phase · execution phase | The two halves of the WG2 and WG3 architectures: persona creation on top, the operations loop inside an enforcement and audit boundary below. |
| Operations loop | WG2: detect · diagnose · propose · verify · execute · validate. WG3: detect · investigate · propose · decide · respond · validate. |
| Verify Gate | WG2, step 4 of the loop. Change-stop · dry-run · blast radius · rollback. Every write passes it; a failed check escalates to a person. |
| Decide Gate | WG3, step 4 of the loop. Contain now, or observe and trace. Containment is a write and passes the same checks, plus the evidence hold. |
| Autonomy levels | L0 observe · L1 recommend · L2 gated act · L3 bounded auto-act. Declared per persona; L3 only inside a pre-approved envelope with automatic revert. |
| Evidence hold | A destructive containment action is refused until the evidence is preserved with a chain of custody. |
| Access enforcement and audit | The boundary the operations loop runs inside, outside the agent's control and influence. |

## 7. At the Summit

- **The loops.** Every accepted video plays in rotation in the Collaborative Center theatre and on screens in the networking areas, grouped by lane. If a lane draws many entries it gets its own screen.
- **Presentations.** Companies that asked for a slot present in the theatre: ten minutes, your video or a live walk-through, five minutes of questions. Slots are assigned in order of intent-to-enter and published on 23 October.
- **Office hours.** Working-group co-chairs hold office hours in the same space for members and vendors, on the published schedule.
- **The Challenge Walks.** ▲ Two scheduled windows over lunch, one each day, listed in Whova as sessions. Nothing runs against the sponsored main-stage keynotes, so the walks sit in the exhibit-floor time: day one about 11:45–12:30 with the 5:00–6:30 reception as a second chance, day two lunch through about 1:30. Bill sets the exact windows on the 21 September agenda call. The theatre goes quiet, the loops keep running, and attendees are pointed at the entrants' booths. Every entrant's booth carries a lane sign in the lane colour, "Fall 2026 Challenge · WG2", and each Whova ballot entry carries the company's booth number, so a member can see the submission and the people behind it before voting.
- **Voting.** Attending members vote in the Whova app, one ballot per lane, one vote per attendee per lane. Voting opens after the keynote and closes at the end of lunch on day two, so the count is ready for the close at 4:15. The ballot carries one line of guidance, no more: how well does this answer the challenge Nick and Peter set in the keynote? Attendees from vendor companies do not vote; the count is screened for that (Bill, 16 September). Bill expects around 200 voters.
- **Best in Show, per lane.** Three awards, announced at the close, with the video played once more on the main screen. They are three of the Summit's four Best in Show categories, which follow the conference tracks (AI infrastructure, security, networking, automation); the fourth is outside the challenge. ▲ Whether a sponsor may enter a track with a product rather than a challenge video is open; Bill and Tony are working it (16 September team meeting).

## 8. Questions

- Office hours, 7 and 16 October, recorded and shared.
- GitHub Discussions on the repository, tagged `fall26-challenge`, for questions every vendor should see the answer to.
- peter@onug.net for the working groups and the reference architectures; bill@onug.net and jesi@onug.net for logistics, files and schedule; nick@onug.net for the keynote itself.
