# Bible Study

A personal, phone-first Bible study companion. It excavates the word. It does not dictate it.

Built for one user. No accounts. No sharing. Notes live on the device.

> **Working on this project (human or AI)?** Read [`AGENTS.md`](AGENTS.md) for how to work in the code, then [`docs/PROJECT-CONTEXT.md`](docs/PROJECT-CONTEXT.md) for the vision, philosophy, workflow, and voice rules. All context lives in the repo so any model can pick it up.

## What Phase 1 does

- Capture a note (a theme, a fragment, a verse on your heart).
- Tag a note to a passage (e.g. Isaiah 40:28-31).
- Link two passages together to start building a through line.
- Everything persists on the device, with one-tap backup export and restore.

## How it runs

Plain web files. No build step, no framework, no server for your data.

- The app shell is static HTML, CSS, and JavaScript.
- Your study is stored on the device in the browser's IndexedDB. Nothing leaves the phone.
- It installs to the iPhone home screen as a PWA (its own icon, full screen).

## Getting it on the phone

A home-screen PWA needs to be served once over HTTPS so iOS will install it.

1. Host these static files at any free static host (the app shell only — no personal data is in here).
2. Open that address in Safari on the iPhone.
3. Share > Add to Home Screen.
4. After that it is just an icon you tap. Your notes stay on the device.

## Local preview (desktop, for development)

Serve the folder over HTTP (a service worker will not run from a `file://` path):

```
npx serve .
```

Then open the printed `http://localhost` address.

## Roadmap

- **Phase 1 (this):** notes, passage tags, links, persistence, backup.
- **Phase 2:** original language lookup (Strong's, open morphology), root words, principle of first mention.
- **Phase 3:** message formatting assistant in the user's voice, iterative refinement, locked versions.

## Data and licensing notes

- ESV: official API, storage/display limited by licence. Check terms before embedding.
- AMP / AMPC: copyrighted (Lockman). Not freely embeddable. Paste passages, or use licensed access.
- Strong's and open morphology datasets are the safe foundation for Phase 2.
- The data layer treats a translation as a pluggable source.
