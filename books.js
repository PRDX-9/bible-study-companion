/* The 66 books, in canonical order. Used for passage auto-complete so that
 * book names stay consistent (Isaiah is always "Isaiah"), which keeps linking
 * and finding passages reliable. */

const BIBLE_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew',
  'Mark', 'Luke', 'John', 'Acts', 'Romans',
  '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians',
  'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy',
  'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter',
  '2 Peter', '1 John', '2 John', '3 John', 'Jude',
  'Revelation',
];

/* Attach a book-name suggestion dropdown to a passage input.
 * Suggests while typing the book; gets out of the way once the book is set
 * and the user moves on to chapter and verse. */
function attachBookAutocomplete(input) {
  if (!input) return;

  const wrap = document.createElement('div');
  wrap.className = 'ac-wrap';
  input.parentNode.insertBefore(wrap, input);
  wrap.appendChild(input);

  const list = document.createElement('div');
  list.className = 'ac-list hidden';
  wrap.appendChild(list);

  function hide() { list.classList.add('hidden'); list.innerHTML = ''; }

  function update() {
    const v = input.value.trim();
    if (!v) { hide(); return; }
    const low = v.toLowerCase();
    // Past the book already (typed "Isaiah ..." with a space after a full book).
    if (BIBLE_BOOKS.some((b) => low.startsWith(b.toLowerCase() + ' '))) { hide(); return; }
    const matches = BIBLE_BOOKS.filter((b) => b.toLowerCase().startsWith(low)).slice(0, 6);
    const exact = matches.length === 1 && matches[0].toLowerCase() === low;
    if (matches.length === 0 || exact) { hide(); return; }
    list.innerHTML = matches
      .map((b) => `<button type="button" class="ac-item" data-book="${b}">${b}</button>`)
      .join('');
    list.classList.remove('hidden');
  }

  input.addEventListener('input', update);
  input.addEventListener('focus', update);
  input.addEventListener('blur', () => setTimeout(hide, 150));
  // mousedown/touchstart before blur — keep the tap from dismissing first.
  list.addEventListener('mousedown', (e) => e.preventDefault());
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.ac-item');
    if (!btn) return;
    input.value = btn.dataset.book + ' ';
    hide();
    input.focus();
    const val = input.value; input.value = ''; input.value = val; // cursor to end
  });
}

window.BIBLE_BOOKS = BIBLE_BOOKS;
window.attachBookAutocomplete = attachBookAutocomplete;
