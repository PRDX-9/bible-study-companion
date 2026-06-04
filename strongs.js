/* Strong's dictionary lookup.
 * Data stays local to the app shell and loads only when the word study sheet asks for it.
 */

(function () {
  let dataPromise = null;

  function normaliseText(value) {
    return (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{N}\s'-]/gu, '')
      .replace(/\s+/g, ' ');
  }

  function normaliseNumber(value) {
    const raw = (value || '').toString().trim().toUpperCase();
    const match = raw.match(/^([HG])?\s*0*(\d+)$/);
    if (!match) return raw.replace(/\s+/g, '');
    if (!match[1]) return raw.replace(/\s+/g, '');
    return match[1] + String(Number(match[2]));
  }

  async function loadData() {
    if (!dataPromise) {
      dataPromise = Promise.all([
        fetch('./data/strongs-hebrew.json?v=4').then((r) => r.json()),
        fetch('./data/strongs-greek.json?v=4').then((r) => r.json()),
      ]).then(([hebrew, greek]) => ({ hebrew, greek, all: Object.assign({}, hebrew, greek) }));
    }
    return dataPromise;
  }

  function formatEntry(number, entry) {
    return {
      number,
      language: number[0] === 'H' ? 'Hebrew' : 'Greek',
      lemma: entry.lemma || '',
      transliteration: entry.xlit || entry.translit || '',
      pronunciation: entry.pron || '',
      derivation: entry.derivation || '',
      definition: entry.strongs_def || '',
      kjv: entry.kjv_def || '',
    };
  }

  async function lookupNumber(number) {
    const data = await loadData();
    const key = normaliseNumber(number);
    if (data.all[key]) return formatEntry(key, data.all[key]);
    return null;
  }

  async function lookup(word) {
    const data = await loadData();
    const query = normaliseText(word);
    if (!query) return [];

    const direct = await lookupNumber(word);
    if (direct) return [direct];

    return Object.entries(data.all)
      .map(([number, entry]) => {
        const fields = [
          entry.lemma,
          entry.xlit,
          entry.translit,
          entry.pron,
          entry.strongs_def,
          entry.kjv_def,
        ].map(normaliseText);
        const haystack = fields.join(' ');
        let score = 0;
        if (fields.some((field) => field === query)) score = 3;
        else if (fields.some((field) => field.startsWith(query))) score = 2;
        else if (haystack.includes(query)) score = 1;
        return { number, entry, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.number.localeCompare(b.number, undefined, { numeric: true }))
      .slice(0, 25)
      .map(({ number, entry }) => formatEntry(number, entry));
  }

  window.STRONGS = { lookup, lookupNumber };
})();
