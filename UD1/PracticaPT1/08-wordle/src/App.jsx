import { useState, useEffect } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Wordle() {
  const palabras = ['REACT', 'HOOKS', 'STATE', 'PROPS', 'FETCH', 'ARRAY', 'CLASS', 'ASYNC', 'AWAIT', 'CONST']
  const [palabraSecreta, setPalabraSecreta] = useState('')
  const [intentos, setIntentos] = useState([])
  const [intentoActual, setIntentoActual] = useState('')
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const [ganado, setGanado] = useState(false)
  const [numIntentos, setNumIntentos] = useState(6)
  const [longitudPalabra, setLongitudPalabra] = useState(5)

  useEffect(() => {
    iniciarJuego()
  }, [])

  useEffect(() => {
    if (!juegoTerminado) return

    const manejarTecla = (e) => {
      if (e.key === 'Enter' && intentoActual.length === longitudPalabra) {
        enviarIntento()
      } else if (e.key === 'Backspace') {
        setIntentoActual(intentoActual.slice(0, -1))
      } else if (e.key.length === 1 && e.key.match(/[a-z]/i) && intentoActual.length < longitudPalabra) {
        setIntentoActual(intentoActual + e.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', manejarTecla)
    return () => window.removeEventListener('keydown', manejarTecla)
  }, [intentoActual, juegoTerminado, longitudPalabra])

  function iniciarJuego() {
    const palabrasFiltradas = palabras.filter(p => p.length === longitudPalabra)
    const palabra = palabrasFiltradas[getRandomInt(0, palabrasFiltradas.length - 1)]
    setPalabraSecreta(palabra)
    setIntentos([])
    setIntentoActual('')
    setJuegoTerminado(false)
    setGanado(false)
  }

  function enviarIntento() {
    if (intentoActual.length !== longitudPalabra) return

    const nuevoIntento = {
      palabra: intentoActual,
      colores: obtenerColores(intentoActual)
    }

    const nuevosIntentos = [...intentos, nuevoIntento]
    setIntentos(nuevosIntentos)
    setIntentoActual('')

    if (intentoActual === palabraSecreta) {
      setGanado(true)
      setJuegoTerminado(true)
    } else if (nuevosIntentos.length >= numIntentos) {
      setJuegoTerminado(true)
    }
  }

  function obtenerColores(palabra) {
    const colores = Array(longitudPalabra).fill('gris')
    const letrasSecreta = palabraSecreta.split('')
    const letrasIntento = palabra.split('')

    letrasIntento.forEach((letra, i) => {
      if (letra === letrasSecreta[i]) {
        colores[i] = 'verde'
        letrasSecreta[i] = null
      }
    })

    letrasIntento.forEach((letra, i) => {
      if (colores[i] === 'gris' && letrasSecreta.includes(letra)) {
        colores[i] = 'amarillo'
        letrasSecreta[letrasSecreta.indexOf(letra)] = null
      }
    })

    return colores
  }

  function clickLetra(letra) {
    if (juegoTerminado) return
    if (intentoActual.length < longitudPalabra) {
      setIntentoActual(intentoActual + letra)
    }
  }

  function borrar() {
    setIntentoActual(intentoActual.slice(0, -1))
  }

  function cambiarLongitud(e) {
    const longitud = parseInt(e.target.value)
    if (longitud >= 4 && longitud <= 6) {
      setLongitudPalabra(longitud)
    }
  }

  function cambiarNumIntentos(e) {
    const num = parseInt(e.target.value)
    if (num >= 4 && num <= 8) {
      setNumIntentos(num)
    }
  }

  function renderTeclado() {
    const filas = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ]

    return filas.map((fila, indexFila) => (
      <div key={indexFila} className="fila-teclado">
        {fila.map(letra => (
          <button
            key={letra}
            onClick={() => clickLetra(letra)}
            className="tecla"
            disabled={juegoTerminado}
          >
            {letra}
          </button>
        ))}
      </div>
    ))
  }

  function renderIntentos() {
    const filas = []

    intentos.forEach((intento, index) => {
      filas.push(
        <div key={index} className="fila-intento">
          {intento.palabra.split('').map((letra, i) => (
            <div key={i} className={`celda-letra ${intento.colores[i]}`}>
              {letra}
            </div>
          ))}
        </div>
      )
    })

    if (!juegoTerminado && intentos.length < numIntentos) {
      filas.push(
        <div key="actual" className="fila-intento">
          {Array(longitudPalabra).fill(0).map((_, i) => (
            <div key={i} className="celda-letra">
              {intentoActual[i] || ''}
            </div>
          ))}
        </div>
      )
    }

    while (filas.length < numIntentos) {
      filas.push(
        <div key={`empty-${filas.length}`} className="fila-intento">
          {Array(longitudPalabra).fill(0).map((_, i) => (
            <div key={i} className="celda-letra"></div>
          ))}
        </div>
      )
    }

    return filas
  }

  return (
    <div className="wordle-container">
      <h1>📝 Wordle</h1>

      {palabraSecreta === '' && (
        <div className="config-inicial">
          <h2>Configurar Juego</h2>
          <label>
            Longitud palabra (4-6):
            <input type="number" value={longitudPalabra} onChange={cambiarLongitud} min="4" max="6" />
          </label>
          <label>
            Número de intentos (4-8):
            <input type="number" value={numIntentos} onChange={cambiarNumIntentos} min="4" max="8" />
          </label>
          <button onClick={iniciarJuego} className="btn-iniciar">
            Iniciar Juego
          </button>
        </div>
      )}

      {palabraSecreta !== '' && (
        <>
          <div className="info-wordle">
            <p>Intento: {intentos.length}/{numIntentos}</p>
          </div>

          <div className="tablero-wordle">
            {renderIntentos()}
          </div>

          {!juegoTerminado && (
            <>
              <div className="controles-wordle">
                <button onClick={borrar} className="btn-borrar">
                  ⌫ Borrar
                </button>
                <button onClick={enviarIntento} className="btn-enviar" disabled={intentoActual.length !== longitudPalabra}>
                  Enviar
                </button>
              </div>

              <div className="teclado">
                {renderTeclado()}
              </div>
            </>
          )}

          {juegoTerminado && (
            <div className="resultado-wordle">
              <h2>{ganado ? '¡Ganaste! 🎉' : '¡Perdiste! 😢'}</h2>
              {!ganado && <p>La palabra era: <strong>{palabraSecreta}</strong></p>}
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
