import React, { useState, useEffect } from 'react';
import preguntas from './preguntas.json';

// Importar las imágenes de los quesitos
import quesito0 from './quesitos/quesito0.png';
import quesito1 from './quesitos/quesito1.png';
import quesito2 from './quesitos/quesito2.png';
import quesito3 from './quesitos/quesito3.png';
import quesito4 from './quesitos/quesito4.png';
import quesito5 from './quesitos/quesito5.png';
import quesito6 from './quesitos/quesito6.png';
import quesito7 from './quesitos/quesito7.png';

export default function Trivial() {
  const [preguntaActual, setPreguntaActual] = useState(preguntas[0]);
  const [quesitos, setQuesitos] = useState(0); // Contador de quesitos ganados

  // Array de imágenes de los quesitos, desde 0 hasta 7
  const imagenesQuesitos = [quesito0, quesito1, quesito2, quesito3, quesito4, quesito5, quesito6, quesito7];

  // Seleccionar una pregunta aleatoria
  function seleccionarPreguntaAleatoria() {
    // TO-DO
  }

  // Selecciona la primera pregunta al cargar el componente
  useEffect(function () {
    seleccionarPreguntaAleatoria();
  }, []);

  // Verificar si la respuesta es correcta y actualizar el estado de los quesitos
  function manejarRespuesta(respuesta) {
    // TO-DO
  }

  // Reiniciar el juego
  function reiniciarJuego() {
    // TO-DO
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