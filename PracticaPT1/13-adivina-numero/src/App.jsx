import { useState } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function AdivinaNumero() {
  const [rangoMin, setRangoMin] = useState(1)
  const [rangoMax, setRangoMax] = useState(100)
  const [numeroSecreto, setNumeroSecreto] = useState(0)
  const [intento, setIntento] = useState('')
  const [intentos, setIntentos] = useState([])
  const [juegoIniciado, setJuegoIniciado] = useState(false)
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const [maxIntentos, setMaxIntentos] = useState(7)
  const [pista, setPista] = useState('')

  function iniciarJuego() {
    const numero = getRandomInt(rangoMin, rangoMax)
    setNumeroSecreto(numero)
    setIntentos([])
    setIntento('')
    setPista(`Adivina el número entre ${rangoMin} y ${rangoMax}`)
    setJuegoIniciado(true)
    setJuegoTerminado(false)
  }

  function verificarIntento() {
    const numeroIntento = parseInt(intento)

    if (isNaN(numeroIntento) || numeroIntento < rangoMin || numeroIntento > rangoMax) {
      setPista(`El número debe estar entre ${rangoMin} y ${rangoMax}`)
      return
    }

    const nuevoIntento = {
      numero: numeroIntento,
      distancia: Math.abs(numeroSecreto - numeroIntento)
    }

    const nuevosIntentos = [...intentos, nuevoIntento]
    setIntentos(nuevosIntentos)
    setIntento('')

    if (numeroIntento === numeroSecreto) {
      setPista('¡CORRECTO! ¡Adivinaste el número!')
      setJuegoTerminado(true)
    } else if (nuevosIntentos.length >= maxIntentos) {
      setPista(`Se acabaron los intentos. El número era ${numeroSecreto}`)
      setJuegoTerminado(true)
    } else {
      generarPista(numeroIntento, nuevosIntentos)
    }
  }

  function generarPista(numeroIntento, todosIntentos) {
    const distancia = Math.abs(numeroSecreto - numeroIntento)
    let mensajeCercania = ''

    if (distancia <= 5) {
      mensajeCercania = '¡Muy caliente! 🔥'
    } else if (distancia <= 10) {
      mensajeCercania = 'Caliente 🌡️'
    } else if (distancia <= 20) {
      mensajeCercania = 'Tibio 😐'
    } else if (distancia <= 30) {
      mensajeCercania = 'Frío ❄️'
    } else {
      mensajeCercania = '¡Muy frío! 🧊'
    }

    const direccion = numeroIntento < numeroSecreto ? 'El número es MAYOR' : 'El número es MENOR'

    if (todosIntentos.length > 1) {
      const distanciaAnterior = todosIntentos[todosIntentos.length - 2].distancia
      const mejorando = distancia < distanciaAnterior
      const tendencia = mejorando ? '📈 Te estás acercando' : '📉 Te estás alejando'
      setPista(`${direccion}. ${mensajeCercania}. ${tendencia}`)
    } else {
      setPista(`${direccion}. ${mensajeCercania}`)
    }
  }

  function cambiarIntento(e) {
    setIntento(e.target.value)
  }

  function cambiarRangoMin(e) {
    const min = parseInt(e.target.value)
    if (min >= 1) {
      setRangoMin(min)
    }
  }

  function cambiarRangoMax(e) {
    const max = parseInt(e.target.value)
    if (max > rangoMin) {
      setRangoMax(max)
    }
  }

  function cambiarMaxIntentos(e) {
    const max = parseInt(e.target.value)
    if (max >= 3 && max <= 15) {
      setMaxIntentos(max)
    }
  }

  function renderIntentos() {
    return intentos.map((int, index) => (
      <div key={index} className="intento-item">
        <span className="numero-intentado">{int.numero}</span>
        <span className="distancia">Distancia: {int.distancia}</span>
      </div>
    ))
  }

  const ganado = intentos.length > 0 && intentos[intentos.length - 1].numero === numeroSecreto

  return (
    <div className="adivina-container">
      <h1>🎯 Adivina el Número 🎯</h1>

      {!juegoIniciado && (
        <div className="config-inicial">
          <h2>Configurar Juego</h2>
          <label>
            Rango mínimo:
            <input type="number" value={rangoMin} onChange={cambiarRangoMin} min="1" />
          </label>
          <label>
            Rango máximo:
            <input type="number" value={rangoMax} onChange={cambiarRangoMax} min={rangoMin + 1} />
          </label>
          <label>
            Máximo intentos (3-15):
            <input type="number" value={maxIntentos} onChange={cambiarMaxIntentos} min="3" max="15" />
          </label>
          <button onClick={iniciarJuego} className="btn-iniciar">
            Iniciar Juego
          </button>
        </div>
      )}

      {juegoIniciado && (
        <>
          <div className="info-juego">
            <p>Intentos: {intentos.length} / {maxIntentos}</p>
            <div className="pista-actual">
              <h3>{pista}</h3>
            </div>
          </div>

          {!juegoTerminado && (
            <div className="input-area">
              <input
                type="number"
                value={intento}
                onChange={cambiarIntento}
                placeholder="Tu número"
                min={rangoMin}
                max={rangoMax}
                onKeyDown={(e) => {
                  if (e.key == 'Enter') {
                    verificarIntento()
                  }
                }}
              />
              <button onClick={verificarIntento} className="btn-verificar">
                Intentar
              </button>
            </div>
          )}

          <div className="historial">
            <h3>Historial de Intentos:</h3>
            <div className="lista-intentos">
              {renderIntentos()}
            </div>
          </div>

          {juegoTerminado && (
            <div className="resultado-final">
              <h2>{ganado ? '¡GANASTE! 🎉' : '¡PERDISTE! 😢'}</h2>
              <p>Número secreto: {numeroSecreto}</p>
              <p>Intentos usados: {intentos.length}</p>
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
