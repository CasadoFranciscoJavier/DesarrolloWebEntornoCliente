import { useState } from "react";

function Square({ value }) {

  //declarar una variable de estado
  //useState crea una variable de estado y su respectivo set. el valor por defecto o inicial de la variable es el argumento que hayamos pasado al useState
  //las variables de estado están formadas por un par variable- funcionSet
  // const [value, setValue] = useState(null);

  // function handleClick() {
  //   setValue("X")
  // }
  // quitammos todo esto porque ya no hace falta al crear el array en nuestro board
  return (
    <button className="square">
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }
  
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}
// el export default es como decir main, es la funcion principal es el que se va a compilar
// la palabra export hace que sea accesible desde otros archivos
// La primera línea define una función llamada Square. 
// La palabra clave de JavaScript export hace que esta función sea accesible fuera de este archivo. 
// La palabra clave default le dice a otros archivos que usan su código que es la función principal en su archivo.