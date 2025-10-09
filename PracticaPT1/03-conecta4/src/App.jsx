import { useState } from 'react'
import './App.css'

function Celda({ valor, onClick }) {
  const colorFicha = valor === 1 ? 'ficha-roja' : valor === 2 ? 'ficha-amarilla' : ''

  return (
    <div className="celda" onClick={onClick}>
      <div className={`ficha ${colorFicha}`}></div>
    </div>
  )
}

export default function Conecta4() {
  const FILAS = 6
  const COLUMNAS = 7
  const [tablero, setTablero] = useState(Array(FILAS).fill(null).map(() => Array(COLUMNAS).fill(0)))
  const [jugadorActual, setJugadorActual] = useState(1)
  const [ganador, setGanador] = useState(null)
  const [juegoTerminado, setJuegoTerminado] = useState(false)

  function colocarFicha(columna) {
    if (juegoTerminado || ganador) return

    const fila = encontrarFilaDisponible(columna)
    if (fila === -1) return

    const nuevoTablero = tablero.map(fila => [...fila])
    nuevoTablero[fila][columna] = jugadorActual

    setTablero(nuevoTablero)

    if (verificarGanador(nuevoTablero, fila, columna, jugadorActual)) {
      setGanador(jugadorActual)
      setJuegoTerminado(true)
    } else if (tableroLleno(nuevoTablero)) {
      setJuegoTerminado(true)
    } else {
      setJugadorActual(jugadorActual === 1 ? 2 : 1)
    }
  }

  function encontrarFilaDisponible(columna) {
    for (let fila = FILAS - 1; fila >= 0; fila--) {
      if (tablero[fila][columna] === 0) {
        return fila
      }
    }
    return -1
  }

  function tableroLleno(tablero) {
    return tablero[0].every(celda => celda !== 0)
  }

  function verificarGanador(tablero, fila, columna, jugador) {
    return verificarHorizontal(tablero, fila, jugador) ||
      verificarVertical(tablero, columna, jugador) ||
      verificarDiagonal(tablero, fila, columna, jugador)
  }

  function verificarHorizontal(tablero, fila, jugador) {
    let contador = 0
    for (let col = 0; col < COLUMNAS; col++) {
      if (tablero[fila][col] === jugador) {
        contador++
        if (contador === 4) return true
      } else {
        contador = 0
      }
    }
    return false
  }

  function verificarVertical(tablero, columna, jugador) {
    let contador = 0
    for (let fila = 0; fila < FILAS; fila++) {
      if (tablero[fila][columna] === jugador) {
        contador++
        if (contador === 4) return true
      } else {
        contador = 0
      }
    }
    return false
  }

  function verificarDiagonal(tablero, fila, columna, jugador) {
    return verificarDiagonalAscendente(tablero, jugador) ||
      verificarDiagonalDescendente(tablero, jugador)
  }

  function verificarDiagonalAscendente(tablero, jugador) {
    for (let fila = 3; fila < FILAS; fila++) {
      for (let col = 0; col < COLUMNAS - 3; col++) {
        if (tablero[fila][col] === jugador &&
          tablero[fila - 1][col + 1] === jugador &&
          tablero[fila - 2][col + 2] === jugador &&
          tablero[fila - 3][col + 3] === jugador) {
          return true
        }
      }
    }
    return false
  }

  function verificarDiagonalDescendente(tablero, jugador) {
    for (let fila = 0; fila < FILAS - 3; fila++) {
      for (let col = 0; col < COLUMNAS - 3; col++) {
        if (tablero[fila][col] === jugador &&
          tablero[fila + 1][col + 1] === jugador &&
          tablero[fila + 2][col + 2] === jugador &&
          tablero[fila + 3][col + 3] === jugador) {
          return true
        }
      }
    }
    return false
  }

  function reiniciarJuego() {
    setTablero(Array(FILAS).fill(null).map(() => Array(COLUMNAS).fill(0)))
    setJugadorActual(1)
    setGanador(null)
    setJuegoTerminado(false)
  }

  function renderTablero() {
    return tablero.map((fila, indiceFila) => (
      <div key={indiceFila} className="fila">
        {fila.map((celda, indiceColumna) => (
          <Celda
            key={indiceColumna}
            valor={celda}
            onClick={() => colocarFicha(indiceColumna)}
          />
        ))}
      </div>
    ))
  }

  return (
    <div className="conecta4-container">
      <h1>🔴 Conecta 4 🟡</h1>

      <div className="info-juego">
        {!juegoTerminado && !ganador && (
          <h2>
            Turno del jugador {jugadorActual === 1 ? '🔴 Rojo' : '🟡 Amarillo'}
          </h2>
        )}

        {ganador && (
          <h2 className="ganador">
            ¡Jugador {ganador === 1 ? '🔴 Rojo' : '🟡 Amarillo'} gana!
          </h2>
        )}

        {juegoTerminado && !ganador && (
          <h2 className="empate">¡Empate! El tablero está lleno</h2>
        )}
      </div>

      <div className="tablero">
        {renderTablero()}
      </div>

      {juegoTerminado && (
        <button onClick={reiniciarJuego} className="btn-reiniciar">
          Nueva Partida
        </button>
      )}
    </div>
  )
}
