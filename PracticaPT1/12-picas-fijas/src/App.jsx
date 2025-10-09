import { useState } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function PicasFijas() {
  const [longitudCodigo, setLongitudCodigo] = useState(4)
  const [maxNumero, setMaxNumero] = useState(7)
  const [codigoSecreto, setCodigoSecreto] = useState([])
  const [intentoActual, setIntentoActual] = useState('')
  const [intentos, setIntentos] = useState([])
  const [juegoIniciado, setJuegoIniciado] = useState(false)
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const [maxIntentos, setMaxIntentos] = useState(10)

  function iniciarJuego() {
    const codigo = []
    for (let i = 0; i < longitudCodigo; i++) {
      codigo.push(getRandomInt(0, maxNumero))
    }
    setCodigoSecreto(codigo)
    setIntentos([])
    setIntentoActual('')
    setJuegoIniciado(true)
    setJuegoTerminado(false)
  }

  function verificarIntento() {
    if (intentoActual.length !== longitudCodigo) return

    const numerosIntento = intentoActual.split('').map(n => parseInt(n))
    const picas = calcularPicas(numerosIntento, codigoSecreto)
    const fijas = calcularFijas(numerosIntento, codigoSecreto)

    const nuevoIntento = {
      numeros: numerosIntento,
      picas: picas,
      fijas: fijas
    }

    const nuevosIntentos = [...intentos, nuevoIntento]
    setIntentos(nuevosIntentos)
    setIntentoActual('')

    if (fijas === longitudCodigo) {
      setJuegoTerminado(true)
    } else if (nuevosIntentos.length >= maxIntentos) {
      setJuegoTerminado(true)
    }
  }

  function calcularFijas(intento, secreto) {
    let fijas = 0
    for (let i = 0; i < intento.length; i++) {
      if (intento[i] === secreto[i]) {
        fijas++
      }
    }
    return fijas
  }

  function calcularPicas(intento, secreto) {
    let picas = 0
    for (let i = 0; i < intento.length; i++) {
      if (intento[i] !== secreto[i] && secreto.includes(intento[i])) {
        picas++
      }
    }
    return picas
  }

  function agregarNumero(num) {
    if (intentoActual.length < longitudCodigo) {
      setIntentoActual(intentoActual + num)
    }
  }

  function borrar() {
    setIntentoActual(intentoActual.slice(0, -1))
  }

  function cambiarLongitud(e) {
    const longitud = parseInt(e.target.value)
    if (longitud >= 3 && longitud <= 6) {
      setLongitudCodigo(longitud)
    }
  }

  function cambiarMaxNumero(e) {
    const max = parseInt(e.target.value)
    if (max >= 5 && max <= 9) {
      setMaxNumero(max)
    }
  }

  function cambiarMaxIntentos(e) {
    const max = parseInt(e.target.value)
    if (max >= 5 && max <= 15) {
      setMaxIntentos(max)
    }
  }

  function renderTeclado() {
    const numeros = []
    for (let i = 0; i <= maxNumero; i++) {
      numeros.push(
        <button
          key={i}
          onClick={() => agregarNumero(i)}
          className="tecla-numero"
          disabled={juegoTerminado}
        >
          {i}
        </button>
      )
    }
    return numeros
  }

  function renderIntentos() {
    return intentos.map((intento, index) => (
      <div key={index} className="intento-fila">
        <div className="numeros-intento">
          {intento.numeros.map((num, i) => (
            <span key={i} className="numero-casilla">{num}</span>
          ))}
        </div>
        <div className="resultado-intento">
          <span className="fijas">{intento.fijas} Fijas</span>
          <span className="picas">{intento.picas} Picas</span>
        </div>
      </div>
    ))
  }

  const ganado = intentos.length > 0 && intentos[intentos.length - 1].fijas === longitudCodigo

  return (
    <div className="picas-container">
      <h1>🔢 Picas y Fijas 🔢</h1>

      {!juegoIniciado && (
        <div className="config-inicial">
          <h2>Configurar Juego</h2>
          <label>
            Longitud código (3-6):
            <input type="number" value={longitudCodigo} onChange={cambiarLongitud} min="3" max="6" />
          </label>
          <label>
            Número máximo (5-9):
            <input type="number" value={maxNumero} onChange={cambiarMaxNumero} min="5" max="9" />
          </label>
          <label>
            Máximo intentos (5-15):
            <input type="number" value={maxIntentos} onChange={cambiarMaxIntentos} min="5" max="15" />
          </label>
          <button onClick={iniciarJuego} className="btn-iniciar">
            Iniciar Juego
          </button>
        </div>
      )}

      {juegoIniciado && (
        <>
          <div className="info-juego">
            <p>Intento {intentos.length + 1} de {maxIntentos}</p>
            <p>Adivina el código de {longitudCodigo} números (0-{maxNumero})</p>
          </div>

          <div className="reglas">
            <p><strong>Fijas:</strong> Número correcto en posición correcta</p>
            <p><strong>Picas:</strong> Número correcto en posición incorrecta</p>
          </div>

          <div className="intento-actual">
            <h3>Tu intento:</h3>
            <div className="display-intento">
              {Array(longitudCodigo).fill(0).map((_, i) => (
                <div key={i} className="casilla-numero">
                  {intentoActual[i] || '_'}
                </div>
              ))}
            </div>
          </div>

          {!juegoTerminado && (
            <>
              <div className="teclado-numerico">
                {renderTeclado()}
              </div>

              <div className="controles-juego">
                <button onClick={borrar} className="btn-borrar">
                  ⌫ Borrar
                </button>
                <button
                  onClick={verificarIntento}
                  className="btn-verificar"
                  disabled={intentoActual.length !== longitudCodigo}
                >
                  Verificar
                </button>
              </div>
            </>
          )}

          <div className="historial-intentos">
            <h3>Historial de Intentos:</h3>
            {renderIntentos()}
          </div>

          {juegoTerminado && (
            <div className="resultado-final">
              <h2>{ganado ? '¡GANASTE! 🎉' : '¡PERDISTE! 😢'}</h2>
              {!ganado && (
                <p>El código era: {codigoSecreto.join(' ')}</p>
              )}
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
