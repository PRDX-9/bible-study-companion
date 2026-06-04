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

## 4. Voice and Output Requirements

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

## 5. Features by Phase

### Phase 1 — Core (DONE, shipped and verified on device 2026-06-04)
- Note organiser with passage tagging. Capture raw notes and attach them to specific scriptures.
- Scripture cross reference linking. Connect verses to build a through line. View notes and links attached to a passage.
- Persistent storage on the device. Nothing lost between sessions. Backup export and restore.
- Book name auto-complete on passage entry. Swipe a card left to delete.

### Phase 2 — Language Study (NEXT)
- Original language lookup per verse (Hebrew, Greek, Aramaic).
- Root word definitions and how the word is used elsewhere in scripture.
- Principle of first mention support: trace a word to its first appearance.

### Phase 3 — Message Formatting
- An assistant that takes raw notes and structures them into a flowing word in the user's voice, following all rules in section 4.
- Iterative refinement: condense, re-tone, lock versions.
- Always preserves the user's original insights and illustrations rather than overwriting them.

---

## 6. Scripture and Language Data (licensing — important)

- **ESV** has an official API but its licensing terms limit how much text can be stored and displayed. Check current terms before building around it.
- **AMP and AMPC** are copyrighted (Lockman Foundation). They cannot be freely embedded. Plan for either licensed API access or manual entry of the specific passages being worked on.
- **Original language and Strong's data** are available from open sources (public domain Strong's, open morphology datasets for the Hebrew and Greek texts). These are the safe foundation for the Phase 2 language features.
- Design the data layer so a translation is a pluggable source. Where a translation cannot be embedded for licensing reasons, allow the user to paste the passage.

---

## 7. Non Goals and Guardrails

- It does not write sermons from a prompt. It develops what the user brings.
- It does not replace reading, study, or prayer.
- It does not flatten his voice into a generic style.
- It does not present original language vocabulary as a substitute for clear teaching.
- It does not embed copyrighted translations in a way that breaches their terms.

---

## 8. Reference Example

The first full word built using this workflow was an intercession message titled "Strength for the Stretch", built from four passages (Isaiah 40:28-31, Galatians 5:22, 2 Corinthians 12:7-10, Hebrews 12:1-3) closing on 1 John 5:14-15. It moved through a loop: where we are going, how we assess ourselves, why we go through it, who sustains us. That session is the working model of what a finished output looks like and how the workflow should feel.
