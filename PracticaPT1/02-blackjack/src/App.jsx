import { useState, useEffect } from 'react'
import './App.css'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Carta({ carta }) {
  const palos = { C: '♣', D: '♦', H: '♥', S: '♠' }
  const colores = { C: 'black', D: 'red', H: 'red', S: 'black' }

  return (
    <div className="carta" style={{ color: colores[carta.palo] }}>
      <div className="carta-valor">{carta.valor}</div>
      <div className="carta-palo">{palos[carta.palo]}</div>
    </div>
  )
}

export default function BlackJack() {
  const [baraja, setBaraja] = useState([])
  const [manoJugador, setManoJugador] = useState([])
  const [manoCrupier, setManoCrupier] = useState([])
  const [juegoIniciado, setJuegoIniciado] = useState(false)
  const [turnoJugador, setTurnoJugador] = useState(true)
  const [resultado, setResultado] = useState('')
  const [saldo, setSaldo] = useState(100)
  const [apuesta, setApuesta] = useState(10)
  const [juegoTerminado, setJuegoTerminado] = useState(false)

  useEffect(() => {
    crearBaraja()
  }, [])

  function crearBaraja() {
    const palos = ['C', 'D', 'H', 'S']
    const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    const nuevaBaraja = []

    palos.forEach(palo => {
      valores.forEach(valor => {
        nuevaBaraja.push({ valor, palo })
      })
    })

    setBaraja(mezclarArray(nuevaBaraja))
  }

  function mezclarArray(array) {
    const copia = [...array]
    for (let i = copia.length - 1; i > 0; i--) {
      const j = getRandomInt(0, i)
      const temp = copia[i]
      copia[i] = copia[j]
      copia[j] = temp
    }
    return copia
  }

  function obtenerValorCarta(carta) {
    if (carta.valor == 'A') return 11
    if (['J', 'Q', 'K'].includes(carta.valor)) return 10
    return parseInt(carta.valor)
  }

  function calcularPuntuacion(mano) {
    let puntos = 0
    let ases = 0

    mano.forEach(carta => {
      const valor = obtenerValorCarta(carta)
      puntos += valor
      if (carta.valor == 'A') ases++
    })

    while (puntos > 21 && ases > 0) {
      puntos -= 10
      ases--
    }

    return puntos
  }

  function repartirCarta(mano) {
    if (baraja.length == 0) return mano
    const nuevaBaraja = [...baraja]
    const carta = nuevaBaraja.pop()
    setBaraja(nuevaBaraja)
    return [...mano, carta]
  }

  function iniciarJuego() {
    if (apuesta > saldo) {
      alert('No tienes suficiente saldo')
      return
    }

    setSaldo(saldo - apuesta)
    crearBaraja()

    const nuevaBaraja = [...baraja]
    const cartasJugador = [nuevaBaraja.pop(), nuevaBaraja.pop()]
    const cartasCrupier = [nuevaBaraja.pop(), nuevaBaraja.pop()]

    setBaraja(nuevaBaraja)
    setManoJugador(cartasJugador)
    setManoCrupier(cartasCrupier)
    setJuegoIniciado(true)
    setTurnoJugador(true)
    setResultado('')
    setJuegoTerminado(false)

    const puntosJugador = calcularPuntuacion(cartasJugador)
    if (puntosJugador == 21) {
      setTurnoJugador(false)
      setTimeout(() => turnoCrupier(cartasJugador, cartasCrupier), 1000)
    }
  }

  function pedirCarta() {
    if (!turnoJugador || juegoTerminado) return

    const nuevaMano = repartirCarta(manoJugador)
    setManoJugador(nuevaMano)

    const puntos = calcularPuntuacion(nuevaMano)
    if (puntos > 21) {
      setResultado('¡Te pasaste! Pierdes')
      setJuegoTerminado(true)
      setTurnoJugador(false)
    } else if (puntos == 21) {
      setTurnoJugador(false)
      setTimeout(() => turnoCrupier(nuevaMano, manoCrupier), 1000)
    }
  }

  function plantarse() {
    if (!turnoJugador || juegoTerminado) return
    setTurnoJugador(false)
    turnoCrupier(manoJugador, manoCrupier)
  }

  function turnoCrupier(manoJugadorFinal, manoCrupierInicial) {
    let manoCrupierActual = [...manoCrupierInicial]
    let barajaActual = [...baraja]

    while (calcularPuntuacion(manoCrupierActual) < 17) {
      const carta = barajaActual.pop()
      manoCrupierActual = [...manoCrupierActual, carta]
    }

    setManoCrupier(manoCrupierActual)
    setBaraja(barajaActual)

    const puntosJugador = calcularPuntuacion(manoJugadorFinal)
    const puntosCrupier = calcularPuntuacion(manoCrupierActual)

    determinarGanador(puntosJugador, puntosCrupier)
  }

  function determinarGanador(puntosJugador, puntosCrupier) {
    if (puntosCrupier > 21) {
      setResultado('¡El crupier se pasó! Ganaste')
      setSaldo(saldo + apuesta * 2)
    } else if (puntosJugador > puntosCrupier) {
      setResultado('¡Ganaste!')
      setSaldo(saldo + apuesta * 2)
    } else if (puntosJugador < puntosCrupier) {
      setResultado('Perdiste')
    } else {
      setResultado('Empate')
      setSaldo(saldo + apuesta)
    }
    setJuegoTerminado(true)
  }

  function reiniciarJuego() {
    setManoJugador([])
    setManoCrupier([])
    setJuegoIniciado(false)
    setTurnoJugador(true)
    setResultado('')
    setJuegoTerminado(false)
    crearBaraja()
  }

  function cambiarApuesta(e) {
    const valor = parseInt(e.target.value)
    if (valor > 0) {
      setApuesta(valor)
    }
  }

  const puntosJugador = calcularPuntuacion(manoJugador)
  const puntosCrupier = calcularPuntuacion(manoCrupier)

  return (
    <div className="blackjack-container">
      <h1>🃏 BlackJack 🎰</h1>

      <div className="info-panel">
        <h2>💰 Saldo: ${saldo}</h2>
        <div className="apuesta-control">
          <label>
            Apuesta:
            <input
              type="number"
              value={apuesta}
              onChange={cambiarApuesta}
              disabled={juegoIniciado}
              min="1"
              max={saldo}
            />
          </label>
        </div>
      </div>

      {!juegoIniciado && (
        <button onClick={iniciarJuego} className="btn-iniciar">
          Iniciar Partida
        </button>
      )}

      {juegoIniciado && (
        <>
          <div className="mesa">
            <div className="mano">
              <h3>Crupier ({turnoJugador ? '?' : puntosCrupier})</h3>
              <div className="cartas">
                {manoCrupier.map((carta, index) => (
                  index == 0 && turnoJugador ? (
                    <div key={index} className="carta carta-oculta">🂠</div>
                  ) : (
                    <Carta key={index} carta={carta} />
                  )
                ))}
              </div>
            </div>

            <div className="mano">
              <h3>Jugador ({puntosJugador})</h3>
              <div className="cartas">
                {manoJugador.map((carta, index) => (
                  <Carta key={index} carta={carta} />
                ))}
              </div>
            </div>
          </div>

          <div className="controles">
            {turnoJugador && !juegoTerminado && (
              <>
                <button onClick={pedirCarta} className="btn-pedir">
                  Pedir Carta
                </button>
                <button onClick={plantarse} className="btn-plantarse">
                  Plantarse
                </button>
              </>
            )}

            {juegoTerminado && (
              <>
                <h2 className="resultado">{resultado}</h2>
                <button onClick={reiniciarJuego} className="btn-nueva">
                  Nueva Partida
                </button>
              </>
            )}
          </div>
        </>
      )}

      {saldo == 0 && (
        <button onClick={() => { setSaldo(100); reiniciarJuego() }} className="btn-reset">
          Reiniciar Juego
        </button>
      )}
    </div>
  )
}
