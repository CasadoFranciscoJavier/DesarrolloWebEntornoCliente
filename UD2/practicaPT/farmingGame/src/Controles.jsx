import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente con los controles del juego
export default function Controles() {

  // Obtenemos estado y dispatch del contexto
  const { state, dispatch } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      <h2 className='col-12'>Controles</h2>

      {/* Botón iniciar: solo visible si no ha empezado */}
      {!state.juegoIniciado && (
        <button
          className='col-md-3 col-12 btn btn-success btn-lg'
          onClick={() => dispatch({ type: 'INICIAR_JUEGO' })}
        >
          ▶️ Iniciar Granja
        </button>
      )}

      {/* Botones pausar/reanudar: solo visibles si ha empezado */}
      {state.juegoIniciado && (
        <>
          {state.juegoPausado ? (
            <button
              className='col-md-3 col-12 btn btn-primary'
              onClick={() => dispatch({ type: 'REANUDAR_JUEGO' })}
            >
              ▶️ Reanudar
            </button>
          ) : (
            <button
              className='col-md-3 col-12 btn btn-warning'
              onClick={() => dispatch({ type: 'PAUSAR_JUEGO' })}
            >
              ⏸️ Pausar
            </button>
          )}
        </>
      )}

      {/* Botón reiniciar: siempre visible si ha empezado */}
      {state.juegoIniciado && (
        <button
          className='col-md-3 col-12 btn btn-danger'
          onClick={() => dispatch({ type: 'REINICIAR_JUEGO' })}
        >
          🔄 Reiniciar
        </button>
      )}
    </div>
  )
}
