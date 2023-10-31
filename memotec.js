const jugadores = {}; // Objeto para almacenar los jugadores

document.getElementById("addGamers").addEventListener("click", agregarCampos);
document.getElementById("crearObjeto").addEventListener("click", crearObjeto);

function agregarCampos() {
  const numeroCampos = prompt(
    "Introduce la cantidad de jugadores que deseas agregar:"
  );

  if (numeroCampos && !isNaN(numeroCampos)) {
    const contenedor = document.getElementById("contenedor-campos");
    contenedor.innerHTML = ""; // Limpiar el contenido anterior

    for (let i = 0; i < Number(numeroCampos); i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Campo " + (i + 1);
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
}
