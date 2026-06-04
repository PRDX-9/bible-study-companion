# Decisions Log

An append-only record of the calls that shape this project, and why. Newest at the top. A returning agent reads this so settled questions are not relitigated. For deeper rationale on the product itself, see `docs/PROJECT-CONTEXT.md`. For how to work in the code, see `AGENTS.md`.

---

## 2026-06-04 — Pivot from a notes app to a guided companion

**Decision.** The app stops being a flat collection of notes and passages. It becomes a guided study companion. The core object is the **Study**: a single journey around a theme or passage that holds its own notes, passages, word studies, links, and through line. The study workflow becomes the spine, and study principles (first mention, original language, context) surface through progressive disclosure, calm by default with depth one tap away. The app runs two modes on one engine: devotional (formation) and preparation (a word for others).

**Why.** The app felt like a notes app because its structure was a notes app. A flat list cannot feel like a journey. The Study matches how revelation actually forms over days and across passages, makes the documented workflow real, and gives progressive disclosure a home because the Study knows which step the user is on. It also gives Phase 3 a bounded unit to format.

**Positioning.** Built for one person, which is the whole moat. A guide, not a library (Logos). The user's path, not everyone's plan (YouVersion). The user excavates, the user does not consume (He Reads Truth). Depth with a door, not a wall. It remembers the user's walk.

**Consequence.** Next build is Phase 1.5, the experience restructure, starting with the first screen and empty state. Full detail in `docs/PROJECT-CONTEXT.md` section 4.

---

## 2026-06-04 — Phase 1 shipped and verified on device

**Decision.** Phase 1 is done: notes, passage tags, links, on-device persistence, backup export and restore, book auto-complete, swipe-to-delete. Installed as a home-screen PWA and verified on the user's iPhone.

**Why.** Establishes the working loop and the on-device, no-build, single-user foundation before adding depth.

---

## Earlier foundational decisions

These were made while building Phase 1. Full reasoning lives in `AGENTS.md` under "Decisions and why".

- **On-device storage, not a server.** Local-first is non-negotiable. Privacy, ownership, offline. Backup export is the safety net.
- **PWA, not native iOS.** The user studies on his phone but develops on Windows with no Mac. A home-screen PWA gives an app-like experience with no Apple toolchain.
- **GitHub Pages, public repo.** Free accounts serve Pages only from public repos. The app shell holds no personal data, so public is fine.
- **No build step, no framework, no dependencies.** Lowest friction to ship and run. Plain HTML, CSS, vanilla JS.
- **Service worker network-first for navigation.** Updates reach the installed app without a reinstall, while still working offline.
