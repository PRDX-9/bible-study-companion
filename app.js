/* Bible Study — Phase 1 app logic.
 * Views: Notes and Passages. Create notes, tag them to a passage,
 * link two passages, and everything persists on the device.
 */

let currentView = 'notes';

/* ---------- helpers ---------- */

function $(sel) { return document.querySelector(sel); }

function escapeHtml(s) {
  return (s || '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (_) { return ''; }
}

function normRef(ref) { return (ref || '').trim().replace(/\s+/g, ' '); }

/* Find a passage by its reference text (case-insensitive), or create it. Returns the passage. */
async function findOrCreatePassage(refText) {
  const ref = normRef(refText);
  if (!ref) return null;
  const all = await DB.passages.getAll();
  const found = all.find((p) => p.ref.toLowerCase() === ref.toLowerCase());
  if (found) return found;
  const passage = { id: DB.uid(), ref, createdAt: new Date().toISOString() };
  await DB.passages.add(passage);
  return passage;
}

/* Remove a passage and tidy up after it: untag its notes, drop its links. */
async function deletePassageCascade(id) {
  const [notes, links] = await Promise.all([DB.notes.getAll(), DB.links.getAll()]);
  for (const n of notes) if (n.passageId === id) { n.passageId = null; await DB.notes.put(n); }
  for (const l of links) if (l.passageA === id || l.passageB === id) await DB.links.delete(l.id);
  await DB.passages.delete(id);
}

/* Swipe a card left to delete it. onDelete runs on a decisive swipe and returns
 * true if the item was removed (so the card can stay gone) or false to snap back. */
function attachSwipeToDelete(card, onDelete) {
  let startX = 0, startY = 0, dx = 0, dragging = false, decided = false, horizontal = false;
  card.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    dx = 0; dragging = true; decided = false; horizontal = false;
    card.style.transition = 'none';
  }, { passive: true });
  card.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const ddx = e.touches[0].clientX - startX;
    const ddy = e.touches[0].clientY - startY;
    if (!decided) { decided = true; horizontal = Math.abs(ddx) > Math.abs(ddy) + 4; }
    if (!horizontal) return;
    dx = Math.min(0, ddx);
    card.style.transform = `translateX(${dx}px)`;
    card.classList.toggle('swiping', dx < -10);
    e.preventDefault();
  }, { passive: false });
  function end() {
    if (!dragging) return;
    dragging = false;
    card.style.transition = 'transform 0.18s ease';
    if (dx < -70) {
      Promise.resolve(onDelete()).then((ok) => {
        if (!ok) { card.style.transform = 'translateX(0)'; card.classList.remove('swiping'); }
      });
    } else {
      card.style.transform = 'translateX(0)';
      card.classList.remove('swiping');
    }
  }
  card.addEventListener('touchend', end);
  card.addEventListener('touchcancel', end);
}

/* ---------- sheets ---------- */

function openSheet(title, bodyHtml) {
  const sheet = $('#sheet');
  sheet.innerHTML = `
    <div class="sheet-head">
      <button class="link-btn muted" id="sheetClose">Close</button>
      <h2 class="sheet-title">${escapeHtml(title)}</h2>
      <span style="width:48px"></span>
    </div>
    <div class="sheet-body">${bodyHtml}</div>`;
  $('#sheetBackdrop').classList.remove('hidden');
  sheet.classList.remove('hidden');
  $('#sheetClose').addEventListener('click', closeSheet);
}

function closeSheet() {
  $('#sheet').classList.add('hidden');
  $('#sheetBackdrop').classList.add('hidden');
  $('#sheet').innerHTML = '';
}

/* ---------- Notes view ---------- */

async function renderNotes() {
  const list = $('#notesList');
  const notes = (await DB.notes.getAll()).sort((a, b) => (b.updatedAt || b.createdAt).localeCompare(a.updatedAt || a.createdAt));
  const passages = await DB.passages.getAll();
  const refById = Object.fromEntries(passages.map((p) => [p.id, p.ref]));

  $('#notesEmpty').classList.toggle('hidden', notes.length > 0);
  list.innerHTML = '';
  for (const n of notes) {
    const card = document.createElement('div');
    card.className = 'card';
    const tag = n.passageId && refById[n.passageId]
      ? `<span class="tag">${escapeHtml(refById[n.passageId])}</span>` : '';
    card.innerHTML = `
      ${tag}
      <div class="note-body note-preview">${escapeHtml(n.body) || '<span class="mini">(empty)</span>'}</div>
      <div class="meta">${fmtDate(n.updatedAt || n.createdAt)}</div>`;
    card.addEventListener('click', () => openNoteSheet(n));
    attachSwipeToDelete(card, async () => {
      if (!confirm('Delete this note? This cannot be undone.')) return false;
      await DB.notes.delete(n.id);
      await refresh();
      return true;
    });
    list.appendChild(card);
  }
}

async function openNoteSheet(existing) {
  const passages = await DB.passages.getAll();
  const currentRef = existing && existing.passageId
    ? (passages.find((p) => p.id === existing.passageId) || {}).ref || '' : '';
  const body = `
    <label class="field">
      <span class="lbl">The thought, fragment, or rough notes</span>
      <textarea class="text" id="noteBody" placeholder="A theme, a feeling, a verse on your heart...">${escapeHtml(existing ? existing.body : '')}</textarea>
    </label>
    <label class="field">
      <span class="lbl">Passage (optional)</span>
      <input class="text" id="notePassage" placeholder="e.g. Isaiah 40:28-31" value="${escapeHtml(currentRef)}" autocapitalize="words" />
    </label>
    <button class="btn primary" id="noteSave">${existing ? 'Save changes' : 'Save note'}</button>
    ${existing ? '<button class="btn danger" id="noteDelete">Delete note</button>' : ''}`;
  openSheet(existing ? 'Edit note' : 'New note', body);
  attachBookAutocomplete($('#notePassage'));

  $('#noteSave').addEventListener('click', async () => {
    const text = $('#noteBody').value.trim();
    const refText = $('#notePassage').value;
    if (!text && !normRef(refText)) { closeSheet(); return; }
    const passage = await findOrCreatePassage(refText);
    const now = new Date().toISOString();
    if (existing) {
      existing.body = text;
      existing.passageId = passage ? passage.id : null;
      existing.updatedAt = now;
      await DB.notes.put(existing);
    } else {
      await DB.notes.add({ id: DB.uid(), body: text, passageId: passage ? passage.id : null, createdAt: now, updatedAt: now });
    }
    closeSheet();
    await refresh();
  });

  if (existing) {
    $('#noteDelete').addEventListener('click', async () => {
      if (!confirm('Delete this note? This cannot be undone.')) return;
      await DB.notes.delete(existing.id);
      closeSheet();
      await refresh();
    });
  }
}

/* ---------- Passages view ---------- */

async function renderPassages() {
  const list = $('#passagesList');
  const passages = (await DB.passages.getAll()).sort((a, b) => a.ref.localeCompare(b.ref));
  const notes = await DB.notes.getAll();
  const links = await DB.links.getAll();

  $('#passagesEmpty').classList.toggle('hidden', passages.length > 0);
  list.innerHTML = '';
  for (const p of passages) {
    const noteCount = notes.filter((n) => n.passageId === p.id).length;
    const linkCount = links.filter((l) => l.passageA === p.id || l.passageB === p.id).length;
    const card = document.createElement('div');
    card.className = 'card passage-card';
    card.innerHTML = `
      <span class="passage-ref">${escapeHtml(p.ref)}</span>
      <span class="passage-counts">${noteCount} note${noteCount === 1 ? '' : 's'}<br>${linkCount} link${linkCount === 1 ? '' : 's'}</span>`;
    card.addEventListener('click', () => openPassageSheet(p));
    attachSwipeToDelete(card, async () => {
      if (!confirm('Delete this passage? Its notes lose their tag and its links are removed.')) return false;
      await deletePassageCascade(p.id);
      await refresh();
      return true;
    });
    list.appendChild(card);
  }
}

async function openNewPassageSheet() {
  const body = `
    <label class="field">
      <span class="lbl">Passage reference</span>
      <input class="text" id="newPassageRef" placeholder="e.g. Hebrews 12:1-3" autocapitalize="words" />
    </label>
    <button class="btn primary" id="newPassageSave">Add passage</button>`;
  openSheet('New passage', body);
  attachBookAutocomplete($('#newPassageRef'));
  $('#newPassageSave').addEventListener('click', async () => {
    const ref = normRef($('#newPassageRef').value);
    if (!ref) { closeSheet(); return; }
    await findOrCreatePassage(ref);
    closeSheet();
    await refresh();
  });
}

async function openPassageSheet(passage) {
  const [notes, passages, links] = await Promise.all([
    DB.notes.getAll(), DB.passages.getAll(), DB.links.getAll(),
  ]);
  const refById = Object.fromEntries(passages.map((p) => [p.id, p.ref]));
  const myNotes = notes.filter((n) => n.passageId === passage.id);
  const myLinks = links.filter((l) => l.passageA === passage.id || l.passageB === passage.id);

  const notesHtml = myNotes.length
    ? myNotes.map((n) => `<div class="card" style="margin-bottom:8px"><div class="note-body note-preview">${escapeHtml(n.body) || '<span class="mini">(empty)</span>'}</div></div>`).join('')
    : '<p class="mini">No notes attached yet.</p>';

  const linksHtml = myLinks.length
    ? myLinks.map((l) => {
        const otherId = l.passageA === passage.id ? l.passageB : l.passageA;
        const note = l.note ? `<div class="mini">${escapeHtml(l.note)}</div>` : '';
        return `<div class="card" style="margin-bottom:8px"><span class="passage-ref">${escapeHtml(refById[otherId] || '?')}</span>${note}</div>`;
      }).join('')
    : '<p class="mini">No connections yet.</p>';

  const body = `
    <button class="btn ghost" id="addNoteHere">Add a note on this passage</button>
    <button class="btn ghost" id="linkPassage">Link to another passage</button>
    <button class="btn ghost" id="wordStudy">Word Study</button>

    <div class="detail-section">
      <h3>Notes</h3>
      ${notesHtml}
    </div>
    <div class="detail-section">
      <h3>Through line</h3>
      ${linksHtml}
    </div>
    <div class="divider"></div>
    <button class="btn danger" id="deletePassage">Delete passage</button>`;
  openSheet(passage.ref, body);

  $('#addNoteHere').addEventListener('click', async () => {
    closeSheet();
    await openPrefilledNote(passage);
  });

  $('#linkPassage').addEventListener('click', () => openLinkSheet(passage));
  $('#wordStudy').addEventListener('click', () => openWordStudySheet(passage));

  $('#deletePassage').addEventListener('click', async () => {
    if (!confirm('Delete this passage? Notes attached to it will lose their tag, and its links will be removed.')) return;
    await deletePassageCascade(passage.id);
    closeSheet();
    await refresh();
  });
}

function renderStrongEntry(entry) {
  const derivation = entry.derivation ? `<p class="mini"><strong>Derived from:</strong> ${escapeHtml(entry.derivation)}</p>` : '';
  const kjv = entry.kjv ? `<p class="mini"><strong>KJV renderings:</strong> ${escapeHtml(entry.kjv)}</p>` : '';
  return `
    <div class="card strongs-card">
      <div class="strongs-head">
        <span class="tag">${escapeHtml(entry.number)} ${escapeHtml(entry.language)}</span>
        <span class="strongs-lemma">${escapeHtml(entry.lemma)}</span>
      </div>
      <p class="mini">${escapeHtml(entry.transliteration)}${entry.pronunciation ? `, ${escapeHtml(entry.pronunciation)}` : ''}</p>
      <p class="strongs-def">${escapeHtml(entry.definition) || '<span class="mini">(no definition)</span>'}</p>
      ${derivation}
      ${kjv}
    </div>`;
}

function renderStrongResults(results, query) {
  const host = $('#strongsResults');
  if (!query) {
    host.innerHTML = '<p class="mini">Search by Strong\'s number, Greek word, Hebrew word, or transliteration.</p>';
    return;
  }
  if (!results.length) {
    host.innerHTML = '<p class="mini">No entry found.</p>';
    return;
  }
  host.innerHTML = results.map(renderStrongEntry).join('');
}

async function openWordStudySheet(passage) {
  const body = `
    <p class="mini">Look up a Strong's number or original word for ${escapeHtml(passage.ref)}.</p>
    <label class="field">
      <span class="lbl">Word or Strong's number</span>
      <input class="text" id="strongsQuery" placeholder="e.g. H6960, G26, agape" autocapitalize="none" />
    </label>
    <button class="btn primary" id="strongsSearch">Look up word</button>
    <div class="detail-section" id="strongsResults">
      <p class="mini">Search by Strong's number, Greek word, Hebrew word, or transliteration.</p>
    </div>
    <div class="divider"></div>
    <p class="mini">Strong's gives a starting point. Check context before drawing a conclusion.</p>`;
  openSheet('Word Study', body);

  async function search() {
    const query = $('#strongsQuery').value.trim();
    const host = $('#strongsResults');
    if (!query) { renderStrongResults([], ''); return; }
    host.innerHTML = '<p class="mini">Looking up word...</p>';
    try {
      const results = await STRONGS.lookup(query);
      renderStrongResults(results, query);
    } catch (_) {
      host.innerHTML = '<p class="mini">Could not load the dictionary.</p>';
    }
  }

  $('#strongsSearch').addEventListener('click', search);
  $('#strongsQuery').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') search();
  });
}

async function openPrefilledNote(passage) {
  const body = `
    <label class="field">
      <span class="lbl">The thought, fragment, or rough notes</span>
      <textarea class="text" id="noteBody" placeholder="A theme, a feeling, a verse on your heart..."></textarea>
    </label>
    <label class="field">
      <span class="lbl">Passage</span>
      <input class="text" id="notePassage" value="${escapeHtml(passage.ref)}" autocapitalize="words" />
    </label>
    <button class="btn primary" id="noteSave">Save note</button>`;
  openSheet('New note', body);
  attachBookAutocomplete($('#notePassage'));
  $('#noteSave').addEventListener('click', async () => {
    const text = $('#noteBody').value.trim();
    const p = await findOrCreatePassage($('#notePassage').value);
    if (!text && !p) { closeSheet(); return; }
    const now = new Date().toISOString();
    await DB.notes.add({ id: DB.uid(), body: text, passageId: p ? p.id : null, createdAt: now, updatedAt: now });
    closeSheet();
    await refresh();
  });
}

async function openLinkSheet(passage) {
  const passages = (await DB.passages.getAll()).filter((p) => p.id !== passage.id);
  const options = passages.map((p) => `<option value="${p.id}">${escapeHtml(p.ref)}</option>`).join('');
  const body = `
    <p class="mini">Connect <strong>${escapeHtml(passage.ref)}</strong> to another passage to build the through line.</p>
    <label class="field">
      <span class="lbl">Existing passage</span>
      <select class="text" id="linkTarget">
        <option value="">— choose —</option>
        ${options}
      </select>
    </label>
    <label class="field">
      <span class="lbl">Or type a new reference</span>
      <input class="text" id="linkNewRef" placeholder="e.g. 2 Corinthians 12:7-10" autocapitalize="words" />
    </label>
    <label class="field">
      <span class="lbl">The connection (optional)</span>
      <textarea class="text" id="linkNote" style="min-height:90px" placeholder="What ties these together?"></textarea>
    </label>
    <button class="btn primary" id="linkSave">Link passages</button>`;
  openSheet('Link passage', body);
  attachBookAutocomplete($('#linkNewRef'));

  $('#linkSave').addEventListener('click', async () => {
    let targetId = $('#linkTarget').value;
    const newRef = normRef($('#linkNewRef').value);
    if (!targetId && newRef) {
      const p = await findOrCreatePassage(newRef);
      targetId = p.id;
    }
    if (!targetId) { closeSheet(); return; }
    await DB.links.add({
      id: DB.uid(),
      passageA: passage.id,
      passageB: targetId,
      note: $('#linkNote').value.trim(),
      createdAt: new Date().toISOString(),
    });
    closeSheet();
    await refresh();
  });
}

/* ---------- Settings / backup ---------- */

async function openSettings() {
  const data = await DB.exportAll();
  const counts = `${data.notes.length} notes, ${data.passages.length} passages, ${data.links.length} links`;
  const body = `
    <p class="mini">Your study lives only on this device. Save a backup now and then so nothing is ever lost.</p>
    <div class="divider"></div>
    <p class="mini">Currently stored: ${counts}</p>
    <button class="btn primary" id="exportBtn">Export a backup</button>
    <label class="btn ghost" for="importFile" style="text-align:center">Restore from a backup</label>
    <input type="file" id="importFile" accept="application/json" style="display:none" />
    <div class="divider"></div>
    <p class="mini">Version 1 (Phase 1). Notes, passage tags, and links.</p>`;
  openSheet('Settings', body);

  $('#exportBtn').addEventListener('click', async () => {
    const fresh = await DB.exportAll();
    const blob = new Blob([JSON.stringify(fresh, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bible-study-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  $('#importFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!confirm('Restoring replaces everything currently in the app with the backup. Continue?')) return;
    try {
      const text = await file.text();
      await DB.importAll(JSON.parse(text));
      closeSheet();
      await refresh();
      alert('Backup restored.');
    } catch (err) {
      alert('Could not restore: ' + err.message);
    }
  });
}

/* ---------- view switching ---------- */

function switchView(view) {
  currentView = view;
  $('#view-notes').classList.toggle('hidden', view !== 'notes');
  $('#view-passages').classList.toggle('hidden', view !== 'passages');
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t.dataset.view === view));
}

async function refresh() {
  await Promise.all([renderNotes(), renderPassages()]);
}

/* ---------- wire up ---------- */

function wire() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });
  $('#fab').addEventListener('click', () => {
    if (currentView === 'notes') openNoteSheet(null);
    else openNewPassageSheet();
  });
  $('#settingsBtn').addEventListener('click', openSettings);
  $('#sheetBackdrop').addEventListener('click', closeSheet);
}

async function start() {
  await DB.ready;
  wire();
  switchView('notes');
  await refresh();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }
}

start();
