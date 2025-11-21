import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente con el botón de ataque
export default function Combate() {

  // Obtenemos estado y dispatch del contexto
  const { state, dispatch } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      {/* Botón de atacar */}
      <button
        className='col-md-4 col-12 btn btn-danger btn-lg'
        onClick={() => dispatch({ type: 'ATACAR_MONSTRUO' })}
        disabled={!state.juegoIniciado || state.juegoPausado || state.juegoTerminado}
      >
        ⚔️ ATACAR
        <br />
        <small>(Haces {state.ataqueJugador} de daño)</small>
      </button>
    </div>
  )
}
