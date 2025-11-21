import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra el enemigo actual y permite atacarlo
export default function Enemigo() {

  // Obtenemos estado y dispatch del contexto
  const { state, dispatch } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      {/* Solo mostramos si el enemigo está vivo */}
      {state.saludEnemigo > 0 ? (
        <div className='col-md-6 col-12'>
          <h3>👾 Enemigo</h3>

          {/* Barra de vida del enemigo */}
          <div className='progress' style={{ height: '30px' }}>
            <div
              className='progress-bar bg-danger'
              role='progressbar'
              style={{ width: `${(state.saludEnemigo / state.saludMaxEnemigo) * 100}%` }}
            >
              {/* Mostramos vida actual / vida máxima */}
              {Math.round(state.saludEnemigo)} / {state.saludMaxEnemigo}
            </div>
          </div>

          <br />

          {/* Botón para atacar al enemigo */}
          <button
            className='btn btn-danger btn-lg'
            onClick={() => dispatch({ type: 'CLIC_ENEMIGO' })}
            disabled={!state.juegoIniciado || state.juegoPausado || state.juegoTerminado}
          >
            ⚔️ Atacar
            <br />
            {/* Mostramos cuánto daño hacemos */}
            (-{state.megaClicActivo ? state.danioClic * 2 : state.danioClic} de daño)
          </button>
        </div>
      ) : (
        // Mensaje cuando no hay enemigo
        <p className='col-12'>⏳ Esperando siguiente enemigo...</p>
      )}
    </div>
  )
}
