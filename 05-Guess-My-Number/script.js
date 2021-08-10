'useStrict';

console.log(document.querySelector('.message'));
let randomNumber = Math.trunc(Math.random() * 20) + 1;
let maxCount = 20;
let tempMaxScore = 0;
const guess = document.querySelector('.guess');
const scoreEle = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const number = document.querySelector('.number');
const body = document.querySelector('body');

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

console.log(`randomNumber`, randomNumber);
document.querySelector('.check').addEventListener('click', function () {
  if (!guess.value) {
    displayMessage('⛔ No Number');
  } else if (guess.value == randomNumber) {
    displayMessage('🎉 Correct Number');
    body.style.background = '#60b347';
    number.textContent = guess.value;
    if (maxCount > tempMaxScore) {
      highscore.textContent = `${maxCount}`;
      tempMaxScore = maxCount;
    }
  } else {
    if (maxCount > 1) {
      displayMessage(
        Number(guess.value) > randomNumber ? '📈 Too high' : '📉 Too low'
      );
      maxCount--;
      scoreEle.textContent = `${maxCount}`;
    } else {
      displayMessage('💥 You lost the game!');
      scoreEle.textContent = '0';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  guess.value = '';
  scoreEle.textContent = '20';
  displayMessage('Start guessing...');
  maxCount = 20;
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  number.textContent = '?';
  body.style.background = '#222';
});
