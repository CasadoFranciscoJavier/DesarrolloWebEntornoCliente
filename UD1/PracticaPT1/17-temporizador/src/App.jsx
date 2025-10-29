import { useState, useEffect } from 'react'
import './App.css'

export default function Temporizador() {
  const [segundos, setSegundos] = useState(0)
  const [minutos, setMinutos] = useState(0)
  const [horas, setHoras] = useState(0)
  const [tiempoRestante, setTiempoRestante] = useState(0)
  const [activo, setActivo] = useState(false)
  const [modo, setModo] = useState('temporizador')
  const [cronometroTiempo, setCronometroTiempo] = useState(0)

  useEffect(() => {
    let intervalo = null

    if (activo && modo === 'temporizador' && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante(tiempo => {
          if (tiempo <= 1) {
            setActivo(false)
            return 0
          }
          return tiempo - 1
        })
      }, 1000)
    } else if (activo && modo === 'cronometro') {
      intervalo = setInterval(() => {
        setCronometroTiempo(tiempo => tiempo + 1)
      }, 1000)
    }

    return () => {
      if (intervalo) {
        clearInterval(intervalo)
      }
    }
  }, [activo, modo, tiempoRestante])

  function iniciarTemporizador() {
    const tiempoTotal = (horas * 3600) + (minutos * 60) + segundos
    if (tiempoTotal > 0) {
      setTiempoRestante(tiempoTotal)
      setActivo(true)
    }
  }

  function pausar() {
    setActivo(false)
  }

  function reiniciar() {
    setActivo(false)
    if (modo === 'temporizador') {
      setTiempoRestante(0)
      setSegundos(0)
      setMinutos(0)
      setHoras(0)
    } else {
      setCronometroTiempo(0)
    }
  }

  function reanudar() {
    setActivo(true)
  }

  function cambiarModo(nuevoModo) {
    setActivo(false)
    setModo(nuevoModo)
    setTiempoRestante(0)
    setCronometroTiempo(0)
    setSegundos(0)
    setMinutos(0)
    setHoras(0)
  }

  function formatearTiempo(totalSegundos) {
    const h = Math.floor(totalSegundos / 3600)
    const m = Math.floor((totalSegundos % 3600) / 60)
    const s = totalSegundos % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  function agregarTiempoRapido(mins) {
    setMinutos(mins)
    setSegundos(0)
    setHoras(0)
  }

  return (
    <div className="temporizador-container">
      <h1>Temporizador y Cronómetro</h1>

      <div className="selector-modo">
        <button
          onClick={() => cambiarModo('temporizador')}
          className={modo === 'temporizador' ? 'activo' : ''}
        >
          Temporizador
        </button>
        <button
          onClick={() => cambiarModo('cronometro')}
          className={modo === 'cronometro' ? 'activo' : ''}
        >
          Cronómetro
        </button>
      </div>

      {modo === 'temporizador' && (
        <div className="temporizador-content">
          {!activo && tiempoRestante === 0 && (
            <>
              <div className="config-tiempo">
                <div className="input-tiempo">
                  <label>Horas</label>
                  <input
                    type="number"
                    value={horas}
                    onChange={(e) => setHoras(Math.max(0, parseInt(e.target.value) || 0))}
                    min="0"
                  />
                </div>
                <div className="input-tiempo">
                  <label>Minutos</label>
                  <input
                    type="number"
                    value={minutos}
                    onChange={(e) => setMinutos(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    min="0"
                    max="59"
                  />
                </div>
                <div className="input-tiempo">
                  <label>Segundos</label>
                  <input
                    type="number"
                    value={segundos}
                    onChange={(e) => setSegundos(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    min="0"
                    max="59"
                  />
                </div>
              </div>

              <div className="tiempos-rapidos">
                <button onClick={() => agregarTiempoRapido(1)}>1 min</button>
                <button onClick={() => agregarTiempoRapido(5)}>5 min</button>
                <button onClick={() => agregarTiempoRapido(10)}>10 min</button>
                <button onClick={() => agregarTiempoRapido(15)}>15 min</button>
              </div>
            </>
          )}

          <div className="display-tiempo">
            {formatearTiempo(tiempoRestante)}
          </div>

          <div className="controles">
            {!activo && tiempoRestante === 0 && (
              <button onClick={iniciarTemporizador} className="btn-iniciar">
                Iniciar
              </button>
            )}
            {activo && (
              <button onClick={pausar} className="btn-pausar">
                Pausar
              </button>
            )}
            {!activo && tiempoRestante > 0 && (
              <>
                <button onClick={reanudar} className="btn-reanudar">
                  Reanudar
                </button>
                <button onClick={reiniciar} className="btn-reiniciar">
                  Reiniciar
                </button>
              </>
            )}
          </div>

          {tiempoRestante === 0 && !activo && tiempoRestante !== (horas * 3600 + minutos * 60 + segundos) && (horas + minutos + segundos > 0) && (
            <div className="mensaje-final">
              ¡Tiempo terminado! ⏰
            </div>
          )}
        </div>
      )}

      {modo === 'cronometro' && (
        <div className="cronometro-content">
          <div className="display-tiempo">
            {formatearTiempo(cronometroTiempo)}
          </div>

          <div className="controles">
            {!activo && cronometroTiempo === 0 && (
              <button onClick={() => setActivo(true)} className="btn-iniciar">
                Iniciar
              </button>
            )}
            {activo && (
              <button onClick={pausar} className="btn-pausar">
                Pausar
              </button>
            )}
            {!activo && cronometroTiempo > 0 && (
              <>
                <button onClick={reanudar} className="btn-reanudar">
                  Reanudar
                </button>
                <button onClick={reiniciar} className="btn-reiniciar">
                  Reiniciar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
