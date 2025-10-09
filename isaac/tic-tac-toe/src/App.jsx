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
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [turnoX, setTurnoX] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)]);

  function retroceder() {
    history.pop()
    const ultimaJugada = history[history.length - 1];
    setTurnoX(!turnoX)
    setSquares(ultimaJugada)
  }

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

  function handleClick(position) {
    const squaresCopy = squares.slice() // .slice() copia el array en squaresCopy

    if (squaresCopy[position] == null && !calculateWinner(squaresCopy)) {
      squaresCopy[position] = turnoX ? "X" : "O"
      setTurnoX(!turnoX)
      setSquares(squaresCopy) // Hago set del array completo para que se renderice
      history.push(squaresCopy)
    }

  }

  function volverAJugadaAnterior(numeroJugada){
    setSquares(history[numeroJugada])
    const historyCopy = history.slice(0, numeroJugada+1) // [0, numeroJugada)
    setHistory(historyCopy)

    setTurnoX(numeroJugada%2 == 0 ? true : false)

  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (turnoX ? "X" : "O");
  }

  return (
    <>
      <h1>{status}</h1>
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

      {history.map((value, index) => (
        <button onClick={() => volverAJugadaAnterior(index)}>Volver a la jugada {index}</button>
      ))}
      
      <div>
        {(history.length > 1) && <button onClick={retroceder}>Retroceder</button> }
        {/* {booleano ? <button onClick={retroceder}>Retroceder</button> : ""} */}
      </div>
    </>
  );
}