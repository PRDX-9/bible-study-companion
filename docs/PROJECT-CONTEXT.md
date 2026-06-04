# Bible Study Companion — Project Context

> A personal study tool that helps Unathi prepare words and teachings faster and deeper, without replacing his own thinking, study, or prayer. This is the canonical product blueprint. Any agent working on this project should read it first, then `AGENTS.md` for how to work in the code.

---

## 1. Vision

A personal Bible study application that acts as a **thinking partner**. It helps move from scattered fragments and a rough theme to a structured, well grounded message in the user's own voice. It does the heavy lifting of context, cross referencing, and original language insight so that the user's energy goes into revelation, connection, and delivery.

Built for one user. No accounts, no sharing, no multi user permissions. This keeps the build simple and the interface focused on how the user actually studies.

---

## 2. Core Philosophy (non negotiable)

**The tool excavates. It does not dictate.**

The word must come from the user. The application exists to draw out what is already forming in him, give it solid grounding, and help him express it clearly. It must never become a shortcut that replaces critical thinking, personal study, or prayer.

Three principles govern every feature:

1. **Support, never substitute.** The tool surfaces context and options. The user makes the theological calls and forms the message.
2. **Draw out the user's insight first.** When he brings a raw thought, the tool helps him develop and test it against scripture rather than handing him a finished idea.
3. **Prayer and meditation stay his.** The process always ends with him praying over the word. The tool prepares scaffolding; God gives the revelation.

If a feature risks making him lazy in study or thin in understanding, it is the wrong feature.

---

## 3. The Study Workflow (the core engine)

This workflow is the real blueprint. It is the exact process that produces a strong word. The app should make each step faster without skipping any of them.

1. **Capture the raw material.** A theme, a feeling, a fragment, a verse on his heart, or rough notes. The starting point is often messy and that is fine.
2. **Set the anchor passage.** Identify the primary scripture the message hangs on.
3. **Provide context for each passage:** who wrote it and when; who the original audience was and their situation; where the passage sits in the book (the broad movement); the immediate context (the verses directly around it).
4. **Surface original language insight.** Hebrew, Greek, or Aramaic meaning for key words. Primarily for understanding. It informs the language he preaches with; it does not need to appear as vocabulary in the final word unless it earns its place.
5. **Apply hermeneutical principles.** For example the principle of first mention (tracing a word to its first appearance in scripture to establish its foundational meaning). Support cross referencing and linking passages to build a through line.
6. **Develop his insights.** When he brings an original thought (for example an image or an illustration), the tool helps him test it against the text, strengthen it, and check it is sound rather than forced.
7. **Build the connections.** Help him see and articulate the through line between passages so the message holds together as one argument.
8. **Ground illustrations in his own context.** Illustrations should come from his life and world (game development, family, serving). They work best as scenarios that let the listener answer for themselves.
9. **Structure into a flowing word.** Convert study notes into a message in his voice, in a logical preaching order.
10. **Refine iteratively.** Condense, sharpen, adjust tone, and lock versions. Shorter and clearer beats longer and complete.
11. **Pray over it.** The final step is always his.

---

## 4. The Experience Blueprint

> How the philosophy and the workflow become an app the user walks, not a tool the user operates. This is the north star for every build decision from here.

### 4.1 Two modes, one engine

The app serves two intents that share the same machinery.

- **Devotional mode.** The user meets God and themselves. The session ends with them knowing how to live differently. The fruit is formation.
- **Preparation mode.** The user builds a word to teach or preach. The session ends with a grounded, structured message in their voice. The fruit is a word for others.

The engine underneath is the same: capture, context, original language, connections, prayer. The path and the ending differ. The home screen lets the user say which they are doing today, or infers it and stays quiet.

### 4.2 The Study is the core object

The app is organised around Studies, not loose notes. A Study is a single journey around a theme or a passage. It holds its own notes, passages, word studies, connections, and through line. The user names it. "Strength for the Stretch" is one Study.

This replaces the flat list. Notes no longer float. They live inside the Study they belong to. The Study is the folder the user chooses. The Study is also the unit Phase 3 formats into a word.

This is the foundation, not a preference:

- It matches how revelation forms. A word builds over days, across passages. The container is shaped like the real thing.
- It makes the workflow real. The eleven steps stop being a document and become the spine the user walks.
- It gives progressive disclosure a home. Because the Study knows which step the user is on, the app knows which door to offer.

### 4.3 Progressive disclosure: calm by default, depth one tap away

The app never shows every tool at once. It shows the next meaningful thing for where the user is. The study principles appear as quiet offers at the exact moment they matter, then step back.

When each door appears:

| Workflow moment | The offer that appears |
|---|---|
| Anchor passage set | "Want the background. Who wrote this, when, and to whom." |
| A word carries weight | "This word is deeper in the original. Look." One line of Greek or Hebrew, then gone. |
| A key word is in focus | "This word first appears in Genesis. Trace it to its root." (first mention) |
| Two passages in play | "These may connect. Build the through line." |
| Notes are gathering | "Ready to shape this into a word." (enters the Phase 3 flow) |

The user never meets a menu of seven features. The user meets a path with doors. The depth is always available and never in the way. The app decides when the door appears. It never decides whether the user goes deep.

### 4.4 The surfaces that make it a companion

- **The first screen is the whole product.** Lowest barrier to entry means the empty state is designed with the most care. A new user sees one clear, warm way in. Not a blank list and a plus button.
- **Re-entry across days.** The user studies in pockets of time. The app holds the thread and welcomes the user back to where they were and the next step. Returning is a designed moment.
- **The personal thread is the moat.** The app holds every Study the user has ever done. Over time it can notice a theme returning and offer the earlier thread. No other app can, because no other app is built for one person.
- **Context must be trusted.** The moment the app states who wrote a book and why, the user is trusting it. Context shows its source. Invented history would destroy the app's authority. This forces context to be curated and bundled, which suits offline use anyway.
- **The ending must land.** The workflow closes in prayer, which is the user's and not the app's. The app hands that moment over with weight. No confetti. A still, deliberate close.

### 4.5 Positioning: why this is not another Bible app

Every Bible app has already won a territory. Logos owns depth and charges a wall of complexity for it. YouVersion owns reach and hands everyone the same plan. He Reads Truth owns beauty and hands the user content that is theirs. Blue Letter Bible owns the free interlinear and feels like a dictionary. Lectio and Dwell own the gentle guided session with fixed content for everyone.

None of them run a process on what the user brings and give it back as theirs. They are libraries to search or content to consume.

This app is built for one person, and that is the whole moat.

- A guide, not a library. It walks the user to the question instead of waiting for it.
- The user's path, not everyone's plan. It forms around what God is stirring in the user now.
- The user excavates, the user does not consume. It hands back the user's own revelation, grounded.
- Depth with a door, not a wall. The same scholarship, surfaced one tap at a time.
- It remembers the user's walk. It brings back the thread when a theme returns.

In one line: every Bible app is built for everyone. This one is built for the user. It does not give the user the word. It walks with the user until the word is theirs, then gives the user back to God.

It competes on a different axis. Not library size. Not reach. Intimacy and process, where the giants are too big to follow.

### 4.6 Honest constraints to design within

- **Haptics.** iOS Safari and iOS PWAs cannot trigger the Taptic engine. `navigator.vibrate` does nothing on iPhone. Feedback on iPhone comes from motion, timing, and optional sound. Responsive touch, satisfying transitions, a clean settle when a step completes. True buzz feedback is off the table while this is a PWA.
- **Aesthetic.** The He Reads Truth standard is typography, whitespace, restraint, and strong imagery. All achievable with the current stack. No framework or build step required. Maps and infographics are static assets, made or sourced public domain.
- **Context content is the real work.** Book level who, when, and why is sourceable from public domain material. Per passage context and teaching maps are curation, not a download. This is where the genuine effort goes, and where the app earns the gap the others leave.

### 4.7 The app is a harness

The app does not need to be intelligent. It needs to make borrowed intelligence reliable. Claude can already produce a sound, clear word. The reference session proves it (`reference-session-strength-for-the-stretch.md`). The problem is that it only happens when the right questions are asked in the right order, it sprawls, and it differs every time. Brilliance once is not the goal. Brilliance every time, fast, is. The app is the harness that makes the process run the same excellent way every time.

The app is the desk and the frame. Claude is the engine it drives. This is why it works on a single user budget with no paid API: the value is the harness, not the intelligence. The app builds the prompt, the user runs it through the Claude he already pays for, the app captures the result back into the structure. See the AI and budget path in 4.6.

The harness holds three things a raw chat cannot:

- **The spine.** The proven study sequence, made visible, moved along in order so nothing is skipped.
- **The gold ledger.** A first class place that captures the user's own words and lines as they appear, kept separate, so his revelation accumulates where he can see it. No other Bible tool has this. It is what protects "His".
- **The steer.** At each step the app hands the user the right prompt to take to Claude, then catches what returns.

The proven spine, drawn from the reference session:

1. Excavate the raw heart, unfiltered.
2. Find the thesis. Catch the one line that is the heartbeat.
3. Set the anchor and the case it builds.
4. Per passage: context (who, to whom, placement, immediate verses, key original words), original language sparingly, first mention where it earns its place, develop the user's own insight by testing it against the text, connect to the through line.
5. Gather illustrations from the user's world.
6. Build the close. The examination questions.
7. Shape into a flowing word in the user's voice.
8. Refine to the least words.
9. Pray. The user's.

Two constants run under every step: the reflect and sharpen loop (receive a raw thought, reflect it back clean, name the thread, sharpen, ask one question, wait), and the gold ledger.

### 4.8 The standard: Sound, Clear, His, Fast

A prepared word is excellent when it is:

- **Sound.** Grounded in correct handling of the text. The doctrine holds.
- **Clear.** The hearer receives it plainly. It lands in the room.
- **His.** It carries the user's voice, revelation, and illustrations. The fingerprints are his.
- **Fast.** Produced in the shortest time that still passes the first three.

Order matters. Fast is the servant, never the master. Speed is the pressure that kills ownership, because the quickest path to a sound, clear word is to let the machine write all of it. "His" stands guard over "Fast". If raw speed ever competes with sound, clear, or his, the first three win.

Every feature answers to this standard. If a feature does not make a word more sound, more clear, more his, or faster to reach without weakening the others, it is the wrong feature.

The measures are gates at the relevant step, not a vibe:

- Sound is checked while studying each passage. Is every claim grounded in the text.
- His is checked at the gold ledger and again at shaping. Is each line the user's or the machine's.
- Clear is checked at refine. Least words, declarative, the illustration carrying the weight.
- Fast is the clock across the run, allowed to push only after the other gates pass.

Resonance (whether the word moves the room, not only whether it is understood) is held as a question, not a fifth rule. It is mostly what results when a word is truly his and truly clear. It earns its own line only if words that are sound, clear, his, and fast still come out flat.

The two modes are measured differently. The preparation standard is Sound, Clear, His, Fast. A devotion is measured by formation: did the user meet God, were they changed, do they know how to live it now. Neither standard bends the other.

---

## 5. Voice and Output Requirements

The formatting engine (Phase 3) must produce words that sound like the user preaching, not like an essay. **These rules also apply to all generated text and to documentation in this repo.**

- **Declarative.** Lead with clear declarative statements and build momentum. State the point directly.
- **No "it is A not B" constructions.** Say the point cleanly. Avoid framing a point by first naming its opposite.
- **Concise.** Use the least number of words that express an idea clearly. A strong phrase carries the weight; do not over explain it.
- **Illustrations as rhetorical scenarios.** Rather than direct rhetorical questions, give a scenario or image that lets people arrive at the answer themselves.
- **Original language used sparingly in output.** Greek and Hebrew inform understanding. In the spoken word, only name a term when the meaning is powerful enough to justify it (for example "the Greek word for patience means long fire"). One line, then move.
- **Translations:** ESV for reading. AMP or AMPC when going deeper or when a translation surfaces a phrase the ESV does not. The tool should let him compare a verse across translations and pull a specific phrase from one.

**General writing conventions (apply across the app, generated text, and docs):**
- UK spelling.
- Avoid dashes. Use full stops, colons, and restructured sentences instead.
- Short sentences. Active voice. No filler.
- Concrete story or image before the lesson where possible.

---

## 6. Features by Phase

### Phase 1 — Core (DONE, shipped and verified on device 2026-06-04)
- Note organiser with passage tagging. Capture raw notes and attach them to specific scriptures.
- Scripture cross reference linking. Connect verses to build a through line. View notes and links attached to a passage.
- Persistent storage on the device. Nothing lost between sessions. Backup export and restore.
- Book name auto-complete on passage entry. Swipe a card left to delete.

### Phase 1.5 — The Experience Restructure (NEXT)
This is the pivot from a notes app to a guided companion. See section 4 for the full blueprint.
- Introduce the Study as the core object. Notes, passages, word studies, and links live inside a Study the user names.
- Rebuild the home around Studies, with a designed empty state and a calm way in.
- Re-entry: bring the user back to where they left off and the next step.
- Progressive disclosure shell: the workflow becomes the spine, with doors that appear at the right moment rather than a menu of features.
- Two modes on one engine: devotional and preparation.

### Phase 2 — Language Study (word study exists; deepen and integrate)
- Word study lookup already ships (search a term, for example agape). Integrate it into the Study flow so it surfaces as a door, not a separate dictionary.
- Original language lookup per verse (Hebrew, Greek, Aramaic).
- Root word definitions and how the word is used elsewhere in scripture.
- Principle of first mention support: trace a word to its first appearance.
- Book and passage context (who, when, why, how) with visible sources. Infographics and maps as static, curated assets.

### Phase 3 — Message Formatting
- An assistant that takes raw notes and structures them into a flowing word in the user's voice, following all rules in section 5.
- Iterative refinement: condense, re-tone, lock versions.
- Always preserves the user's original insights and illustrations rather than overwriting them.

---

## 7. Scripture and Language Data (licensing — important)

- **ESV** has an official API but its licensing terms limit how much text can be stored and displayed. Check current terms before building around it.
- **AMP and AMPC** are copyrighted (Lockman Foundation). They cannot be freely embedded. Plan for either licensed API access or manual entry of the specific passages being worked on.
- **Original language and Strong's data** are available from open sources (public domain Strong's, open morphology datasets for the Hebrew and Greek texts). These are the safe foundation for the Phase 2 language features.
- Design the data layer so a translation is a pluggable source. Where a translation cannot be embedded for licensing reasons, allow the user to paste the passage.

---

## 8. Non Goals and Guardrails

- It does not write sermons from a prompt. It develops what the user brings.
- It does not replace reading, study, or prayer.
- It does not flatten his voice into a generic style.
- It does not present original language vocabulary as a substitute for clear teaching.
- It does not embed copyrighted translations in a way that breaches their terms.

---

## 9. Reference Example

The first full word built using this workflow was an intercession message titled "Strength for the Stretch", built from four passages (Isaiah 40:28-31, Galatians 5:22, 2 Corinthians 12:7-10, Hebrews 12:1-3) closing on 1 John 5:14-15. It moved through a loop: where we are going, how we assess ourselves, why we go through it, who sustains us. That session is the working model of what a finished output looks like and how the workflow should feel.
