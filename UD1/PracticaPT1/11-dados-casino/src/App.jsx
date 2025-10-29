import { useState } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Dado({ valor }) {
  return (
    <div className="dado">
      {valor}
    </div>
  )
}

export default function DadosCasino() {
  const [numDados, setNumDados] = useState(2)
  const [dados, setDados] = useState([1, 1])
  const [saldo, setSaldo] = useState(100)
  const [apuesta, setApuesta] = useState(10)
  const [tipoApuesta, setTipoApuesta] = useState('suma')
  const [valorApuesta, setValorApuesta] = useState(7)
  const [mensaje, setMensaje] = useState('')
  const [lanzando, setLanzando] = useState(false)

  function lanzarDados() {
    if (lanzando) return
    if (apuesta > saldo) {
      setMensaje('Saldo insuficiente')
      return
    }

    setSaldo(saldo - apuesta)
    setLanzando(true)
    setMensaje('')

    let contador = 0
    const intervalo = setInterval(() => {
      const nuevosDados = []
      for (let i = 0; i < numDados; i++) {
        nuevosDados.push(getRandomInt(1, 6))
      }
      setDados(nuevosDados)
      contador++

      if (contador >= 10) {
        clearInterval(intervalo)
        setLanzando(false)
        verificarApuesta(nuevosDados)
      }
    }, 100)
  }

  function verificarApuesta(dadosFinales) {
    let gano = false
    let multiplicador = 1

    if (tipoApuesta == 'suma') {
      const suma = dadosFinales.reduce((acc, val) => acc + val, 0)
      if (suma == valorApuesta) {
        gano = true
        multiplicador = numDados == 2 ? 5 : numDados == 3 ? 8 : 10
      }
    } else if (tipoApuesta == 'mayor') {
      const suma = dadosFinales.reduce((acc, val) => acc + val, 0)
      const mitad = (numDados * 6) / 2
      if (suma > mitad) {
        gano = true
        multiplicador = 2
      }
    } else if (tipoApuesta == 'menor') {
      const suma = dadosFinales.reduce((acc, val) => acc + val, 0)
      const mitad = (numDados * 6) / 2
      if (suma < mitad) {
        gano = true
        multiplicador = 2
      }
    } else if (tipoApuesta == 'pares') {
      const todosPares = dadosFinales.every(dado => dado % 2 == 0)
      if (todosPares) {
        gano = true
        multiplicador = 3
      }
    } else if (tipoApuesta == 'impares') {
      const todosImpares = dadosFinales.every(dado => dado % 2 !== 0)
      if (todosImpares) {
        gano = true
        multiplicador = 3
      }
    } else if (tipoApuesta == 'iguales') {
      const todosIguales = dadosFinales.every(dado => dado == dadosFinales[0])
      if (todosIguales) {
        gano = true
        multiplicador = numDados == 2 ? 10 : numDados == 3 ? 20 : 30
      }
    }

    if (gano) {
      const ganancia = apuesta * multiplicador
      setSaldo(saldo + ganancia)
      setMensaje(`¡GANASTE! +$${ganancia} (x${multiplicador})`)
    } else {
      setMensaje('Perdiste. Intenta de nuevo')
    }
  }

  function cambiarApuesta(e) {
    const valor = parseInt(e.target.value)
    if (valor > 0) {
      setApuesta(valor)
    }
  }

  function cambiarNumDados(e) {
    const num = parseInt(e.target.value)
    if (num >= 2 && num <= 4) {
      setNumDados(num)
      setDados(Array(num).fill(1))
    }
  }

  function cambiarValorApuesta(e) {
    const valor = parseInt(e.target.value)
    setValorApuesta(valor)
  }

  function reiniciarJuego() {
    setSaldo(100)
    setApuesta(10)
    setMensaje('')
    setDados(Array(numDados).fill(1))
  }

  const sumaActual = dados.reduce((acc, val) => acc + val, 0)

  return (
    <div className="dados-container">
      <h1>🎲 Dados Casino 🎲</h1>

      <div className="info-panel">
        <h2>💰 Saldo: ${saldo}</h2>
        {!lanzando && (
          <div className="controles">
            <label>
              Apuesta: $
              <input
                type="number"
                value={apuesta}
                onChange={cambiarApuesta}
                min="1"
                max={saldo}
              />
            </label>
            <label>
              Dados (2-4):
              <input
                type="number"
                value={numDados}
                onChange={cambiarNumDados}
                min="2"
                max="4"
              />
            </label>
          </div>
        )}
      </div>

      <div className="area-dados">
        <div className="dados-display">
          {dados.map((dado, index) => (
            <Dado key={index} valor={dado} />
          ))}
        </div>
        <h3>Suma: {sumaActual}</h3>
      </div>

      <div className="tipos-apuesta">
        <h3>Tipo de Apuesta:</h3>
        <div className="opciones-apuesta">
          <button
            onClick={() => setTipoApuesta('suma')}
            className={tipoApuesta == 'suma' ? 'activo' : ''}
            disabled={lanzando}
          >
            Suma exacta
          </button>
          <button
            onClick={() => setTipoApuesta('mayor')}
            className={tipoApuesta == 'mayor' ? 'activo' : ''}
            disabled={lanzando}
          >
            Mayor
          </button>
          <button
            onClick={() => setTipoApuesta('menor')}
            className={tipoApuesta == 'menor' ? 'activo' : ''}
            disabled={lanzando}
          >
            Menor
          </button>
          <button
            onClick={() => setTipoApuesta('pares')}
            className={tipoApuesta == 'pares' ? 'activo' : ''}
            disabled={lanzando}
          >
            Todos pares
          </button>
          <button
            onClick={() => setTipoApuesta('impares')}
            className={tipoApuesta == 'impares' ? 'activo' : ''}
            disabled={lanzando}
          >
            Todos impares
          </button>
          <button
            onClick={() => setTipoApuesta('iguales')}
            className={tipoApuesta == 'iguales' ? 'activo' : ''}
            disabled={lanzando}
          >
            Todos iguales
          </button>
        </div>

        {tipoApuesta == 'suma' && (
          <div className="config-suma">
            <label>
              Apostar a suma:
              <input
                type="number"
                value={valorApuesta}
                onChange={cambiarValorApuesta}
                min={numDados}
                max={numDados * 6}
              />
            </label>
          </div>
        )}
      </div>

      <div className="info-premios">
        <h4>Multiplicadores:</h4>
        <p>Suma exacta: x{numDados == 2 ? 5 : numDados == 3 ? 8 : 10}</p>
        <p>Mayor/Menor: x2</p>
        <p>Todos pares/impares: x3</p>
        <p>Todos iguales: x{numDados == 2 ? 10 : numDados == 3 ? 20 : 30}</p>
      </div>

      {mensaje && (
        <div className={`mensaje ${mensaje.includes('GANASTE') ? 'ganador' : 'perdedor'}`}>
          {mensaje}
        </div>
      )}

      <button
        onClick={lanzarDados}
        disabled={lanzando || saldo < apuesta}
        className="btn-lanzar"
      >
        {lanzando ? 'Lanzando...' : 'Lanzar Dados'}
      </button>

      {saldo == 0 && (
        <button onClick={reiniciarJuego} className="btn-reset">
          Reiniciar Juego
        </button>
      )}
    </div>
  )
}
