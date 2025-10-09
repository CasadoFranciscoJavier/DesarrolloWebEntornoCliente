import { useState } from 'react'
import './App.css'

export default function Calculadora() {
  const [valorActual, setValorActual] = useState('0')
  const [valorAnterior, setValorAnterior] = useState('')
  const [operacion, setOperacion] = useState('')
  const [nuevoNumero, setNuevoNumero] = useState(true)
  const [historial, setHistorial] = useState([])

  function agregarNumero(num) {
    if (nuevoNumero) {
      setValorActual(num.toString())
      setNuevoNumero(false)
    } else {
      setValorActual(valorActual === '0' ? num.toString() : valorActual + num)
    }
  }

  function agregarPunto() {
    if (!valorActual.includes('.')) {
      setValorActual(valorActual + '.')
      setNuevoNumero(false)
    }
  }

  function seleccionarOperacion(op) {
    if (valorAnterior !== '' && !nuevoNumero) {
      calcular()
    }
    setOperacion(op)
    setValorAnterior(valorActual)
    setNuevoNumero(true)
  }

  function calcular() {
    if (valorAnterior === '' || operacion === '') return

    const anterior = parseFloat(valorAnterior)
    const actual = parseFloat(valorActual)
    let resultado = 0

    if (operacion === '+') {
      resultado = anterior + actual
    } else if (operacion === '-') {
      resultado = anterior - actual
    } else if (operacion === '*') {
      resultado = anterior * actual
    } else if (operacion === '/') {
      resultado = actual !== 0 ? anterior / actual : 0
    }

    const operacionTexto = `${anterior} ${operacion} ${actual} = ${resultado}`
    setHistorial([...historial, operacionTexto])
    setValorActual(resultado.toString())
    setValorAnterior('')
    setOperacion('')
    setNuevoNumero(true)
  }

  function limpiar() {
    setValorActual('0')
    setValorAnterior('')
    setOperacion('')
    setNuevoNumero(true)
  }

  function borrarUltimo() {
    if (valorActual.length > 1) {
      setValorActual(valorActual.slice(0, -1))
    } else {
      setValorActual('0')
      setNuevoNumero(true)
    }
  }

  function cambiarSigno() {
    const numero = parseFloat(valorActual)
    setValorActual((numero * -1).toString())
  }

  function porcentaje() {
    const numero = parseFloat(valorActual)
    setValorActual((numero / 100).toString())
  }

  function limpiarHistorial() {
    setHistorial([])
  }

  function renderBotones() {
    const botones = [
      { valor: '7', tipo: 'numero' },
      { valor: '8', tipo: 'numero' },
      { valor: '9', tipo: 'numero' },
      { valor: '/', tipo: 'operacion' },
      { valor: '4', tipo: 'numero' },
      { valor: '5', tipo: 'numero' },
      { valor: '6', tipo: 'numero' },
      { valor: '*', tipo: 'operacion' },
      { valor: '1', tipo: 'numero' },
      { valor: '2', tipo: 'numero' },
      { valor: '3', tipo: 'numero' },
      { valor: '-', tipo: 'operacion' },
      { valor: '0', tipo: 'numero' },
      { valor: '.', tipo: 'punto' },
      { valor: '=', tipo: 'igual' },
      { valor: '+', tipo: 'operacion' }
    ]

    return botones.map((boton, index) => {
      let onClick = () => {}

      if (boton.tipo === 'numero') {
        onClick = () => agregarNumero(boton.valor)
      } else if (boton.tipo === 'operacion') {
        onClick = () => seleccionarOperacion(boton.valor)
      } else if (boton.tipo === 'punto') {
        onClick = agregarPunto
      } else if (boton.tipo === 'igual') {
        onClick = calcular
      }

      return (
        <button
          key={index}
          onClick={onClick}
          className={`btn ${boton.tipo}`}
        >
          {boton.valor}
        </button>
      )
    })
  }

  return (
    <div className="calculadora-container">
      <h1>Calculadora</h1>

      <div className="calculadora">
        <div className="display">
          <div className="operacion-anterior">
            {valorAnterior} {operacion}
          </div>
          <div className="valor-actual">{valorActual}</div>
        </div>

        <div className="botones-funciones">
          <button onClick={limpiar} className="btn funcion">C</button>
          <button onClick={borrarUltimo} className="btn funcion">⌫</button>
          <button onClick={cambiarSigno} className="btn funcion">+/-</button>
          <button onClick={porcentaje} className="btn funcion">%</button>
        </div>

        <div className="botones-grid">
          {renderBotones()}
        </div>
      </div>

      <div className="historial-container">
        <div className="historial-header">
          <h3>Historial</h3>
          {historial.length > 0 && (
            <button onClick={limpiarHistorial} className="btn-limpiar-historial">
              Limpiar
            </button>
          )}
        </div>
        <div className="historial-lista">
          {historial.map((operacion, index) => (
            <div key={index} className="historial-item">
              {operacion}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
