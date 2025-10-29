import { useState, useEffect } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function QuizInteractivo() {
  const [pantalla, setPantalla] = useState('inicio')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [preguntasQuiz, setPreguntasQuiz] = useState([])
  const [indicePregunta, setIndicePregunta] = useState(0)
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null)
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0)
  const [mostrarFeedback, setMostrarFeedback] = useState(false)
  const [tiempoRestante, setTiempoRestante] = useState(30)
  const [usarTimer, setUsarTimer] = useState(false)
  const [tiempoTotal, setTiempoTotal] = useState(0)
  const [respuestasUsuario, setRespuestasUsuario] = useState([])

  const baseDatosPreguntas = [
    {
      categoria: 'Historia',
      pregunta: '¿En qué año cayó el Muro de Berlín?',
      opciones: ['1989', '1991', '1985', '1987'],
      respuestaCorrecta: 0
    },
    {
      categoria: 'Historia',
      pregunta: '¿Quién fue el primer presidente de Estados Unidos?',
      opciones: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
      respuestaCorrecta: 1
    },
    {
      categoria: 'Historia',
      pregunta: '¿En qué año se descubrió América?',
      opciones: ['1492', '1500', '1488', '1510'],
      respuestaCorrecta: 0
    },
    {
      categoria: 'Historia',
      pregunta: '¿Quién fue Napoleón Bonaparte?',
      opciones: ['Rey de España', 'Emperador de Francia', 'Zar de Rusia', 'Kaiser de Alemania'],
      respuestaCorrecta: 1
    },
    {
      categoria: 'Historia',
      pregunta: '¿En qué año comenzó la Segunda Guerra Mundial?',
      opciones: ['1939', '1941', '1937', '1942'],
      respuestaCorrecta: 0
    },
    {
      categoria: 'Ciencia',
      pregunta: '¿Cuál es el símbolo químico del oro?',
      opciones: ['Go', 'Au', 'Or', 'Gd'],
      respuestaCorrecta: 1
    },
    {
      categoria: 'Ciencia',
      pregunta: '¿Cuántos planetas hay en el sistema solar?',
      opciones: ['7', '8', '9', '10'],
      respuestaCorrecta: 1
    },
    {
      categoria: 'Ciencia',
      pregunta: '¿Qué órgano del cuerpo humano bombea la sangre?',
      opciones: ['Pulmones', 'Hígado', 'Corazón', 'Riñones'],
      respuestaCorrecta: 2
    },
    {
      categoria: 'Ciencia',
      pregunta: '¿A qué velocidad viaja la luz?',
      opciones: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '200,000 km/s'],
      respuestaCorrecta: 0
    },
    {
      categoria: 'Ciencia',
      pregunta: '¿Quién desarrolló la teoría de la relatividad?',
      opciones: ['Isaac Newton', 'Albert Einstein', 'Stephen Hawking', 'Galileo Galilei'],
      respuestaCorrecta: 1
    },
    {
      categoria: 'Deportes',
      pregunta: '¿En qué deporte se utiliza una raqueta y una pelota amarilla?',
      opciones: ['Bádminton', 'Tenis', 'Squash', 'Ping Pong'],
      respuestaCorrecta: 1
    },
    {
      categoria: 'Deportes',
      pregunta: '¿Cuántos jugadores hay en un equipo de fútbol?',
      opciones: ['10', '11', '12', '9'],
      respuestaCorrecta: 1
    },
    {
      categoria: 'Deportes',
      pregunta: '¿En qué país se celebraron los primeros Juegos Olímpicos modernos?',
      opciones: ['Italia', 'Francia', 'Grecia', 'Reino Unido'],
      respuestaCorrecta: 2
    },
    {
      categoria: 'Deportes',
      pregunta: '¿Cuántos puntos vale un touchdown en fútbol americano?',
      opciones: ['5', '6', '7', '8'],
      respuestaCorrecta: 1
    },
    {
      categoria: 'Deportes',
      pregunta: '¿Qué selección ha ganado más Copas del Mundo de fútbol?',
      opciones: ['Argentina', 'Alemania', 'Brasil', 'Italia'],
      respuestaCorrecta: 2
    },
    {
      categoria: 'Geografía',
      pregunta: '¿Cuál es la capital de Francia?',
      opciones: ['Londres', 'París', 'Berlín', 'Madrid'],
      respuestaCorrecta: 1
    },
    {
      categoria: 'Geografía',
      pregunta: '¿Cuál es el río más largo del mundo?',
      opciones: ['Nilo', 'Amazonas', 'Yangtsé', 'Misisipi'],
      respuestaCorrecta: 0
    },
    {
      categoria: 'Geografía',
      pregunta: '¿En qué continente está Egipto?',
      opciones: ['Asia', 'Europa', 'África', 'Oceanía'],
      respuestaCorrecta: 2
    },
    {
      categoria: 'Geografía',
      pregunta: '¿Cuál es el océano más grande?',
      opciones: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'],
      respuestaCorrecta: 3
    },
    {
      categoria: 'Geografía',
      pregunta: '¿Cuál es el país más grande del mundo por superficie?',
      opciones: ['Canadá', 'China', 'Rusia', 'Estados Unidos'],
      respuestaCorrecta: 2
    }
  ]

  useEffect(() => {
    let intervalo = null
    if (pantalla === 'jugando' && usarTimer && tiempoRestante > 0 && !mostrarFeedback) {
      intervalo = setInterval(() => {
        setTiempoRestante(tiempo => {
          if (tiempo <= 1) {
            manejarSiguiente()
            return 30
          }
          return tiempo - 1
        })
        setTiempoTotal(t => t + 1)
      }, 1000)
    }
    return () => {
      if (intervalo) clearInterval(intervalo)
    }
  }, [pantalla, usarTimer, tiempoRestante, mostrarFeedback])

  useEffect(() => {
    let intervalo = null
    if (pantalla === 'jugando' && !usarTimer) {
      intervalo = setInterval(() => {
        setTiempoTotal(t => t + 1)
      }, 1000)
    }
    return () => {
      if (intervalo) clearInterval(intervalo)
    }
  }, [pantalla, usarTimer])

  function mezclarArray(array) {
    const nuevoArray = [...array]
    let i = nuevoArray.length
    while (i > 0) {
      const j = getRandomInt(0, i - 1)
      i--
      const temp = nuevoArray[i]
      nuevoArray[i] = nuevoArray[j]
      nuevoArray[j] = temp
    }
    return nuevoArray
  }

  function iniciarQuiz(categoria) {
    let preguntasFiltradas = categoria === 'Todas'
      ? baseDatosPreguntas
      : baseDatosPreguntas.filter(p => p.categoria === categoria)

    const preguntasMezcladas = mezclarArray(preguntasFiltradas).map(pregunta => {
      const opcionesMezcladas = pregunta.opciones.map((opcion, idx) => ({
        texto: opcion,
        indiceOriginal: idx
      }))
      const mezcladas = mezclarArray(opcionesMezcladas)
      const nuevoIndiceRespuesta = mezcladas.findIndex(
        op => op.indiceOriginal === pregunta.respuestaCorrecta
      )
      return {
        ...pregunta,
        opciones: mezcladas.map(op => op.texto),
        respuestaCorrecta: nuevoIndiceRespuesta
      }
    })

    setCategoriaSeleccionada(categoria)
    setPreguntasQuiz(preguntasMezcladas)
    setIndicePregunta(0)
    setRespuestaSeleccionada(null)
    setRespuestasCorrectas(0)
    setMostrarFeedback(false)
    setTiempoRestante(30)
    setTiempoTotal(0)
    setRespuestasUsuario([])
    setPantalla('jugando')
  }

  function seleccionarRespuesta(indice) {
    if (!mostrarFeedback) {
      setRespuestaSeleccionada(indice)
    }
  }

  function confirmarRespuesta() {
    if (respuestaSeleccionada === null) return

    const preguntaActual = preguntasQuiz[indicePregunta]
    const esCorrecta = respuestaSeleccionada === preguntaActual.respuestaCorrecta

    if (esCorrecta) {
      setRespuestasCorrectas(respuestasCorrectas + 1)
    }

    setRespuestasUsuario([
      ...respuestasUsuario,
      {
        pregunta: preguntaActual.pregunta,
        respuestaUsuario: respuestaSeleccionada,
        respuestaCorrecta: preguntaActual.respuestaCorrecta,
        esCorrecta: esCorrecta,
        categoria: preguntaActual.categoria
      }
    ])

    setMostrarFeedback(true)
  }

  function manejarSiguiente() {
    if (indicePregunta < preguntasQuiz.length - 1) {
      setIndicePregunta(indicePregunta + 1)
      setRespuestaSeleccionada(null)
      setMostrarFeedback(false)
      setTiempoRestante(30)
    } else {
      setPantalla('resultados')
    }
  }

  function reiniciar() {
    setPantalla('inicio')
    setCategoriaSeleccionada('')
    setPreguntasQuiz([])
    setIndicePregunta(0)
    setRespuestaSeleccionada(null)
    setRespuestasCorrectas(0)
    setMostrarFeedback(false)
    setTiempoRestante(30)
    setTiempoTotal(0)
    setRespuestasUsuario([])
  }

  function obtenerClaseOpcion(indice) {
    if (!mostrarFeedback) {
      return respuestaSeleccionada === indice ? 'opcion seleccionada' : 'opcion'
    }

    const preguntaActual = preguntasQuiz[indicePregunta]
    if (indice === preguntaActual.respuestaCorrecta) {
      return 'opcion correcta'
    }
    if (indice === respuestaSeleccionada && respuestaSeleccionada !== preguntaActual.respuestaCorrecta) {
      return 'opcion incorrecta'
    }
    return 'opcion'
  }

  function calcularEstadisticasPorCategoria() {
    const stats = {}
    respuestasUsuario.forEach(respuesta => {
      if (!stats[respuesta.categoria]) {
        stats[respuesta.categoria] = { correctas: 0, total: 0 }
      }
      stats[respuesta.categoria].total++
      if (respuesta.esCorrecta) {
        stats[respuesta.categoria].correctas++
      }
    })
    return stats
  }

  function formatearTiempo(segundos) {
    const mins = Math.floor(segundos / 60)
    const secs = segundos % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const categorias = ['Historia', 'Ciencia', 'Deportes', 'Geografía', 'Todas']

  return (
    <div className="quiz-container">
      <h1>Quiz Interactivo</h1>

      {pantalla === 'inicio' && (
        <div className="pantalla-inicio">
          <h2>Selecciona una categoría</h2>
          <div className="categorias-grid">
            {categorias.map(categoria => (
              <button
                key={categoria}
                onClick={() => iniciarQuiz(categoria)}
                className="btn-categoria"
              >
                {categoria}
              </button>
            ))}
          </div>
          <div className="config-timer">
            <label>
              <input
                type="checkbox"
                checked={usarTimer}
                onChange={(e) => setUsarTimer(e.target.checked)}
              />
              Activar timer (30 segundos por pregunta)
            </label>
          </div>
        </div>
      )}

      {pantalla === 'jugando' && preguntasQuiz.length > 0 && (
        <div className="pantalla-juego">
          <div className="info-superior">
            <div className="progreso">
              Pregunta {indicePregunta + 1} de {preguntasQuiz.length}
            </div>
            <div className="puntuacion">
              Correctas: {respuestasCorrectas}
            </div>
            {usarTimer && (
              <div className={`timer ${tiempoRestante <= 10 ? 'timer-alerta' : ''}`}>
                Tiempo: {tiempoRestante}s
              </div>
            )}
          </div>

          <div className="barra-progreso">
            <div
              className="barra-progreso-fill"
              style={{ width: `${((indicePregunta + 1) / preguntasQuiz.length) * 100}%` }}
            ></div>
          </div>

          <div className="pregunta-container">
            <div className="categoria-badge">
              {preguntasQuiz[indicePregunta].categoria}
            </div>
            <h2 className="pregunta">{preguntasQuiz[indicePregunta].pregunta}</h2>
          </div>

          <div className="opciones-container">
            {preguntasQuiz[indicePregunta].opciones.map((opcion, indice) => (
              <button
                key={indice}
                onClick={() => seleccionarRespuesta(indice)}
                className={obtenerClaseOpcion(indice)}
                disabled={mostrarFeedback}
              >
                {opcion}
              </button>
            ))}
          </div>

          {mostrarFeedback && (
            <div className={`feedback ${respuestaSeleccionada === preguntasQuiz[indicePregunta].respuestaCorrecta ? 'feedback-correcto' : 'feedback-incorrecto'}`}>
              {respuestaSeleccionada === preguntasQuiz[indicePregunta].respuestaCorrecta
                ? '¡Correcto! 🎉'
                : `Incorrecto. La respuesta correcta era: ${preguntasQuiz[indicePregunta].opciones[preguntasQuiz[indicePregunta].respuestaCorrecta]}`
              }
            </div>
          )}

          <div className="botones-juego">
            {!mostrarFeedback ? (
              <button
                onClick={confirmarRespuesta}
                disabled={respuestaSeleccionada === null}
                className="btn-confirmar"
              >
                Confirmar Respuesta
              </button>
            ) : (
              <button onClick={manejarSiguiente} className="btn-siguiente">
                {indicePregunta < preguntasQuiz.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
              </button>
            )}
          </div>
        </div>
      )}

      {pantalla === 'resultados' && (
        <div className="pantalla-resultados">
          <h2>¡Quiz Completado!</h2>

          <div className="resultados-principales">
            <div className="resultado-item">
              <div className="resultado-valor">{respuestasCorrectas}</div>
              <div className="resultado-label">Correctas</div>
            </div>
            <div className="resultado-item">
              <div className="resultado-valor">
                {Math.round((respuestasCorrectas / preguntasQuiz.length) * 100)}%
              </div>
              <div className="resultado-label">Acierto</div>
            </div>
            <div className="resultado-item">
              <div className="resultado-valor">{formatearTiempo(tiempoTotal)}</div>
              <div className="resultado-label">Tiempo Total</div>
            </div>
          </div>

          <div className="estadisticas-categoria">
            <h3>Resultados por Categoría</h3>
            {Object.entries(calcularEstadisticasPorCategoria()).map(([categoria, stats]) => (
              <div key={categoria} className="stat-categoria">
                <span className="stat-nombre">{categoria}:</span>
                <span className="stat-datos">
                  {stats.correctas}/{stats.total} ({Math.round((stats.correctas / stats.total) * 100)}%)
                </span>
              </div>
            ))}
          </div>

          <button onClick={reiniciar} className="btn-reiniciar">
            Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  )
}
