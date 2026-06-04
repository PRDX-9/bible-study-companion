# AGENTS.md — working guide for any AI agent on this project

This file is the operational guide. Any agent (Claude, Codex, Sonnet, or other) should read this first, then `docs/PROJECT-CONTEXT.md` for the product vision, philosophy, study workflow, and voice rules. This file is model-agnostic on purpose: all context needed to work well lives in the repo, not in any one tool's memory.

---

## What this is

A personal, phone-first Bible study app for one user (Unathi). It helps him prepare sermons and teachings. Core philosophy: **the tool excavates, it does not dictate.** It supports study, it never replaces his thinking, study, or prayer. Read `docs/PROJECT-CONTEXT.md` before adding features.

## Golden rules (do not break these)

1. **On-device only.** All user data (notes, passages, links) lives in the browser's IndexedDB on the user's phone. It never goes to a server. No accounts, no sync, no analytics, no third-party calls with user content.
2. **No build step, no framework, no dependencies.** Plain HTML, CSS, and vanilla JavaScript served as static files. Do not add npm, bundlers, React, or a package.json unless the user explicitly decides to. Simplicity is a feature.
3. **Single user.** No auth, no roles, no sharing. Build for one.
4. **Respect the philosophy.** If a feature risks making study lazy or shallow, it is the wrong feature. Support, never substitute.
5. **Follow the voice and writing rules** in `docs/PROJECT-CONTEXT.md` section 4 for any user-facing text and any generated word: UK spelling, avoid dashes, short declarative sentences, concise.

## Architecture

Static PWA. No server for app logic. Files:

| File | Role |
|------|------|
| `index.html` | App shell, markup, meta tags for iOS home-screen install |
| `styles.css` | All styling. Mobile-first. CSS variables at the top. Dark navy / parchment / gold theme |
| `db.js` | Storage layer over IndexedDB. Exposes `window.DB` with `notes`, `passages`, `links` stores plus `exportAll` / `importAll`. Requests persistent storage |
| `books.js` | The 66 books and `attachBookAutocomplete(input)` for passage entry |
| `app.js` | All UI logic: views, sheets (modals), rendering, swipe-to-delete, settings/backup |
| `service-worker.js` | Offline support. Caches the app shell. Network-first for page loads so updates land |
| `manifest.webmanifest` | PWA manifest (name, icons, standalone display) |
| `icons/` | Home-screen icons (open book on navy, generated) |

### Data model (IndexedDB, three object stores, keyPath `id`)

- `notes`: `{ id, body, passageId|null, createdAt, updatedAt }`
- `passages`: `{ id, ref, createdAt }` — `ref` is a string like `Isaiah 40:28-31`
- `links`: `{ id, passageA, passageB, note, createdAt }` — a connection between two passages

IDs are `crypto.randomUUID()`. Always escape user content with `escapeHtml()` before inserting into HTML.

## Conventions

- Match the surrounding code style: vanilla JS, small focused functions, `$(sel)` helper for `querySelector`, event listeners wired after rendering.
- Keep it dependency-free. If you think you need a library, prefer writing the small piece yourself.
- Comments explain why, not what. Keep them sparse and useful.
- UK spelling and the voice rules apply to UI strings too.

## How to run, test, and deploy

### Run locally
A service worker needs HTTP, not `file://`. Serve the folder over HTTP:

```
npx serve .
```

Then open the printed `http://localhost` address. (Any static server works.)

### Test
There is no automated test suite yet. Verify changes by exercising the real loop in a browser at a phone viewport (390x844): create a note, tag a passage (try auto-complete), link two passages, reload, confirm persistence, check the console for errors. A mobile viewport matters because this is phone-first.

### Deploy (GitHub Pages)
- Hosting: GitHub Pages, account **PRDX-9**, repo **github.com/PRDX-9/bible-study-companion**, public, served from branch **`master`**, path root.
- Live URL: **https://prdx-9.github.io/bible-study-companion/**
- To deploy: commit and `git push origin master`. Pages rebuilds in a minute or two.
- Only the app shell is public. No user data is ever in the repo.

### When you change cached assets
If you add or rename a JS/CSS file, update `service-worker.js`: add the file to `ASSETS` and bump `CACHE` (for example `bsc-v2` to `bsc-v3`). Otherwise phones may serve a stale shell.

### Backups
The Settings sheet (gear icon) exports all data as JSON and restores from it. Exported backups are personal data and are gitignored (`*-backup-*.json`). Never commit them.

## Current status

- **Phase 1: DONE and verified on the user's iPhone on 2026-06-04.** Notes, passage tags, links, on-device persistence, backup export/restore, book auto-complete, swipe-to-delete. Installed as a home-screen PWA.
- **Next: Phase 2 — language study.** Original language lookup (open-source Strong's plus open Hebrew/Greek morphology), root words, principle of first mention. Confirm scope with the user before building. Use only open/public-domain language data; do not embed copyrighted translations (see `docs/PROJECT-CONTEXT.md` section 6).

## Decisions and why (so a returning agent does not relitigate them)

- **On-device storage, not a server.** Local-first is a stated non-negotiable. Privacy, ownership, offline. Trade-off accepted: phone-centred, so backup/export is the safety net.
- **PWA, not native iOS.** The user studies on his phone, but develops on Windows with no Mac. Native iOS was impractical. A home-screen PWA gives an app-like experience with no Apple toolchain.
- **GitHub Pages, public repo.** Free accounts can only serve Pages from public repos. The app shell is generic and holds no personal data, so public is fine. Gives a permanent HTTPS URL and easy updates.
- **No build step.** Lowest friction to ship and to run. The user is not primarily a coder; the app must just work. Plain files keep it that way.
- **Service worker network-first for navigation.** So updates reach the installed app without a reinstall, while still working offline.
- **Branch is `master`** (created by `git init`), and Pages is configured to serve from it.
