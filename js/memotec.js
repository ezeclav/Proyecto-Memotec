"use strict";

document.getElementById("addGamers").addEventListener("click", agregarCampos);

function agregarCampos(event) {
  event.preventDefault(); // Evita que el formulario se envíe

  const numeroCampos = document.getElementById("nombre").value;

  if (numeroCampos && !isNaN(numeroCampos)) {
    const contenedor = document.getElementById("contenedor-campos");
    contenedor.innerHTML = "";
    for (let i = 0; i < Number(numeroCampos); i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Nombre Jugador " + (i + 1);
      contenedor.appendChild(input);
    }
  }
}

function crearArreglo() {
  const inputs = document.querySelectorAll("#contenedor-campos input");
  const jugadores = [];
  for (let i = 0; i < inputs.length; i++) {
    jugadores.push(inputs[i].value);
  }
  return jugadores;
}

/******funcion para agregar sonido****/

document.addEventListener("click", playSound);
function playSound() {
  let element = document.createElement("div");
  element.setAttribute("style", "display: none");
  element.innerHTML = `
    <audio autoplay loop>
      <source src="./js/sonido2.mp3" type="audio/ogg">
    </audio>
  `;
  document.body.appendChild(element);
  document.removeEventListener("click", playSound);
}

/***llamo la funcion crear arreglo una vez se hace click en comenzar***/
document.getElementById("crearArreglo").addEventListener("click", function () {
  const gamer = crearArreglo();
  console.log(gamer);
  window.location.href = "playGame.html";
});
