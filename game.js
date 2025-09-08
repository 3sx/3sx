const defaultWords = [
  { en: 'apple', ar: 'تفاحة' },
  { en: 'book', ar: 'كتاب' },
  { en: 'house', ar: 'منزل' }
];

let words = JSON.parse(localStorage.getItem('words')) || defaultWords;
let currentIndex = 0;

const englishEl = document.getElementById('english-word');
const arabicEl = document.getElementById('arabic-word');
const cardEl = document.getElementById('card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const scrambleBtn = document.getElementById('scramble');
const scrambleArea = document.getElementById('scramble-area');
const scrambledEl = document.getElementById('scrambled');
const guessInput = document.getElementById('guess');
const checkBtn = document.getElementById('check');
const resultEl = document.getElementById('result');
const addBtn = document.getElementById('add');
const newEn = document.getElementById('new-en');
const newAr = document.getElementById('new-ar');

function updateCard(direction = 0) {
  const word = words[currentIndex];
  englishEl.textContent = word.en;
  arabicEl.textContent = word.ar;
  cardEl.style.transform = `translateX(${direction * 100}%)`;
  setTimeout(() => {
    cardEl.style.transform = 'translateX(0)';
  }, 20);
}

function prev() {
  currentIndex = (currentIndex - 1 + words.length) % words.length;
  updateCard(-1);
}

function next() {
  currentIndex = (currentIndex + 1) % words.length;
  updateCard(1);
}

function scrambleWord(word) {
  return word.split('').sort(() => 0.5 - Math.random()).join('');
}

function startChallenge() {
  scrambleArea.classList.remove('hidden');
  guessInput.value = '';
  resultEl.textContent = '';
  const word = words[currentIndex].en;
  scrambledEl.textContent = scrambleWord(word);
}

function checkGuess() {
  const word = words[currentIndex].en;
  if (guessInput.value.trim().toLowerCase() === word.toLowerCase()) {
    resultEl.textContent = 'Correct!';
    resultEl.style.color = 'green';
  } else {
    resultEl.textContent = 'Try again';
    resultEl.style.color = 'red';
  }
}

function addWord() {
  const en = newEn.value.trim();
  const ar = newAr.value.trim();
  if (!en || !ar) return;
  words.push({ en, ar });
  localStorage.setItem('words', JSON.stringify(words));
  newEn.value = '';
  newAr.value = '';
  currentIndex = words.length - 1;
  updateCard();
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
scrambleBtn.addEventListener('click', startChallenge);
checkBtn.addEventListener('click', checkGuess);
addBtn.addEventListener('click', addWord);

updateCard();
