
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {

  // Declarar una VARIABLE DE ESTADO
  // useState crea una variable de estado y su respectivo set. El valor por defecto o inicial de la variable es el argumento que hayamos pasado al useState
  // Las variables de estado están formadas por un par variable - funcionSet

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turnoX, setTurnoX] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  function calculateWinner(squares) {
    let winner = null
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a]
        && squares[a] === squares[b]
        && squares[a] === squares[c]) {
        winner = squares[a];
      }
    }
    return winner;
  }

  function mensajeEstado() {
    const ganador = calculateWinner(squares)
    let mensaje = ""

    if (ganador) {
      mensaje = "Ganador: " + ganador + " 🎉🎉🎉"
    } else if (!squares.includes(null)) {
      mensaje = "Empate"
    } else {
      mensaje = turnoX ? "Turno jugador X" : "Turno jugador O"
    }

    return mensaje
  }

  function handleClick(position) {
    const squaresCopy = squares.slice();
    if (squaresCopy[position] == null && !calculateWinner(squaresCopy)) {
      squaresCopy[position] = turnoX ? "X" : "O";
      setTurnoX(!turnoX);
      setSquares(squaresCopy);
      history.push(squaresCopy);
    }
  }

  function retroceder() {
    history.pop();
    const ultimaJugada = history[history.length - 1];
    if (ultimaJugada) {
      setSquares(ultimaJugada);
      setTurnoX(!turnoX);
    }
  }

 function historialJugadas() {
  const items = [];

  for (let index = 0; index < history.length; index++) {
    const squares = history[index];
    const historico = index == 0 ? "Inicio" : "Jugada #" + index;

    items.push(
      <li key={index}>
        <button onClick={() => {
          setSquares(squares);
          setTurnoX(!turnoX);
          setHistory(history.slice(0, index + 1));
        }}>
          {historico}
        </button>
      </li>
    );
  }

  return <ol>{items}</ol>;
}



    //    (
    //     <li key={index}>
    //       <button onClick={() => {
    //         setSquares(squares);
    //         setTurnoX(!(turnoX));
    //         setHistory(history.push);
    //       }}>
    //         {historico}
    //       </button>
    //     </li>
    //   );
    // } );}




return (
  <>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    <h3>Historial de Jugadas</h3>
    <ol>{historialJugadas()}</ol> 
   <div>
   {(history.length > 1) &&<button onClick={retroceder}>Retroceder</button>}
   </div>
 

    <div className="board-row">
      <h1>{mensajeEstado()}</h1>
    </div>
  </>
);
}


// tengo que meter un boton de retroceder a un turno anterior, estoy añadiendo esta variable const nueva, la de history...
//declarar una variable de estado
//useState crea una variable de estado y su respectivo set. el valor por defecto o inicial de la variable es el argumento que hayamos pasado al useState
//las variables de estado están formadas por un par variable- funcionSet
// const [value, setValue] = useState(null);

// function handleClick() {
//   setValue("X")
// }
// quitammos todo esto porque ya no hace falta al crear el array en nuestro board
// el export default es como decir main, es la funcion principal es el que se va a compilar
// la palabra export hace que sea accesible desde otros archivos
// La primera línea define una función llamada Square. 
// La palabra clave de JavaScript export hace que esta función sea accesible fuera de este archivo. 
// La palabra clave default le dice a otros archivos que usan su código que es la función principal en su archivo.