import { useState } from "react";

function Marcador({ puntosJugador, puntosMaquina }) {
  return (
    <h2>
      Tú: {puntosJugador} | Máquina: {puntosMaquina}
    </h2>
  );
}

function Elecciones({ onElegir, eleccionJugador, eleccionMaquina, deshabilitado }) {
  const opciones = ["✊", "✋", "✌️"];
  return (
     <div className="elecciones">
      <div className="eleccion">
        <h3>Tú</h3>
         <div className="emoji">{eleccionJugador}</div>
        <div>
          {opciones.map((opcion) => (
            <button
              key={opcion}
              style={{ fontSize: "40px", margin: "10px" }}
              onClick={() => onElegir(opcion)}
              disabled={deshabilitado}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>

       <div className="eleccion">
        <h3>Máquina</h3>
        <div className="emoji">{eleccionMaquina}</div>
      </div>
    </div>
  );
}

export default function Tablero() {
  const [puntosJugador, setPuntosJugador] = useState(0)
  const [puntosMaquina, setPuntosMaquina] = useState(0)
  const [eleccionJugador, setEleccionJugador] = useState("")
  const [eleccionMaquina, setEleccionMaquina] = useState("")
  const [resultado, setResultado] = useState("")

  function jugar(opcionJugador) {
    const opciones = ["✊", "✋", "✌️"];
    const opcionMaquina = opciones[Math.floor(Math.random() * 3)]

    setEleccionJugador(opcionJugador)
    setEleccionMaquina(opcionMaquina)

    let resultado = "";
    if (opcionJugador == opcionMaquina) {
      resultado = "Empate";
    } else if (
      (opcionJugador == "✊" && opcionMaquina == "✌️") ||
      (opcionJugador == "✋" && opcionMaquina == "✊") ||
      (opcionJugador == "✌️" && opcionMaquina == "✋")
    ) {
      resultado = "Ganaste";
      setPuntosJugador(puntosJugador + 1)
    } else {
      resultado = "Perdiste";
      setPuntosMaquina(puntosMaquina + 1)
    }
    setResultado(resultado);
  }

  let mensajeFinal = "";
  if (puntosJugador == 2) mensajeFinal = "¡Has ganado la partida!"
  if (puntosMaquina == 2) mensajeFinal = "La máquina gana la partida"

  const partidaTerminada = puntosJugador == 2 || puntosMaquina == 2

  return (
    <>
      <div className="container">

        <h1>Piedra · Papel · Tijera</h1>
        <Marcador puntosJugador={puntosJugador} puntosMaquina={puntosMaquina} />
        <h3>{resultado}</h3>
        {mensajeFinal && <h2>{mensajeFinal}</h2>}
      </div>

      <Elecciones
        onElegir={jugar}
        eleccionJugador={eleccionJugador}
        eleccionMaquina={eleccionMaquina}
        deshabilitado={partidaTerminada}
      />

      {partidaTerminada && (
        <button
          style={{ marginTop: "20px", padding: "10px 20px" }}
          onClick={() => {
            setPuntosJugador(0)
            setPuntosMaquina(0)
            setEleccionJugador("")
            setEleccionMaquina("")
            setResultado("")
          }}
        >
          Reiniciar
        </button>
      )}
    </>
  );
}
