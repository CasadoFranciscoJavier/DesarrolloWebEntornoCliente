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