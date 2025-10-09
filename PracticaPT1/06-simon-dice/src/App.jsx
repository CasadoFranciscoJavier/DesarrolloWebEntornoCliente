import { useState, useEffect } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Boton({ color, activo, onClick }) {
  return (
    <div
      className={`boton-simon ${color} ${activo ? 'activo' : ''}`}
      onClick={onClick}
    ></div>
  )
}

export default function SimonDice() {
  const colores = ['rojo', 'verde', 'azul', 'amarillo']
  const [secuencia, setSecuencia] = useState([])
  const [secuenciaUsuario, setSecuenciaUsuario] = useState([])
  const [juegoIniciado, setJuegoIniciado] = useState(false)
  const [mostrandoSecuencia, setMostrandoSecuencia] = useState(false)
  const [colorActivo, setColorActivo] = useState(null)
  const [nivel, setNivel] = useState(0)
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const [mensaje, setMensaje] = useState('')

  function iniciarJuego() {
    const primerColor = colores[getRandomInt(0, colores.length - 1)]
    setSecuencia([primerColor])
    setSecuenciaUsuario([])
    setNivel(1)
    setJuegoIniciado(true)
    setJuegoTerminado(false)
    setMensaje('')
    setTimeout(() => mostrarSecuencia([primerColor]), 500)
  }

  function mostrarSecuencia(sec) {
    setMostrandoSecuencia(true)
    sec.forEach((color, index) => {
      setTimeout(() => {
        setColorActivo(color)
        setTimeout(() => setColorActivo(null), 400)
      }, index * 800)
    })

    setTimeout(() => {
      setMostrandoSecuencia(false)
    }, sec.length * 800)
  }

  function clickBoton(color) {
    if (mostrandoSecuencia || juegoTerminado) return

    const nuevaSecuencia = [...secuenciaUsuario, color]
    setSecuenciaUsuario(nuevaSecuencia)

    setColorActivo(color)
    setTimeout(() => setColorActivo(null), 200)

    const indiceActual = nuevaSecuencia.length - 1

    if (color !== secuencia[indiceActual]) {
      setJuegoTerminado(true)
      setMensaje('¡Perdiste! Secuencia incorrecta')
      setJuegoIniciado(false)
      return
    }

    if (nuevaSecuencia.length === secuencia.length) {
      setNivel(nivel + 1)
      setSecuenciaUsuario([])
      setTimeout(() => {
        const nuevoColor = colores[getRandomInt(0, colores.length - 1)]
        const nuevaSec = [...secuencia, nuevoColor]
        setSecuencia(nuevaSec)
        mostrarSecuencia(nuevaSec)
      }, 1000)
    }
  }

  return (
    <div className="simon-container">
      <h1>🎵 Simon Dice</h1>

      <div className="info-panel">
        <h2>Nivel: {nivel}</h2>
        {mostrandoSecuencia && <p className="estado">Observa la secuencia...</p>}
        {juegoIniciado && !mostrandoSecuencia && !juegoTerminado && (
          <p className="estado">Tu turno - Repite la secuencia</p>
        )}
        {mensaje && <p className="mensaje-error">{mensaje}</p>}
      </div>

      {!juegoIniciado && !juegoTerminado && (
        <button onClick={iniciarJuego} className="btn-iniciar">
          Iniciar Juego
        </button>
      )}

      {juegoIniciado && (
        <div className="tablero-simon">
          <div className="fila-simon">
            <Boton
              color="rojo"
              activo={colorActivo === 'rojo'}
              onClick={() => clickBoton('rojo')}
            />
            <Boton
              color="verde"
              activo={colorActivo === 'verde'}
              onClick={() => clickBoton('verde')}
            />
          </div>
          <div className="fila-simon">
            <Boton
              color="azul"
              activo={colorActivo === 'azul'}
              onClick={() => clickBoton('azul')}
            />
            <Boton
              color="amarillo"
              activo={colorActivo === 'amarillo'}
              onClick={() => clickBoton('amarillo')}
            />
          </div>
        </div>
      )}

      {juegoTerminado && (
        <div className="game-over">
          <h2>{mensaje}</h2>
          <h3>Nivel alcanzado: {nivel}</h3>
          <button onClick={iniciarJuego} className="btn-reiniciar">
            Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  )
}
