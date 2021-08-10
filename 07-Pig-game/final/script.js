const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const current0 = document.getElementById('current--0');
const score0 = document.getElementById('score--0');
const current1 = document.getElementById('current--1');
const score1 = document.getElementById('score--1');

const imgDice = document.querySelector('.dice');

let currentScore, activePlayer, playing;

function init() {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  current0.textContent = 0;
  score0.textContent = 0;
  current1.textContent = 0;
  score1.textContent = 0;
  imgDice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (!playing) return;
  let randomDice = Math.trunc(Math.random() * 6) + 1;
  imgDice.classList.remove('hidden');
  imgDice.src = `dice-${randomDice}.png`;

  if (randomDice !== 1) {
    // display current score
    currentScore += randomDice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // switch player
    currentScore = 0;
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) return;
  // add current score to total score
  const activeScoreEle = document.getElementById(`score--${activePlayer}`);
  const activePlayerEle = document.querySelector(`.player--${activePlayer}`);

  activeScoreEle.textContent =
    Number(activeScoreEle.textContent) + currentScore;
  if (Number(activeScoreEle.textContent) >= 100) {
    // score >= 100 active player win
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayerEle.classList.add('player--winner');
    playing = false;
  } else {
    // switch player
    currentScore = 0;
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
