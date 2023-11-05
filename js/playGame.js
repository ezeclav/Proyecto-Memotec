"use strict";
/*************************************************************
/*                      SONIDO DE FONDO
/*************************************************************
// let soundOk = new Audio("./sonidos/fernanfloo.mp3");
// soundOk.play();
/************************************************************* */
function reproducirAudio() {
  return new Promise((resolve, reject) => {
    const soundOk = new Audio("./sonidos/fernanfloo.mp3");

    soundOk.oncanplaythrough = () => {
      soundOk.play();
      soundOk.volume-=0.9;
      resolve("Reproducción de audio exitosa.");
    };

    soundOk.onerror = () => {
      reject("Error al cargar o reproducir el audio.");
    };
  });
}

reproducirAudio()
  .then((mensaje) => {
    console.log(mensaje);
  })
  .catch((error) => {
    console.error(error);
  });

/****************************************/
/*IMPORTANDO ARRAY DE OTRO .JS
/****************************************/
// import { miArray } from "./memotec.js";
// console.log(miArray);

/*******************************/
/*DECLARANDO VARIABLES GLOBALES
/*******************************/
let cardsCollected = [];
let DeckOfCards = [];
let cardOneElement, cardTwoElement, startTime;
let currentTurn = 0;
let moves = 0;
let gameWon = false;

const deck = document.querySelector(".deck");
const btnReplay = document.querySelector(".replay");
const movesContainer = document.querySelector(".moves-selector");
const startBtn = document.querySelector(".game-start-btn");
const timerContainer = document.querySelector(".timer");

let emojis = [
  "💩",
  "💩",
  "💰",
  "💰",
  "🐸",
  "🐸",
  "👻",
  "👻",
  "🙉",
  "🙉",
  "👽",
  "👽",
  "🎉",
  "🎉",
  "🧟‍♂️",
  "🧟‍♂️",
];
const filteredList = ["💩", "💰", "🐸", "👻", "🙉", "👽", "🎉", "🧟‍♂️"];

// console.log(emojis);

//*********************************/
//*  FUNCION MEZCLADO DE EMOJIS
//*********************************/

function shuffleCards() {
  let j, x, i;
  for (i = emojis.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = emojis[i];
    emojis[i] = emojis[j];
    emojis[j] = x;
  }
  return emojis;
}

//*************************************/
//*  FUNCION MOSTRAR EMOJIS EN DECK
//*************************************/
function startGame() {
  const shuffledDeck = shuffleCards(emojis);
  for (let i = 0; i < shuffledDeck.length; i++) {
    const iTag = document.querySelectorAll(".back");
    iTag[i].textContent = shuffledDeck[i];
  }
  console.log(shuffledDeck);
}

function game() {
  startGame();
  deck.addEventListener("click", cardClickHandler);
}
//*********************************/
//*  FUNCION COMIENZA EL JUEGO
//*********************************/

startBtn?.addEventListener("click", function () {
  this.classList.add("hide-start-btn");
  game();
  timer();
});

// Cuando el juego se complete, agrega la opción para jugar nuevamente.
btnReplay?.addEventListener("click", replayTheGame);
// resetButton.addEventListener("click", replayTheGame);

//*********************************/
//*  FUNCION TIMER - TIEMPO DE JUEGO
//*********************************/
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
// let timeStart = false;

function timer() {
  time = setInterval(function () {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    timeCounter.innerHTML =
      "<i class='timer-run'></i>" + minutes + " Min " + seconds + " Seg";
  }, 1000);
}

//

//*********************************/
//*  FUNCION FLIP CARTAS
//*********************************/
//
//
function cardClickHandler(e) {
  console.log("card clicked");
  const cardIsNotAlreadyChosen = e.target.parentNode != cardOneElement;
  if (
    !gameWon &&
    e.target.classList.contains("card-face") &&
    cardIsNotAlreadyChosen
  ) {
    checkStats(e.target.parentNode);
    flipUp(e.target.parentNode);
  }
}
//******************************************/
// function para asignar valores y chequeo
//******************************************/
function checkStats(el) {
  switch (currentTurn) {
    case 0:
      cardOneElement = el;
      currentTurn += 1;
      break;
    case 1:
      cardTwoElement = el;
      break;
  }

  if (cardOneElement && cardTwoElement) {
    disableClick(deck);
    setTimeout(function () {
      areTheyEqual();
    }, 1000);
  }
}
//******************************************/
// function para verificar igualdad y maneja el resultado
//******************************************/

function areTheyEqual() {
  const cardOneValue = cardOneElement.innerHTML.trim();
  const cardTwoValue = cardTwoElement.innerHTML.trim();

  // comprueba si ambas cartas son iguales
  if (!cardsCollected.includes(cardOneValue) && cardOneValue === cardTwoValue) {
    equal(cardOneValue, cardTwoValue);
  } else {
    notEqual();
  }
  // se incrementa en 1 los intentos
  moves += 1;
  // starSetter();
  updateUI();

  currentTurn = 0;

  //*****************************************************************************/
  // si todas las cartas estan dadas vueltas
  //******************************************************************************/

  if (cardsCollected.length === 16) {
    gameWon = true;
    winMessage();
    setTimeout(function () {
      final();
    }, 3000);
  }
}

// function para controlar lo que sucede cuando las cartas coinciden
function equal(itemOne, itemTwo) {
  // 1. las agrega a la matriz de cartas volteadas
  cardsCollected.push(itemOne, itemTwo);
  // 2. agrega animación al resultado correcto
  correct(cardOneElement);
  correct(cardTwoElement);
  // remueve class al elemento ///////////////////////////////////////////
  // setTimeout(function () {
  //   removeCorrect(cardOneElement);
  // }, 350);
  // setTimeout(function () {
  //   removeCorrect(cardTwoElement);
  // }, 350); ////////////////////////////////////////////////////////
  // 3. se deshabilita la carta para no hacerle click
  disableClick(cardOneElement);
  disableClick(cardTwoElement);
  // 4. se resetean elementos
  setTimeout(resetElementPointer, 300);
  let soundOk = new Audio("/sonidos/ok.wav");
  soundOk.play();
}

// function para manejar cartas que no coinciden
function notEqual() {
  // 1. agrega animación al resultado incorrecto
  wrong(cardOneElement);
  wrong(cardTwoElement);
  // 2. flipea la carta boca abajo
  setTimeout(function () {
    removeWrong(cardOneElement);
    flipDown(cardOneElement);
  }, 250);
  setTimeout(function () {
    removeWrong(cardTwoElement);
    flipDown(cardTwoElement);
  }, 250);
  // 3. se resetean elementos
  setTimeout(resetElementPointer, 300);
  let soundNook = new Audio("/sonidos/error-8BIT.wav");
  soundNook.play();
}

/**********************************/
// function mostrar mensaje ganador
/**********************************/
async function winMessage() {
  // actualiza todo para mostrar el tiempo e intentos del jugador
  const movesHolder = movesContainer?.innerText;
  const timerHolder = timerContainer?.innerText;

  console.log("el tiempo fue: " + timerHolder);
  console.log("los intentos: " + movesHolder);
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  localStorage.setItem("moves", movesHolder);
  localStorage.setItem("timer", timerHolder);

  // remueve el EventListener del DECK
  deck?.removeEventListener("click", cardClickHandler);
}

// función para voltear la tarjeta arriba
function flipUp(element) {
  element.classList.add("flipped");
}

// función para voltear la tarjeta hacia abajo
function flipDown(element) {
  element.classList.remove("flipped");
}

// función para agregar animación a pareja correcta
function correct(el) {
  el.classList.add("correct");
}

// // función para quitar animación a pareja correcta
// function removeCorrect(el) {
//   el.classList.remove("correct");
// }

// function para agregar la animación de incorrecta
function wrong(el) {
  el.classList.add("wrong");
}

function removeWrong(el) {
  el.classList.remove("wrong");
}

// función para impedir que se haga clic en el elemento
function disableClick(el) {
  el.classList.add("cant-click-this");
}

// función para volver a habilitar elementos en los que se puede hacer click
function enableClick(el) {
  console.log("clicks enabled");
  el.classList.remove("cant-click-this");
}

function updateUI() {
  movesContainer.textContent = "Intentos: " + moves;
}

function resetUI() {
  timerContainer.textContent = "0 Min 0 Seg";
  movesContainer.textContent = "Intentos: " + moves;
}

// función para restablecer las variables que contienen un puntero a un elemento DOM
function resetElementPointer() {
  cardOneElement = null;
  cardTwoElement = null;
  // habilitar clicks en el deck
  enableClick(deck);
}

//*********************************/
//*  FUNCION RESETO TOTAL - REPLAY JUEGO
//*********************************/
function replayTheGame() {
  // remueve cualquier elemento deshabilitado
  document.querySelectorAll(".cant-click-this").forEach(function (el) {
    el.classList.remove("cant-click-this");
  });
  // remueve las cartas flipeadas
  document.querySelectorAll(".card-container").forEach(function (el) {
    flipDown(el);
  });
  // resetea variables
  resetGame();

  // reseteo punteador
  resetUI();

  // volver a jugar
  game();
}

// function reseteo comienzo del juego
function resetGame() {
  // reseteo variables globales
  cardsCollected = [];
  DeckOfCards = [];
  cardOneElement = null;
  cardTwoElement = null;
  currentTurn = 0;
  gameWon = false;
  seconds = 0;
  moves = 0;
}

/********************************************
 * para dirigirse a la pagina principal
/*******************************************/
async function volver() {
  window.location.href = "/index.html";
}
window.volver = volver;
/********************************************
 * para dirigirse a la pagina final
/*******************************************/
function final() {
  window.location.href = "/FINAL.html";
}
