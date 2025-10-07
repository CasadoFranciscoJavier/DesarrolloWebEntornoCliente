import { useState, useEffect } from "react";

const ICONO_BALA = "💀";
const ICONO_CLIC = "🎯";
const NUM_CAMARAS = 6;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function CantidadDeJugadores({ totalJugadores, setTotalJugadores }) {
  return (
    <div>
      <p>¿Cuántos jugadores van a participar (2-6)?</p>
      <select
        value={totalJugadores}
        onChange={(e) => setTotalJugadores(parseInt(e.target.value))}
      >
        {[2, 3, 4, 5, 6].map((numeroJugadores) => (
          <option key={numeroJugadores} value={numeroJugadores}>{numeroJugadores}</option>
        ))}
      </select>
    </div>
  );
}

export default function Juego() {
  const [totalJugadores, setTotalJugadores] = useState(2);
  const [posicionActual, setPosicionActual] = useState(0);
  const [bala, setBala] = useState(0);
  const [turno, setTurno] = useState(1);
  const [resultado, setResultado] = useState("");
  const [fin, setFin] = useState(false);

  useEffect(() => {
    setBala(getRandomInt(0, NUM_CAMARAS - 1));
    setPosicionActual(getRandomInt(0, NUM_CAMARAS - 1));
  }, [turno]);

  function disparar() {
    if (fin) return;

    if (posicionActual == bala) {
      setResultado(`💥 Jugador ${turno} pierde ${ICONO_BALA}`);
      if (totalJugadores > 2) {
        const siguiente = turno + 1 > totalJugadores ? 1 : turno + 1;
        setTotalJugadores(totalJugadores - 1);
        setTurno(siguiente);
      } else {
         setFin(true);
      }
     
    } else {
      setResultado(`Click ${ICONO_CLIC}`);
      const siguiente = turno + 1 > totalJugadores ? 1 : turno + 1;
      setTurno(siguiente);
    }
  }

  function reiniciar() {
    setFin(false);
    setResultado("");
    setTurno(1);
    setBala(getRandomInt(0, NUM_CAMARAS - 1));
    setPosicionActual(getRandomInt(0, NUM_CAMARAS - 1));
  }

 function renderTambor() {
    const camaras = [];
    for (let i = 0; i < NUM_CAMARAS; i++) {
      let icono = "⚪";
      if (i == posicionActual && !fin) icono = "🎯";
      if (fin && i == bala) icono = ICONO_BALA;
      camaras.push(<span key={i} style={{ fontSize: "30px", margin: "4px" }}>{icono}</span>);
    }
    return camaras;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Ruleta Rusa</h1>

      <CantidadDeJugadores
        totalJugadores={totalJugadores}
        setTotalJugadores={setTotalJugadores}
      />

      <h2>{fin ? resultado : `Turno del jugador ${turno}`}</h2>
      {!fin && <p>{resultado}</p>}

      <div style={{ margin: "10px" }}>{renderTambor()}</div>

      {!fin ? (
        <button onClick={disparar}>Disparar 💥</button>
      ) : (
        <button onClick={reiniciar}>Volver a jugar 🔄</button>
      )}
    </div>
  );
}