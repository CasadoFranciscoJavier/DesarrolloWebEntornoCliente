import { useState, useEffect } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Tragaperras() {
  const simbolos = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣']
  const [rodillos, setRodillos] = useState(['🍒', '🍒', '🍒'])
  const [girando, setGirando] = useState(false)
  const [saldo, setSaldo] = useState(100)
  const [apuesta, setApuesta] = useState(5)
  const [mensaje, setMensaje] = useState('')
  const [numRodillos, setNumRodillos] = useState(3)

  function girarRodillos() {
    if (girando) return
    if (apuesta > saldo) {
      setMensaje('Saldo insuficiente')
      return
    }

    setSaldo(saldo - apuesta)
    setMensaje('')
    setGirando(true)

    const intervalos = []
    const nuevosRodillos = [...rodillos]

    for (let i = 0; i < numRodillos; i++) {
      let contador = 0
      const intervalo = setInterval(() => {
        nuevosRodillos[i] = simbolos[getRandomInt(0, simbolos.length - 1)]
        setRodillos([...nuevosRodillos])
        contador++

        if (contador >= 10 + i * 5) {
          clearInterval(intervalo)
          if (i === numRodillos - 1) {
            verificarResultado(nuevosRodillos)
          }
        }
      }, 100)
      intervalos.push(intervalo)
    }
  }

  function verificarResultado(rodillos) {
    setGirando(false)

    const todosIguales = rodillos.every(simbolo => simbolo === rodillos[0])
    const dosIguales = contarIguales(rodillos) >= 2

    if (todosIguales) {
      const multiplicador = rodillos[0] === '💎' ? 20 : rodillos[0] === '7️⃣' ? 15 : 10
      const ganancia = apuesta * multiplicador
      setSaldo(saldo + ganancia)
      setMensaje(`¡JACKPOT! Ganaste $${ganancia}`)
    } else if (dosIguales) {
      const ganancia = apuesta * 2
      setSaldo(saldo + ganancia)
      setMensaje(`Dos iguales! Ganaste $${ganancia}`)
    } else {
      setMensaje('Perdiste. Intenta de nuevo')
    }
  }

  function contarIguales(rodillos) {
    const conteo = {}
    rodillos.forEach(simbolo => {
      conteo[simbolo] = (conteo[simbolo] || 0) + 1
    })
    return Math.max(...Object.values(conteo))
  }

  function cambiarApuesta(e) {
    const valor = parseInt(e.target.value)
    if (valor > 0 && valor <= saldo) {
      setApuesta(valor)
    }
  }

  function cambiarNumRodillos(e) {
    const num = parseInt(e.target.value)
    if (num >= 3 && num <= 5 && !girando) {
      setNumRodillos(num)
      setRodillos(Array(num).fill('🍒'))
    }
  }

  function reiniciarJuego() {
    setSaldo(100)
    setApuesta(5)
    setMensaje('')
    setRodillos(Array(numRodillos).fill('🍒'))
  }

  return (
    <div className="tragaperras-container">
      <h1>🎰 Tragaperras 🎰</h1>

      <div className="info-panel">
        <h2>💰 Saldo: ${saldo}</h2>
        {!girando && (
          <div className="controles">
            <label>
              Apuesta: $
              <input
                type="number"
                value={apuesta}
                onChange={cambiarApuesta}
                min="1"
                max={saldo}
                disabled={girando}
              />
            </label>
            <label>
              Rodillos (3-5):
              <input
                type="number"
                value={numRodillos}
                onChange={cambiarNumRodillos}
                min="3"
                max="5"
                disabled={girando}
              />
            </label>
          </div>
        )}
      </div>

      <div className="maquina">
        <div className="pantalla">
          {rodillos.map((simbolo, index) => (
            <div key={index} className={`rodillo ${girando ? 'girando' : ''}`}>
              {simbolo}
            </div>
          ))}
        </div>

        <div className="info-premios">
          <p>💎 o 7️⃣ x3 = {apuesta}$ x 20/15</p>
          <p>Otros x3 = {apuesta}$ x 10</p>
          <p>Cualquier x2 = {apuesta}$ x 2</p>
        </div>

        {mensaje && (
          <div className={`mensaje ${mensaje.includes('Ganaste') || mensaje.includes('JACKPOT') ? 'ganador' : 'perdedor'}`}>
            {mensaje}
          </div>
        )}

        <button
          onClick={girarRodillos}
          disabled={girando || saldo < apuesta}
          className="btn-girar"
        >
          {girando ? 'GIRANDO...' : 'GIRAR'}
        </button>

        {saldo === 0 && (
          <button onClick={reiniciarJuego} className="btn-reset">
            Reiniciar Juego
          </button>
        )}
      </div>
    </div>
  )
}
