"use strict";

const jugadores = {}; // Objeto para almacenar los jugadores

document.getElementById("addGamers").addEventListener("click", agregarCampos);
document.getElementById("crearObjeto").addEventListener("click", crearObjeto);

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

function crearObjeto() {
  const inputs = document.querySelectorAll("#contenedor-campos input");
  for (let i = 0; i < inputs.length; i++) {
    jugadores["Jugador " + (i + 1)] = inputs[i].value;
  }
  console.log(jugadores); // Muestra el objeto en la consola (puedes personalizar esto)
  window.location.href = "about.html";
}
/******pone un etiqueta div y a este le agrega un elemento <audio> para poner un sonido de fondo****/
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
