const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const imgDice = document.querySelector('.dice');

const leftPlayer = document.querySelector('.player--0');
const leftCurrentScoreEle = document.querySelector('#current--0');
const leftPlayerScore = document.querySelector('#score--0');

const rightPlayer = document.querySelector('.player--1');
const rightCurrentScoreEle = document.querySelector('#current--1');
const rightPlayerScore = document.querySelector('#score--1');

let leftCurrentScore = 0;
let rightCurrentScore = 0;

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function countingPlayerScore(diceScore) {
  if (leftPlayer.classList.contains('player--active')) {
    leftCurrentScore += diceScore;
    leftCurrentScoreEle.textContent = leftCurrentScore;
  } else {
    rightCurrentScore += diceScore;
    rightCurrentScoreEle.textContent = rightCurrentScore;
  }
}

function handleSwitchPlayer() {
  if (leftPlayer.classList.contains('player--active')) {
    leftPlayer.classList.remove('player--active');
    leftCurrentScore = 0;
    leftCurrentScoreEle.textContent = leftCurrentScore;

    rightPlayer.classList.add('player--active');
  } else {
    leftPlayer.classList.add('player--active');

    rightPlayer.classList.remove('player--active');
    rightCurrentScore = 0;
    rightCurrentScoreEle.textContent = rightCurrentScore;
  }
}

function holdScore() {
  if (leftPlayer.classList.contains('player--active')) {
    leftPlayerScore.textContent =
      Number(leftPlayerScore.textContent) + leftCurrentScore;
  } else {
    rightPlayerScore.textContent =
      Number(rightPlayerScore.textContent) + rightCurrentScore;
  }

  if (
    Number(leftPlayerScore.textContent) >= 100 ||
    Number(rightPlayerScore.textContent) >= 100
  ) {
    leftCurrentScore = 0;
    rightCurrentScore = 0;
    handleShowPlayerWinner();
  }
}

function handleShowPlayerWinner() {
  if (Number(leftPlayerScore.textContent) + leftCurrentScore >= 100) {
    leftPlayer.classList.add('player--winner');
  } else if (Number(rightPlayerScore.textContent) + rightCurrentScore >= 100) {
    rightPlayer.classList.add('player--winner');
  }
}

function hideWinnerPlayer() {
  if (leftPlayer.classList.contains('player--winner')) {
    leftPlayer.classList.remove('player--winner');
  } else {
    rightPlayer.classList.remove('player--winner');
  }
}

function checkPlayerWinner() {
  return (
    leftPlayer.classList.contains('player--winner') ||
    rightPlayer.classList.remove('player--winner')
  );
}

btnRoll.addEventListener('click', function () {
  if (checkPlayerWinner()) return;
  let randomDice = rollDice();
  imgDice.style.display = 'block';
  imgDice.src = `dice-${randomDice}.png`;

  if (randomDice !== 1) {
    countingPlayerScore(randomDice);
  } else {
    countingPlayerScore(randomDice);
    handleSwitchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (checkPlayerWinner()) return;
  holdScore();
  if (
    Number(leftPlayerScore.textContent) < 100 &&
    Number(rightPlayerScore.textContent) < 100
  ) {
    handleSwitchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  leftCurrentScoreEle.textContent = 0;
  leftPlayerScore.textContent = leftCurrentScore;
  rightCurrentScoreEle.textContent = 0;
  rightPlayerScore.textContent = rightCurrentScore;

  leftCurrentScore = 0;
  rightCurrentScore = 0;

  imgDice.style.display = 'none';
  leftPlayer.classList.add('player--active');
  hideWinnerPlayer();
});
