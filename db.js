/*
 * Local on-device storage for Bible Study.
 * Everything lives in the browser's IndexedDB on this phone. Nothing leaves the device.
 *
 * Three stores:
 *   notes     { id, body, passageId|null, createdAt, updatedAt }
 *   passages  { id, ref, createdAt }
 *   links     { id, passageA, passageB, note, createdAt }   (a connection between two passages)
 */

const DB_NAME = 'bible-study';
const DB_VERSION = 1;
let _db = null;

function _open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('notes')) db.createObjectStore('notes', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('passages')) db.createObjectStore('passages', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('links')) db.createObjectStore('links', { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function _p(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function _store(name, mode) {
  return _db.transaction(name, mode).objectStore(name);
}

function _makeStore(name) {
  return {
    add: (obj) => _p(_store(name, 'readwrite').add(obj)),
    put: (obj) => _p(_store(name, 'readwrite').put(obj)),
    get: (id) => _p(_store(name, 'readonly').get(id)),
    getAll: () => _p(_store(name, 'readonly').getAll()),
    delete: (id) => _p(_store(name, 'readwrite').delete(id)),
    clear: () => _p(_store(name, 'readwrite').clear()),
  };
}

const DB = {
  ready: null,
  notes: null,
  passages: null,
  links: null,

  uid() {
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  },

  async init() {
    _db = await _open();
    this.notes = _makeStore('notes');
    this.passages = _makeStore('passages');
    this.links = _makeStore('links');
    // Ask iOS to keep this data and not evict it when storage is tight.
    if (navigator.storage && navigator.storage.persist) {
      try { await navigator.storage.persist(); } catch (_) {}
    }
    return this;
  },

  async exportAll() {
    const [notes, passages, links] = await Promise.all([
      this.notes.getAll(), this.passages.getAll(), this.links.getAll(),
    ]);
    return { app: 'bible-study', version: 1, exportedAt: new Date().toISOString(), notes, passages, links };
  },

  async importAll(data) {
    if (!data || data.app !== 'bible-study') throw new Error('This file is not a Bible Study backup.');
    await Promise.all([this.notes.clear(), this.passages.clear(), this.links.clear()]);
    for (const n of (data.notes || [])) await this.notes.put(n);
    for (const p of (data.passages || [])) await this.passages.put(p);
    for (const l of (data.links || [])) await this.links.put(l);
  },
};

DB.ready = DB.init();
window.DB = DB;
