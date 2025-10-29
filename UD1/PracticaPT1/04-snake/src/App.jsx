import { useState, useEffect } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Snake() {
  const [tamanioCuadricula, setTamanioCuadricula] = useState(20)
  const TAMANIO_CELDA = 20
  const VELOCIDAD_INICIAL = 150

  const [serpiente, setSerpiente] = useState([{ x: 10, y: 10 }])
  const [direccion, setDireccion] = useState({ x: 1, y: 0 })
  const [comida, setComida] = useState({ x: 15, y: 15 })
  const [juegoIniciado, setJuegoIniciado] = useState(false)
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const [puntuacion, setPuntuacion] = useState(0)
  const [velocidad, setVelocidad] = useState(VELOCIDAD_INICIAL)

  useEffect(() => {
    if (!juegoIniciado || juegoTerminado) return

    const intervalo = setInterval(() => {
      moverSerpiente()
    }, velocidad)

    return () => clearInterval(intervalo)
  }, [serpiente, direccion, juegoIniciado, juegoTerminado, velocidad])

  useEffect(() => {
    if (!juegoIniciado) return

    const manejarTecla = (e) => {
      cambiarDireccion(e.key)
    }

    window.addEventListener('keydown', manejarTecla)
    return () => window.removeEventListener('keydown', manejarTecla)
  }, [direccion, juegoIniciado])

  function iniciarJuego() {
    const posicionInicial = Math.floor(tamanioCuadricula / 2)
    setSerpiente([{ x: posicionInicial, y: posicionInicial }])
    setDireccion({ x: 1, y: 0 })
    generarComida()
    setJuegoIniciado(true)
    setJuegoTerminado(false)
    setPuntuacion(0)
    setVelocidad(VELOCIDAD_INICIAL)
  }

  function cambiarDireccion(tecla) {
    if (tecla === 'ArrowUp' && direccion.y === 0) {
      setDireccion({ x: 0, y: -1 })
    } else if (tecla === 'ArrowDown' && direccion.y === 0) {
      setDireccion({ x: 0, y: 1 })
    } else if (tecla === 'ArrowLeft' && direccion.x === 0) {
      setDireccion({ x: -1, y: 0 })
    } else if (tecla === 'ArrowRight' && direccion.x === 0) {
      setDireccion({ x: 1, y: 0 })
    }
  }

  function moverSerpiente() {
    const cabeza = { ...serpiente[0] }
    cabeza.x += direccion.x
    cabeza.y += direccion.y

    if (verificarColision(cabeza)) {
      setJuegoTerminado(true)
      setJuegoIniciado(false)
      return
    }

    const nuevaSerpiente = [cabeza, ...serpiente]

    if (cabeza.x === comida.x && cabeza.y === comida.y) {
      setPuntuacion(puntuacion + 10)
      setVelocidad(velocidad > 50 ? velocidad - 5 : 50)
      generarComida()
    } else {
      nuevaSerpiente.pop()
    }

    setSerpiente(nuevaSerpiente)
  }

  function verificarColision(cabeza) {
    if (cabeza.x < 0 || cabeza.x >= tamanioCuadricula || cabeza.y < 0 || cabeza.y >= tamanioCuadricula) {
      return true
    }

    const colisionConsigo = serpiente.some(segmento => segmento.x === cabeza.x && segmento.y === cabeza.y)
    return colisionConsigo
  }

  function generarComida() {
    let nuevaComida = {
      x: getRandomInt(0, tamanioCuadricula - 1),
      y: getRandomInt(0, tamanioCuadricula - 1)
    }

    while (serpiente.some(segmento => segmento.x === nuevaComida.x && segmento.y === nuevaComida.y)) {
      nuevaComida = {
        x: getRandomInt(0, tamanioCuadricula - 1),
        y: getRandomInt(0, tamanioCuadricula - 1)
      }
    }

    setComida(nuevaComida)
  }

  function cambiarTamanio(e) {
    const nuevoTamanio = parseInt(e.target.value)
    if (nuevoTamanio >= 10 && nuevoTamanio <= 30) {
      setTamanioCuadricula(nuevoTamanio)
    }
  }

  function esCabeza(x, y) {
    return serpiente[0].x === x && serpiente[0].y === y
  }

  function esCuerpo(x, y) {
    return serpiente.slice(1).some(segmento => segmento.x === x && segmento.y === y)
  }

  function esComida(x, y) {
    return comida.x === x && comida.y === y
  }

  function renderCuadricula() {
    const filas = []
    for (let y = 0; y < tamanioCuadricula; y++) {
      const celdas = []
      for (let x = 0; x < tamanioCuadricula; x++) {
        let clase = 'celda'
        if (esCabeza(x, y)) clase += ' cabeza-serpiente'
        else if (esCuerpo(x, y)) clase += ' cuerpo-serpiente'
        else if (esComida(x, y)) clase += ' comida'

        celdas.push(<div key={`${x}-${y}`} className={clase}></div>)
      }
      filas.push(
        <div key={y} className="fila-snake">
          {celdas}
        </div>
      )
    }
    return filas
  }

  return (
    <div className="snake-container">
      <h1>🐍 Snake</h1>

      <div className="info-panel">
        <h2>Puntuación: {puntuacion}</h2>
        {!juegoIniciado && !juegoTerminado && (
          <div className="config">
            <label>
              Tamaño cuadrícula ({tamanioCuadricula}x{tamanioCuadricula}):
              <input
                type="range"
                value={tamanioCuadricula}
                onChange={cambiarTamanio}
                min="10"
                max="30"
              />
            </label>
          </div>
        )}
      </div>

      {!juegoIniciado && !juegoTerminado && (
        <button onClick={iniciarJuego} className="btn-iniciar">
          Iniciar Juego
        </button>
      )}

      {juegoIniciado && (
        <>
          <div className="instrucciones">
            <p>Usa las flechas del teclado para moverte</p>
          </div>
          <div
            className="cuadricula"
            style={{
              width: `${tamanioCuadricula * TAMANIO_CELDA}px`,
              height: `${tamanioCuadricula * TAMANIO_CELDA}px`
            }}
          >
            {renderCuadricula()}
          </div>
        </>
      )}

      {juegoTerminado && (
        <div className="game-over">
          <h2>¡Game Over!</h2>
          <h3>Puntuación final: {puntuacion}</h3>
          <button onClick={iniciarJuego} className="btn-reiniciar">
            Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  )
}
