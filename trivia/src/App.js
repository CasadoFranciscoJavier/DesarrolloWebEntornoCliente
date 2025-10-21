import React, { useState, useEffect } from 'react';
import preguntas from './preguntas.json';

import quesito0 from './quesitos/quesito0.png';
import quesito1 from './quesitos/quesito1.png';
import quesito2 from './quesitos/quesito2.png';
import quesito3 from './quesitos/quesito3.png';
import quesito4 from './quesitos/quesito4.png';
import quesito5 from './quesitos/quesito5.png';
import quesito6 from './quesitos/quesito6.png';
import quesito7 from './quesitos/quesito7.png';

function getRandomInt(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Trivial() {
 const [preguntaActual, setPreguntaActual] = useState(preguntas[0]);
 const [quesitos, setQuesitos] = useState(0); 

 const imagenesQuesitos = [quesito0, quesito1, quesito2, quesito3, quesito4, quesito5, quesito6, quesito7];

 function seleccionarPreguntaAleatoria() {
  let indiceAleatorio = getRandomInt(0, preguntas.length - 1)
  let preguntaAleatoria = preguntas[indiceAleatorio]
  setPreguntaActual(preguntaAleatoria)
 }

 useEffect(function () {
  seleccionarPreguntaAleatoria();
 }, []);

 useEffect(() => {
  if (quesitos == 7) { 
   const temporizador = setTimeout(() => {
    alert("¡Felicidades! ¡Has ganado el Trivial!");
    setQuesitos(0); 
    seleccionarPreguntaAleatoria(); 
   }, 500);

   return () => clearTimeout(temporizador);
  }
 }, [quesitos]);

 function manejarRespuesta(respuestaUsuario) {
  let respuestaCorrecta = preguntaActual.respuesta

  if (respuestaUsuario == respuestaCorrecta) {
   setQuesitos(quesitos+ 1);
  } else {
   alert("Respuesta incorrecta."); 
   setQuesitos(0); 
  }

  seleccionarPreguntaAleatoria();
 }

 return (
  <div>
   <h1>Trivia</h1>
   <div>
    <h2>{preguntaActual.pregunta}</h2>
     <div>
      <button onClick={() => manejarRespuesta(preguntaActual.opciones[0])}>
       {preguntaActual.opciones[0]}
      </button>
      <button onClick={() => manejarRespuesta(preguntaActual.opciones[1])}>
       {preguntaActual.opciones[1]}
      </button>
      <button onClick={() => manejarRespuesta(preguntaActual.opciones[2])}>
       {preguntaActual.opciones[2]}
      </button>
      <button onClick={() => manejarRespuesta(preguntaActual.opciones[3])}>
       {preguntaActual.opciones[3]}
      </button>
     </div>
   </div>

   <img
    src={imagenesQuesitos[quesitos]}
    style={{ width: '200px', height: '200px' }}
   />
  </div>
 );
}

//--------------------------------------------

function barajarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}



// tambien podriamos barajar las preguntas al iniciar el juego y luego ir sacandolas una a una sin repetir
// --- Arrays de ejemplo ---
const arrayFrutas = ["Manzana", "Pera", "Naranja", "Fresa", "Uva", "Melón"];
const arrayNumeros = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const arrayPalabrasAhorcado = ["murcielago", "camaleon", "espejismo", "laberinto"]; // Como el JSON de tu Ahorcado

// --- Aplicando la función de barajado ---

// 1. Barajar el array de frutas
const frutasMezcladas = barajarArray(arrayFrutas);
console.log("Frutas barajadas:", frutasMezcladas);
// Una posible salida: ["Fresa", "Melón", "Pera", "Naranja", "Manzana", "Uva"]

// 2. Barajar el array de números
const numerosMezclados = barajarArray(arrayNumeros);
console.log("Números barajados:", numerosMezclados);
// Una posible salida: [40, 70, 10, 100, 20, 80, 50, 90, 30, 60]

// 3. Barajar el array de palabras para seleccionar una (opciones de respuesta)
const palabrasMezcladas = barajarArray(arrayPalabrasAhorcado);
console.log("Palabras barajadas:", palabrasMezcladas);
// Una posible salida: ["espejismo", "laberinto", "murcielago", "camaleon"]


//Nota Importante
// La función barajarArray modifica el array original (arrayFrutas, arrayNumeros, etc.). Si necesitas 
// conservar el array original sin modificarlo, debes pasar una copia a la función:
const arrayOriginal = [1, 2, 3];
// Copiamos el array antes de barajar usando el operador spread (...)
const arrayCopiaBarajada = barajarArray([...arrayOriginal]);

console.log("Copia barajada:", arrayCopiaBarajada); // Desordenado
console.log("Array Original:", arrayOriginal);      // Sigue siendo [1, 2, 3]

// en nuestro caso de las preguntas sería:
const preguntasMezcladas = barajarArray([...preguntas]);
console.log("Preguntas barajadas:", preguntasMezcladas);
     