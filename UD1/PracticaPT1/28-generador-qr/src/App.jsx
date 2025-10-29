import { useState } from 'react'
import './App.css'

export default function TablaMultiplicar() {
  const [numero, setNumero] = useState(5)
  const [hasta, setHasta] = useState(10)
  const [mostrarResultados, setMostrarResultados] = useState(true)
  const [modoTest, setModoTest] = useState(false)
  const [respuestas, setRespuestas] = useState({})
  const [verificado, setVerificado] = useState(false)
  const [rangoInicio, setRangoInicio] = useState(1)
  const [rangoFin, setRangoFin] = useState(10)

  function cambiarNumero(e) {
    const num = parseInt(e.target.value)
    if (num >= 1 && num <= 20) {
      setNumero(num)
      setRespuestas({})
      setVerificado(false)
    }
  }

  function cambiarHasta(e) {
    const num = parseInt(e.target.value)
    if (num >= 1 && num <= 20) {
      setHasta(num)
      setRespuestas({})
      setVerificado(false)
    }
  }

  function cambiarRangoInicio(e) {
    const num = parseInt(e.target.value)
    if (num >= 1 && num <= 20) {
      setRangoInicio(num)
      setRespuestas({})
      setVerificado(false)
    }
  }

  function cambiarRangoFin(e) {
    const num = parseInt(e.target.value)
    if (num >= 1 && num <= 20) {
      setRangoFin(num)
      setRespuestas({})
      setVerificado(false)
    }
  }

  function activarModoTest() {
    setModoTest(true)
    setMostrarResultados(false)
    setRespuestas({})
    setVerificado(false)
  }

  function cambiarRespuesta(i, valor) {
    setRespuestas({
      ...respuestas,
      [i]: valor
    })
  }

  function verificarRespuestas() {
    setVerificado(true)
  }

  function reiniciarTest() {
    setRespuestas({})
    setVerificado(false)
  }

  function volverModoNormal() {
    setModoTest(false)
    setMostrarResultados(true)
    setRespuestas({})
    setVerificado(false)
  }

  function renderTabla() {
    const filas = []
    for (let i = rangoInicio; i <= rangoFin; i++) {
      const resultado = numero * i
      const respuestaUsuario = respuestas[i]
      const esCorrecta = parseInt(respuestaUsuario) === resultado

      filas.push(
        <div key={i} className="fila-tabla">
          <span className="operacion">
            {numero} × {i} =
          </span>
          {modoTest ? (
            <div className="area-respuesta">
              <input
                type="number"
                value={respuestaUsuario || ''}
                onChange={(e) => cambiarRespuesta(i, e.target.value)}
                disabled={verificado}
                className={verificado ? (esCorrecta ? 'correcta' : 'incorrecta') : ''}
              />
              {verificado && (
                <span className={esCorrecta ? 'icono-correcto' : 'icono-incorrecto'}>
                  {esCorrecta ? '✓' : '✗'}
                </span>
              )}
              {verificado && !esCorrecta && (
                <span className="resultado-correcto">({resultado})</span>
              )}
            </div>
          ) : (
            <span className="resultado">{mostrarResultados ? resultado : '?'}</span>
          )}
        </div>
      )
    }
    return filas
  }

  function calcularPuntuacion() {
    let correctas = 0
    let total = 0
    for (let i = rangoInicio; i <= rangoFin; i++) {
      const resultado = numero * i
      const respuestaUsuario = parseInt(respuestas[i])
      total++
      if (respuestaUsuario === resultado) {
        correctas++
      }
    }
    return { correctas, total }
  }

  const puntuacion = verificado ? calcularPuntuacion() : null

  return (
    <div className="tabla-multiplicar-container">
      <h1>📊 Tablas de Multiplicar 📊</h1>

      <div className="configuracion">
        <label>
          Tabla del:
          <input
            type="number"
            value={numero}
            onChange={cambiarNumero}
            min="1"
            max="20"
          />
        </label>

        <label>
          Desde:
          <input
            type="number"
            value={rangoInicio}
            onChange={cambiarRangoInicio}
            min="1"
            max="20"
          />
        </label>

        <label>
          Hasta:
          <input
            type="number"
            value={rangoFin}
            onChange={cambiarRangoFin}
            min="1"
            max="20"
          />
        </label>
      </div>

      {!modoTest && (
        <div className="controles-modo-normal">
          <button
            onClick={() => setMostrarResultados(!mostrarResultados)}
            className="btn-toggle"
          >
            {mostrarResultados ? 'Ocultar Resultados' : 'Mostrar Resultados'}
          </button>
          <button onClick={activarModoTest} className="btn-test">
            Modo Test
          </button>
        </div>
      )}

      {modoTest && (
        <div className="info-test">
          <h3>Modo Test</h3>
          <p>Completa las multiplicaciones y verifica tus respuestas</p>
          {verificado && puntuacion && (
            <div className="puntuacion">
              <h2>
                Puntuación: {puntuacion.correctas} / {puntuacion.total}
              </h2>
              <p>
                {puntuacion.correctas === puntuacion.total
                  ? '¡Perfecto! 🎉'
                  : puntuacion.correctas >= puntuacion.total * 0.7
                  ? '¡Bien hecho! 👍'
                  : 'Sigue practicando 📚'}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="tabla">
        <h2>Tabla del {numero}</h2>
        {renderTabla()}
      </div>

      {modoTest && (
        <div className="botones-test">
          {!verificado ? (
            <button onClick={verificarRespuestas} className="btn-verificar">
              Verificar Respuestas
            </button>
          ) : (
            <button onClick={reiniciarTest} className="btn-reiniciar">
              Reintentar
            </button>
          )}
          <button onClick={volverModoNormal} className="btn-volver">
            Volver a Modo Normal
          </button>
        </div>
      )}
    </div>
  )
}
