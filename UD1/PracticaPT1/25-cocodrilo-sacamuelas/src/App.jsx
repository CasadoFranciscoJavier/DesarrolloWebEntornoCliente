import { useState } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function CocodriloSacamuelas() {
  const [numDientes, setNumDientes] = useState(12)
  const [dientes, setDientes] = useState([])
  const [dienteMalo, setDienteMalo] = useState(-1)
  const [turnoJugador, setTurnoJugador] = useState(1)
  const [numJugadores, setNumJugadores] = useState(2)
  const [juegoIniciado, setJuegoIniciado] = useState(false)
  const [perdedor, setPerdedor] = useState(null)
  const [mensaje, setMensaje] = useState('')

  function iniciarJuego() {
    const nuevosDientes = Array(numDientes).fill(true)
    const malo = getRandomInt(0, numDientes - 1)
    setDientes(nuevosDientes)
    setDienteMalo(malo)
    setTurnoJugador(1)
    setJuegoIniciado(true)
    setPerdedor(null)
    setMensaje(`Turno del jugador ${1}`)
  }

  function presionarDiente(index) {
    if (!juegoIniciado || perdedor || !dientes[index]) return

    const nuevosDientes = [...dientes]
    nuevosDientes[index] = false
    setDientes(nuevosDientes)

    if (index === dienteMalo) {
      setPerdedor(turnoJugador)
      setMensaje(`¡Jugador ${turnoJugador} pierde! 🐊`)
      return
    }

    const siguiente = turnoJugador >= numJugadores ? 1 : turnoJugador + 1
    setTurnoJugador(siguiente)
    setMensaje(`Turno del jugador ${siguiente}`)
  }

  function cambiarNumDientes(e) {
    const num = parseInt(e.target.value)
    if (num >= 8 && num <= 20) {
      setNumDientes(num)
    }
  }

  function cambiarNumJugadores(e) {
    const num = parseInt(e.target.value)
    if (num >= 2 && num <= 6) {
      setNumJugadores(num)
    }
  }

  function renderDientes() {
    const filas = []
    const mitad = Math.ceil(dientes.length / 2)
    const arriba = dientes.slice(0, mitad)
    const abajo = dientes.slice(mitad)

    filas.push(
      <div key="arriba" className="fila-dientes">
        {arriba.map((activo, index) => (
          <button
            key={index}
            className={`diente ${!activo ? 'sacado' : ''}`}
            onClick={() => presionarDiente(index)}
            disabled={!activo || !juegoIniciado || perdedor}
          >
            {activo ? '🦷' : '❌'}
          </button>
        ))}
      </div>
    )

    filas.push(
      <div key="abajo" className="fila-dientes">
        {abajo.map((activo, index) => (
          <button
            key={mitad + index}
            className={`diente ${!activo ? 'sacado' : ''}`}
            onClick={() => presionarDiente(mitad + index)}
            disabled={!activo || !juegoIniciado || perdedor}
          >
            {activo ? '🦷' : '❌'}
          </button>
        ))}
      </div>
    )

    return filas
  }

  const dientesRestantes = dientes.filter(d => d).length

  return (
    <div className="cocodrilo-container">
      <h1>🐊 Cocodrilo Sacamuelas 🦷</h1>

      {!juegoIniciado ? (
        <div className="config-inicial">
          <h2>Configurar Juego</h2>
          <label>
            Número de dientes (8-20):
            <input
              type="number"
              value={numDientes}
              onChange={cambiarNumDientes}
              min="8"
              max="20"
            />
          </label>
          <label>
            Número de jugadores (2-6):
            <input
              type="number"
              value={numJugadores}
              onChange={cambiarNumJugadores}
              min="2"
              max="6"
            />
          </label>
          <button onClick={iniciarJuego} className="btn-iniciar">
            Iniciar Juego
          </button>
        </div>
      ) : (
        <>
          <div className="info-juego">
            <h2>{mensaje}</h2>
            <p>Dientes restantes: {dientesRestantes}</p>
            <p>Jugadores: {numJugadores}</p>
          </div>

          <div className="cocodrilo">
            <div className="cabeza-cocodrilo">
              <div className="ojo">👁️</div>
              <div className="ojo">👁️</div>
            </div>
            <div className="boca">
              {renderDientes()}
            </div>
          </div>

          {perdedor && (
            <div className="resultado">
              <h2>¡Jugador {perdedor} perdió!</h2>
              <p>El cocodrilo mordió 🐊</p>
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
