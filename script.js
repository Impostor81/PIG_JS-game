'use strict';

// Elements selection 
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Game initial conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');
// diceElement.hidden = true;  // можно так скрывать элемент, добавляя этот атрибут к элементу, это равносильно тому, что мы display: none стиль пропишем, ну либо как мы будем использовать дальше для этого будем использовать класс hidden с прописанным для него display: none

let totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

const switchActivePlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

// Roll the dice
btnRoll.addEventListener('click', () => {
  if (isPlaying) {
      // 1. Generate a random number
    const diceNumber = Math.floor(Math.random() * 6 + 1); // or Math.trunc(Math.random() * 6) + 1;

      // 2. Display number of the dice
    diceElement.src = `dice${diceNumber}.png`;
    diceElement.classList.remove('hidden');

      // 3. If the number is 1 - switch to another player, else add number to the current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

// Hold total scores
btnHold.addEventListener('click', () => {
  if (isPlaying) {
      // 1. Add current score to active player total score
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];

      // 2. If total score of active player >= 100, active player won, if not switch active player
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document.querySelector(`#score--${activePlayer}`).textContent = 'Победа!';
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
        switchActivePlayer();
    }
  }
});

// start new game /  we can also all code from here to incapsulate in function named 'init' and call it at the beginning and here
btnNew.addEventListener('click', () => {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.remove('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.add('player--active');
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  totalScores = [0, 0];
  diceElement.classList.add('hidden');
});
