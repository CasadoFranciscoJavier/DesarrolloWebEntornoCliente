import { useState, useEffect } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function CarreraCaballos() {
  const [numCaballos, setNumCaballos] = useState(4)
  const [posiciones, setPosiciones] = useState([])
  const [carreraIniciada, setCarreraIniciada] = useState(false)
  const [ganador, setGanador] = useState(null)
  const [saldoInicial] = useState(100)
  const [saldoActual, setSaldoActual] = useState(100)
  const [apuestaSeleccionada, setApuestaSeleccionada] = useState(null)
  const [montoApuesta, setMontoApuesta] = useState(10)

  const META = 100
  const caballosEmojis = ['🐴', '🐎', '🦄', '🏇', '🦓', '🐫']

  useEffect(() => {
    inicializarCarrera()
  }, [numCaballos])

  useEffect(() => {
    if (!carreraIniciada || ganador) return

    const intervalo = setInterval(() => {
      avanzarCaballos()
    }, 200)

    return () => clearInterval(intervalo)
  }, [carreraIniciada, posiciones, ganador])

  function inicializarCarrera() {
    const posicionesIniciales = Array(numCaballos).fill(0)
    setPosiciones(posicionesIniciales)
    setGanador(null)
    setCarreraIniciada(false)
    setApuestaSeleccionada(null)
  }

  function avanzarCaballos() {
    setPosiciones(posicionesAnteriores => {
      const nuevasPosiciones = posicionesAnteriores.map(pos => {
        const avance = getRandomInt(1, 5)
        return pos + avance
      })

      const hayGanador = nuevasPosiciones.some(pos => pos >= META)
      if (hayGanador) {
        const indiceGanador = nuevasPosiciones.findIndex(pos => pos >= META)
        setGanador(indiceGanador)
        setCarreraIniciada(false)
        procesarApuesta(indiceGanador)
      }

      return nuevasPosiciones
    })
  }

  function procesarApuesta(indiceGanador) {
    if (apuestaSeleccionada === indiceGanador) {
      const ganancia = montoApuesta * numCaballos
      setSaldoActual(saldoActual + ganancia)
    }
  }

  function iniciarCarrera() {
    if (apuestaSeleccionada === null) {
      alert('Debes apostar primero')
      return
    }

    if (montoApuesta > saldoActual) {
      alert('No tienes suficiente saldo')
      return
    }

    setSaldoActual(saldoActual - montoApuesta)
    setCarreraIniciada(true)
  }

  function hacerApuesta(indiceCaballo) {
    if (carreraIniciada) return
    setApuestaSeleccionada(indiceCaballo)
  }

  function cambiarNumCaballos(e) {
    const num = parseInt(e.target.value)
    if (num >= 2 && num <= 6 && !carreraIniciada) {
      setNumCaballos(num)
    }
  }

  function cambiarMontoApuesta(e) {
    const monto = parseInt(e.target.value)
    if (monto > 0) {
      setMontoApuesta(monto)
    }
  }

  function reiniciarJuego() {
    setSaldoActual(saldoInicial)
    inicializarCarrera()
  }

  function renderPista() {
    return posiciones.map((posicion, index) => {
      const porcentaje = (posicion / META) * 100
      const enMeta = posicion >= META

      return (
        <div key={index} className="pista">
          <button
            onClick={() => hacerApuesta(index)}
            disabled={carreraIniciada}
            className={`boton-apuesta ${apuestaSeleccionada === index ? 'apuesta-activa' : ''}`}
          >
            Caballo {index + 1} ({numCaballos}x)
          </button>
          <div className="pista-fondo">
            <div
              className="caballo"
              style={{ left: `${Math.min(porcentaje, 100)}%` }}
            >
              {caballosEmojis[index]}
            </div>
            <div className="meta">🏁</div>
          </div>
          {enMeta && ganador === index && <span className="badge-ganador">🏆 GANADOR</span>}
        </div>
      )
    })
  }

  return (
    <div className="container">
      <h1>🐴 Carrera de Caballos 🏁</h1>

      <div className="panel-control">
        <div className="config">
          <label>
            Número de caballos (2-6):
            <input
              type="number"
              value={numCaballos}
              onChange={cambiarNumCaballos}
              min="2"
              max="6"
              disabled={carreraIniciada}
            />
          </label>

          <label>
            Monto apuesta:
            <input
              type="number"
              value={montoApuesta}
              onChange={cambiarMontoApuesta}
              min="1"
              max={saldoActual}
              disabled={carreraIniciada}
            />
          </label>
        </div>

        <div className="saldo">
          <h3>💰 Saldo: ${saldoActual}</h3>
          {apuestaSeleccionada !== null && !carreraIniciada && (
            <p>Apostando ${montoApuesta} al Caballo {apuestaSeleccionada + 1}</p>
          )}
        </div>

        <div className="botones">
          {!carreraIniciada && ganador === null && (
            <button onClick={iniciarCarrera} className="btn-iniciar">
              ¡Iniciar Carrera!
            </button>
          )}

          {ganador !== null && (
            <>
              <h2>
                {apuestaSeleccionada === ganador
                  ? `¡GANASTE! +$${montoApuesta * numCaballos}`
                  : `Perdiste -$${montoApuesta}`}
              </h2>
              <button onClick={inicializarCarrera} className="btn-reiniciar">
                Nueva Carrera
              </button>
            </>
          )}

          {saldoActual === 0 && (
            <button onClick={reiniciarJuego} className="btn-reset">
              Reiniciar Juego
            </button>
          )}
        </div>
      </div>

      <div className="pistas-container">
        {renderPista()}
      </div>
    </div>
  )
}
