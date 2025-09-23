
function Square({ value }) {
  return <button className="square">{ value }</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
// el export default es como decir main, es la funcion principal es el que se va a compilar
// la palabra export hace que sea accesible desde otros archivos
// La primera línea define una función llamada Square. 
// La palabra clave de JavaScript export hace que esta función sea accesible fuera de este archivo. 
// La palabra clave default le dice a otros archivos que usan su código que es la función principal en su archivo.