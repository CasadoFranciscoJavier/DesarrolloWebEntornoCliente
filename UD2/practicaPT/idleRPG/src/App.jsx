import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { GameProvider } from './GameContext';
import EstadisticasJugador from './EstadisticasJugador';
import Monstruo from './Monstruo';
import Combate from './Combate';
import Controles from './Controles';
import Tienda from './Tienda';
import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra el contenido del juego
function ContenidoJuego() {
  const { state, dispatch } = useContext(GameContext);

  // Si el juego ha terminado (jugador muerto), mostramos Game Over
  if (state.juegoTerminado) {
    return (
      <div className='row justify-content-center'>
        <h1 className='col-12' style={{ color: 'red' }}>💀 GAME OVER 💀</h1>
        <p className='col-12'>Llegaste hasta el nivel {state.nivelMonstruo}</p>
        <p className='col-12'>Oro acumulado: {state.oro}</p>
        <button
          className='col-md-3 col-12 btn btn-primary btn-lg'
          onClick={() => dispatch({ type: 'REINICIAR_JUEGO' })}
        >
          🔄 Jugar de nuevo
        </button>
      </div>
    )
  }

  // Si el juego no ha terminado, mostramos el juego normal
  return (
    <>
      {/* Estadísticas del jugador: vida, oro, ataque, defensa */}
      <EstadisticasJugador />

      <br />

      {/* Información del monstruo actual */}
      <Monstruo />

      <br />

      {/* Botón de ataque */}
      <Combate />

      <br />

      {/* Controles: iniciar, pausar, reiniciar */}
      <Controles />

      <br />

      {/* Tienda con mejoras */}
      <Tienda />
    </>
  )
}

// Componente principal que envuelve la app con el Provider
export default function App() {

  return (
    <>
      {/* GameProvider envuelve toda la aplicación */}
      <GameProvider>
        <div className='container'>
          <h1 className='text-center'>⚔️ Idle RPG ⚔️</h1>

          <ContenidoJuego />
        </div>
      </GameProvider>
    </>
  )
}
