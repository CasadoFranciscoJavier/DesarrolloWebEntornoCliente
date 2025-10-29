import { useState, useEffect } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Carta({ carta, onClick, volteada, encontrada }) {
  return (
    <div
      className={`carta-memoria ${volteada || encontrada ? 'volteada' : ''} ${encontrada ? 'encontrada' : ''}`}
      onClick={onClick}
    >
      {volteada || encontrada ? carta.emoji : '❓'}
    </div>
  )
}

export default function MemoryGame() {
  const [numParejas, setNumParejas] = useState(8)
  const [cartas, setCartas] = useState([])
  const [cartasVolteadas, setCartasVolteadas] = useState([])
  const [cartasEncontradas, setCartasEncontradas] = useState([])
  const [juegoIniciado, setJuegoIniciado] = useState(false)
  const [movimientos, setMovimientos] = useState(0)
  const [juegoTerminado, setJuegoTerminado] = useState(false)

  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔']

  useEffect(() => {
    if (cartasEncontradas.length === cartas.length && cartas.length > 0) {
      setJuegoTerminado(true)
    }
  }, [cartasEncontradas, cartas])

  function iniciarJuego() {
    const emojisSeleccionados = emojis.slice(0, numParejas)
    const cartasJuego = []

    emojisSeleccionados.forEach((emoji, index) => {
      cartasJuego.push({ id: index * 2, emoji })
      cartasJuego.push({ id: index * 2 + 1, emoji })
    })

    setCartas(mezclarArray(cartasJuego))
    setCartasVolteadas([])
    setCartasEncontradas([])
    setMovimientos(0)
    setJuegoIniciado(true)
    setJuegoTerminado(false)
  }

  function mezclarArray(array) {
    const copia = [...array]
    for (let i = copia.length - 1; i > 0; i--) {
      const j = getRandomInt(0, i)
      const temp = copia[i]
      copia[i] = copia[j]
      copia[j] = temp
    }
    return copia
  }

  function voltearCarta(index) {
    if (cartasVolteadas.length === 2) return
    if (cartasVolteadas.includes(index)) return
    if (cartasEncontradas.includes(index)) return

    const nuevasVolteadas = [...cartasVolteadas, index]
    setCartasVolteadas(nuevasVolteadas)

    if (nuevasVolteadas.length === 2) {
      setMovimientos(movimientos + 1)
      verificarPareja(nuevasVolteadas)
    }
  }

  function verificarPareja(indices) {
    const [index1, index2] = indices
    const carta1 = cartas[index1]
    const carta2 = cartas[index2]

    if (carta1.emoji === carta2.emoji) {
      setCartasEncontradas([...cartasEncontradas, index1, index2])
      setCartasVolteadas([])
    } else {
      setTimeout(() => {
        setCartasVolteadas([])
      }, 1000)
    }
  }

  function cambiarNumParejas(e) {
    const num = parseInt(e.target.value)
    if (num >= 4 && num <= 16) {
      setNumParejas(num)
    }
  }

  function renderCartas() {
    return cartas.map((carta, index) => (
      <Carta
        key={index}
        carta={carta}
        onClick={() => voltearCarta(index)}
        volteada={cartasVolteadas.includes(index)}
        encontrada={cartasEncontradas.includes(index)}
      />
    ))
  }

  return (
    <div className="memory-container">
      <h1>🧠 Memory Game</h1>

      <div className="info-panel">
        <h2>Movimientos: {movimientos}</h2>
        {!juegoIniciado && (
          <div className="config">
            <label>
              Número de parejas (4-16):
              <input
                type="number"
                value={numParejas}
                onChange={cambiarNumParejas}
                min="4"
                max="16"
              />
            </label>
          </div>
        )}
      </div>

      {!juegoIniciado && (
        <button onClick={iniciarJuego} className="btn-iniciar">
          Iniciar Juego
        </button>
      )}

      {juegoIniciado && !juegoTerminado && (
        <div className="tablero-memory">
          {renderCartas()}
        </div>
      )}

      {juegoTerminado && (
        <div className="victoria">
          <h2>¡Felicidades! 🎉</h2>
          <h3>Completaste el juego en {movimientos} movimientos</h3>
          <button onClick={iniciarJuego} className="btn-reiniciar">
            Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  )
}
