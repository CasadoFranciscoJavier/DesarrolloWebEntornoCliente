import { useState, useEffect } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Seleccion({ seleccion }) {
  return (
    <h1>
      {seleccion}
    </h1>
  )
}

function Juego() {

  const [seleccionJugador, setSeleccionJugador] = useState("")
  const [seleccionMaquina, setSeleccionMaquina] = useState("")
  const [ganador, setGanador] = useState()

  const [puntosJugador, setPuntosJugador] = useState(0)
  const [puntosMaquina, setPuntosMaquina] = useState(0)

  const opciones = ["🥌", "🧻", "✂"]
  const alMejorDe = 3

  useEffect(() => {
    comprobarGanador();
  }, [puntosJugador, puntosMaquina]); // useEffect se llama cada vez que una de estas variables cambia

  function jugarTurno(seleccionJugadorEnTurno) {

    if (!ganador) {
      let indiceAleatorio = getRandomInt(0, opciones.length - 1)
      let seleccionMaquinaEnTurno = opciones[indiceAleatorio]

      setSeleccionJugador(seleccionJugadorEnTurno)
      setSeleccionMaquina(seleccionMaquinaEnTurno)

      comprobarTurno(seleccionJugadorEnTurno, seleccionMaquinaEnTurno)
    }

  }

  function comprobarTurno(seleccionJugador1, seleccionJugador2) {
    if (seleccionJugador1 == seleccionJugador2) {

    } else if ((seleccionJugador1 == "🥌" && seleccionJugador2 == "✂")
      || (seleccionJugador1 == "✂" && seleccionJugador2 == "🧻")
      || (seleccionJugador1 == "🧻" && seleccionJugador2 == "🥌")
    ) {
      setPuntosJugador(puntosJugador + 1)
    } else {
      setPuntosMaquina(puntosMaquina + 1)
    }

  }

  function comprobarGanador() {
    if (puntosJugador == alMejorDe) {
      setGanador("Gana el jugador")
    } else if (puntosMaquina == alMejorDe) {
      setGanador("Gana la maquina")
    }
  }

  function resetearJuego() {
    setSeleccionJugador("")
    setSeleccionMaquina("")
    setGanador()
    setPuntosJugador(0)
    setPuntosMaquina(0)
  }

  return (
    <>
      <div className='container-fluid'>
        <h1> {puntosJugador} - {puntosMaquina}</h1>
        <h2>{ganador}</h2>
        <div className='row'>

          <div className='col-6 px-2'>
            <Seleccion seleccion={seleccionJugador}></Seleccion>
            <button onClick={() => jugarTurno("🥌")}>🥌</button>
            <button onClick={() => jugarTurno("🧻")}>🧻</button>
            <button onClick={() => jugarTurno("✂")}>✂</button>
          </div>

          <div className='col-6 px-2'>
            <Seleccion seleccion={seleccionMaquina}></Seleccion>
          </div>

        </div>
        {(ganador) && <button onClick={resetearJuego}>Volver a jugar</button> }
      </div>
    </>
  )
}

export default Juego
