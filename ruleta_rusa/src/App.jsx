import { useState, useEffect } from 'react'

const ICONO_BALA = "💀";
const ICONO_CLIC = "🎯";
const NUM_CAMARAS = 6;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Seleccion({ seleccion }) {
  return (
    <h1 style={{ fontSize: '48px', margin: '10px' }}>
      {seleccion}
    </h1>
  )
}

function Juego() {
  
  const [tambor, setTambor] = useState(Array(NUM_CAMARAS).fill(0));
  const [posicionActual, setPosicionActual] = useState(0); 
  const [resultadoTurno, setResultadoTurno] = useState("");
  const [ganador, setGanador] = useState(null);
  const [turno, setTurno] = useState("JUGADOR");

  useEffect(() => {
    if (tambor.every(camara => camara == 0)) {
        cargarPistolaInicial();
    }
  }, []);

  function cargarPistolaInicial() {
    const nuevoTambor = Array(NUM_CAMARAS).fill(0);
    const indiceBala = getRandomInt(0, NUM_CAMARAS - 1);
    
    nuevoTambor[indiceBala] = 1;
    
    const inicioTambor = getRandomInt(0, NUM_CAMARAS - 1);

    setTambor(nuevoTambor);
    setPosicionActual(inicioTambor);
    setResultadoTurno(`¡Cargada! Empieza el ${turno}`);
    setGanador(null);
  }

  function disparar() {
    if (ganador == null) {
        
        const camaraActual = tambor[posicionActual];
        let huboImpacto = false;

        if (camaraActual == 1) {
            huboImpacto = true;
        }

        if (huboImpacto) {
            setResultadoTurno("BOOM: " + ICONO_BALA);
            
            if (turno == "JUGADOR") {
                setGanador("Gana la MAQUINA (Jugador Eliminado)");
            } else {
                setGanador("Gana el JUGADOR (Máquina Eliminada)");
            }

        } else {
            setResultadoTurno("CLIC: " + ICONO_CLIC);
            
            const siguientePosicion = (posicionActual + 1) % NUM_CAMARAS;
            setPosicionActual(siguientePosicion);

            const siguienteTurno = turno == "JUGADOR" ? "MAQUINA" : "JUGADOR";
            setTurno(siguienteTurno);
        }
    }
  }
  
  function resetearJuego() {
    setTambor(Array(NUM_CAMARAS).fill(0));
    setPosicionActual(0);
    setResultadoTurno("");
    setGanador(null);
    setTurno("JUGADOR");
    cargarPistolaInicial();
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px' }}>

      <h1 style={{ color: '#4f46e5' }}>Ruleta Rusa</h1>
      
      <div style={{ marginBottom: '20px', border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
        <h2 style={{ fontSize: '20px', color: '#333' }}>
          {ganador ? "¡" + ganador + "!" : `Turno: ${turno}`}
        </h2>
        <Seleccion seleccion={resultadoTurno} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {tambor.map((_, index) => {
            const isCurrent = index == posicionActual;
            let emoji = isCurrent ? '🔘' : '⚪';
            
            if (ganador != null && tambor[index] == 1) {
                emoji = ICONO_BALA;
            }

            return (
                <span key={index} style={{ fontSize: '30px', margin: '5px' }}>
                    {emoji}
                </span>
            );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {ganador == null && (
              <button 
                  onClick={disparar}
                  style={{ padding: '10px', fontSize: '18px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                  ¡Disparar! 💥
              </button>
          )}

          {ganador != null && (
              <button 
                  onClick={resetearJuego}
                  style={{ padding: '10px', fontSize: '18px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                  Volver a Jugar 🔄
              </button>
          )}
      </div>
    </div>
  )
}

export default Juego
