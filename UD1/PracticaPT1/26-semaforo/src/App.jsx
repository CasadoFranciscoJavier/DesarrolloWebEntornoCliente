import { useState, useEffect } from 'react'
import './App.css'

export default function Semaforo() {
  const [colorActivo, setColorActivo] = useState('rojo')
  const [automatico, setAutomatico] = useState(false)
  const [tiempoRojo, setTiempoRojo] = useState(5)
  const [tiempoAmarillo, setTiempoAmarillo] = useState(2)
  const [tiempoVerde, setTiempoVerde] = useState(5)
  const [contador, setContador] = useState(5)

  useEffect(() => {
    if (!automatico) return

    const intervalo = setInterval(() => {
      setContador(prev => {
        if (prev <= 1) {
          cambiarSemaforo()
          return obtenerTiempo()
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [automatico, colorActivo])

  function obtenerTiempo() {
    if (colorActivo === 'rojo') return tiempoAmarillo
    if (colorActivo === 'amarillo') return tiempoVerde
    return tiempoRojo
  }

  function cambiarSemaforo() {
    if (colorActivo === 'rojo') {
      setColorActivo('amarillo')
    } else if (colorActivo === 'amarillo') {
      setColorActivo('verde')
    } else {
      setColorActivo('rojo')
    }
  }

  function iniciarAutomatico() {
    setAutomatico(true)
    setContador(colorActivo === 'rojo' ? tiempoRojo : colorActivo === 'amarillo' ? tiempoAmarillo : tiempoVerde)
  }

  function detenerAutomatico() {
    setAutomatico(false)
  }

  function cambiarColor(color) {
    if (automatico) return
    setColorActivo(color)
  }

  function cambiarTiempoRojo(e) {
    const tiempo = parseInt(e.target.value)
    if (tiempo >= 1 && tiempo <= 30) {
      setTiempoRojo(tiempo)
    }
  }

  function cambiarTiempoAmarillo(e) {
    const tiempo = parseInt(e.target.value)
    if (tiempo >= 1 && tiempo <= 10) {
      setTiempoAmarillo(tiempo)
    }
  }

  function cambiarTiempoVerde(e) {
    const tiempo = parseInt(e.target.value)
    if (tiempo >= 1 && tiempo <= 30) {
      setTiempoVerde(tiempo)
    }
  }

  return (
    <div className="semaforo-container">
      <h1>🚦 Semáforo 🚦</h1>

      <div className="semaforo">
        <div
          className={`luz roja ${colorActivo === 'rojo' ? 'activa' : ''}`}
          onClick={() => cambiarColor('rojo')}
        >
          {colorActivo === 'rojo' && automatico && <span className="contador">{contador}</span>}
        </div>
        <div
          className={`luz amarilla ${colorActivo === 'amarillo' ? 'activa' : ''}`}
          onClick={() => cambiarColor('amarillo')}
        >
          {colorActivo === 'amarillo' && automatico && <span className="contador">{contador}</span>}
        </div>
        <div
          className={`luz verde ${colorActivo === 'verde' ? 'activa' : ''}`}
          onClick={() => cambiarColor('verde')}
        >
          {colorActivo === 'verde' && automatico && <span className="contador">{contador}</span>}
        </div>
      </div>

      <div className="info">
        <h3>Color actual: {colorActivo.toUpperCase()}</h3>
        <p>Modo: {automatico ? 'Automático' : 'Manual'}</p>
      </div>

      <div className="controles">
        {!automatico ? (
          <>
            <button onClick={() => cambiarColor('rojo')} className="btn-rojo">
              Rojo
            </button>
            <button onClick={() => cambiarColor('amarillo')} className="btn-amarillo">
              Amarillo
            </button>
            <button onClick={() => cambiarColor('verde')} className="btn-verde">
              Verde
            </button>
            <button onClick={iniciarAutomatico} className="btn-auto">
              Iniciar Automático
            </button>
          </>
        ) : (
          <button onClick={detenerAutomatico} className="btn-detener">
            Detener Automático
          </button>
        )}
      </div>

      {!automatico && (
        <div className="configuracion">
          <h3>Configurar tiempos (segundos):</h3>
          <label>
            Rojo (1-30s):
            <input
              type="number"
              value={tiempoRojo}
              onChange={cambiarTiempoRojo}
              min="1"
              max="30"
            />
          </label>
          <label>
            Amarillo (1-10s):
            <input
              type="number"
              value={tiempoAmarillo}
              onChange={cambiarTiempoAmarillo}
              min="1"
              max="10"
            />
          </label>
          <label>
            Verde (1-30s):
            <input
              type="number"
              value={tiempoVerde}
              onChange={cambiarTiempoVerde}
              min="1"
              max="30"
            />
          </label>
        </div>
      )}
    </div>
  )
}
