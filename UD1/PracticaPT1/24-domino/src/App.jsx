import { useState } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function crearFichas() {
  const fichas = []
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      fichas.push({ id: `${i}-${j}`, lado1: i, lado2: j })
    }
  }
  return fichas
}

function mezclarArray(array) {
  const nuevo = [...array]
  for (let i = nuevo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]]
  }
  return nuevo
}

function Ficha({ lado1, lado2, onClick, seleccionada }) {
  return (
    <div
      className={`ficha ${seleccionada ? 'seleccionada' : ''}`}
      onClick={onClick}
    >
      <div className="lado">{lado1}</div>
      <div className="divisor"></div>
      <div className="lado">{lado2}</div>
    </div>
  )
}

export default function Domino() {
  const [fichasJugador, setFichasJugador] = useState([])
  const [fichasCPU, setFichasCPU] = useState([])
  const [mesa, setMesa] = useState([])
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null)
  const [turnoJugador, setTurnoJugador] = useState(true)
  const [juegoIniciado, setJuegoIniciado] = useState(false)
  const [ganador, setGanador] = useState('')
  const [mensaje, setMensaje] = useState('')

  function iniciarJuego() {
    const todasFichas = mezclarArray(crearFichas())
    const jugador = todasFichas.slice(0, 7)
    const cpu = todasFichas.slice(7, 14)
    const primera = todasFichas[14]

    setFichasJugador(jugador)
    setFichasCPU(cpu)
    setMesa([primera])
    setTurnoJugador(true)
    setJuegoIniciado(true)
    setGanador('')
    setMensaje('Tu turno')
    setFichaSeleccionada(null)
  }

  function seleccionarFicha(ficha) {
    if (!turnoJugador || ganador) return
    setFichaSeleccionada(ficha)
  }

  function puedeJugar(ficha, extremo) {
    return ficha.lado1 === extremo || ficha.lado2 === extremo
  }

  function colocarFicha(posicion) {
    if (!fichaSeleccionada || !turnoJugador || ganador) return

    const extremoIzq = mesa[0].lado1
    const extremoDer = mesa[mesa.length - 1].lado2

    let puedoColocar = false
    let nuevaFicha = { ...fichaSeleccionada }

    if (posicion === 'izquierda') {
      if (puedeJugar(fichaSeleccionada, extremoIzq)) {
        puedoColocar = true
        if (fichaSeleccionada.lado2 !== extremoIzq) {
          nuevaFicha = { ...fichaSeleccionada, lado1: fichaSeleccionada.lado2, lado2: fichaSeleccionada.lado1 }
        }
      }
    } else {
      if (puedeJugar(fichaSeleccionada, extremoDer)) {
        puedoColocar = true
        if (fichaSeleccionada.lado1 !== extremoDer) {
          nuevaFicha = { ...fichaSeleccionada, lado1: fichaSeleccionada.lado2, lado2: fichaSeleccionada.lado1 }
        }
      }
    }

    if (!puedoColocar) {
      setMensaje('No puedes colocar ahi')
      return
    }

    const nuevasFichasJugador = fichasJugador.filter(f => f.id !== fichaSeleccionada.id)
    const nuevaMesa = posicion === 'izquierda'
      ? [nuevaFicha, ...mesa]
      : [...mesa, nuevaFicha]

    setFichasJugador(nuevasFichasJugador)
    setMesa(nuevaMesa)
    setFichaSeleccionada(null)

    if (nuevasFichasJugador.length === 0) {
      setGanador('Jugador')
      setMensaje('¡GANASTE!')
      return
    }

    setMensaje('Turno de la CPU')
    setTurnoJugador(false)
    setTimeout(turnoCPU, 1500)
  }

  function turnoCPU() {
    if (ganador) return

    const extremoIzq = mesa[0].lado1
    const extremoDer = mesa[mesa.length - 1].lado2

    let fichaJugable = null
    let posicionJugar = null

    for (let ficha of fichasCPU) {
      if (puedeJugar(ficha, extremoIzq)) {
        fichaJugable = ficha
        posicionJugar = 'izquierda'
        break
      }
      if (puedeJugar(ficha, extremoDer)) {
        fichaJugable = ficha
        posicionJugar = 'derecha'
        break
      }
    }

    if (!fichaJugable) {
      setMensaje('CPU pasa turno - Tu turno')
      setTurnoJugador(true)
      return
    }

    const nuevasFichasCPU = fichasCPU.filter(f => f.id !== fichaJugable.id)
    let nuevaFicha = { ...fichaJugable }

    if (posicionJugar === 'izquierda') {
      if (fichaJugable.lado2 !== extremoIzq) {
        nuevaFicha = { ...fichaJugable, lado1: fichaJugable.lado2, lado2: fichaJugable.lado1 }
      }
      setMesa([nuevaFicha, ...mesa])
    } else {
      if (fichaJugable.lado1 !== extremoDer) {
        nuevaFicha = { ...fichaJugable, lado1: fichaJugable.lado2, lado2: fichaJugable.lado1 }
      }
      setMesa([...mesa, nuevaFicha])
    }

    setFichasCPU(nuevasFichasCPU)

    if (nuevasFichasCPU.length === 0) {
      setGanador('CPU')
      setMensaje('La CPU ganó')
      return
    }

    setMensaje('Tu turno')
    setTurnoJugador(true)
  }

  function pasarTurno() {
    if (!turnoJugador || ganador) return

    const extremoIzq = mesa[0].lado1
    const extremoDer = mesa[mesa.length - 1].lado2

    const tieneFichaValida = fichasJugador.some(f =>
      puedeJugar(f, extremoIzq) || puedeJugar(f, extremoDer)
    )

    if (tieneFichaValida) {
      setMensaje('Tienes fichas validas')
      return
    }

    setFichaSeleccionada(null)
    setMensaje('Turno de la CPU')
    setTurnoJugador(false)
    setTimeout(turnoCPU, 1500)
  }

  return (
    <div className="domino-container">
      <h1>🎲 Dominó 🎲</h1>

      {!juegoIniciado ? (
        <button onClick={iniciarJuego} className="btn-iniciar">
          Iniciar Juego
        </button>
      ) : (
        <>
          <div className="info-juego">
            <h3>{mensaje}</h3>
            <p>Fichas CPU: {fichasCPU.length}</p>
            <p>Tus fichas: {fichasJugador.length}</p>
          </div>

          <div className="mesa">
            <h3>Mesa:</h3>
            <div className="fichas-mesa">
              {mesa.map((ficha, index) => (
                <Ficha
                  key={index}
                  lado1={ficha.lado1}
                  lado2={ficha.lado2}
                />
              ))}
            </div>
            {turnoJugador && fichaSeleccionada && !ganador && (
              <div className="botones-colocar">
                <button onClick={() => colocarFicha('izquierda')}>
                  Colocar Izquierda
                </button>
                <button onClick={() => colocarFicha('derecha')}>
                  Colocar Derecha
                </button>
              </div>
            )}
          </div>

          <div className="fichas-jugador">
            <h3>Tus fichas:</h3>
            <div className="fichas-mano">
              {fichasJugador.map((ficha) => (
                <Ficha
                  key={ficha.id}
                  lado1={ficha.lado1}
                  lado2={ficha.lado2}
                  onClick={() => seleccionarFicha(ficha)}
                  seleccionada={fichaSeleccionada?.id === ficha.id}
                />
              ))}
            </div>
            {turnoJugador && !ganador && (
              <button onClick={pasarTurno} className="btn-pasar">
                Pasar Turno
              </button>
            )}
          </div>

          {ganador && (
            <div className="resultado">
              <h2>{ganador === 'Jugador' ? '¡GANASTE!' : 'PERDISTE'}</h2>
              <button onClick={iniciarJuego} className="btn-reiniciar">
                Jugar de Nuevo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
