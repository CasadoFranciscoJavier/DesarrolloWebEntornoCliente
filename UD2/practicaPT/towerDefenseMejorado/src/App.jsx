import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { GameProvider } from './GameContext';
import InfoJuego from './InfoJuego';
import Enemigo from './Enemigo';
import Controles from './Controles';
import Mejoras from './Mejoras';
import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra el contenido del juego
function ContenidoJuego() {
  const { state } = useContext(GameContext);

  // Si el juego ha terminado, mostramos Game Over
  if (state.juegoTerminado) {
    return (
      <div className='row justify-content-center'>
        <h1 className='col-12' style={{ color: 'red' }}>💀 GAME OVER 💀</h1>
        <p className='col-12'>Oleada alcanzada: {state.numeroOleada}</p>
        <p className='col-12'>Puntos totales: {state.puntos}</p>
        <button
          className='col-md-3 col-12 btn btn-primary btn-lg'
          onClick={() => {
            const { dispatch } = useContext(GameContext);
            dispatch({ type: 'REINICIAR_JUEGO' });
          }}
        >
          🔄 Jugar de nuevo
        </button>
      </div>
    )
  }

  // Si el juego no ha terminado, mostramos el juego normal
  return (
    <>
      {/* Información del juego: oleada, tiempo, puntos */}
      <InfoJuego />

      <br />

      {/* Enemigo actual y botón de ataque */}
      <Enemigo />

      <br />

      {/* Controles: iniciar, pausar, reiniciar */}
      <Controles />

      <br />

      {/* Mejoras disponibles */}
      <Mejoras />
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
          <h1 className='text-center'>🏰 Tower Defense 🏰</h1>

          <ContenidoJuego />
        </div>
      </GameProvider>
    </>
  )
}
