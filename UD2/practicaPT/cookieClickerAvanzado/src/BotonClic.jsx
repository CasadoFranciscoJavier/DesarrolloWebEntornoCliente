import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente del botón principal para hacer clic y generar galletas
export default function BotonClic() {

  // Obtenemos estado y dispatch del contexto
  const { state, dispatch } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      <button
        className='col-5 btn btn-warning'
        onClick={() => dispatch({ type: 'CLICK_COOKIE' })}
        disabled={!state.juegoIniciado || state.juegoPausado} // Deshabilitado si no está iniciado o está pausado
      >
        🍪 Hacer Clic 🍪
        <br />
        {/* Mostramos cuántas galletas ganamos por clic */}
        (+{state.clickMultiplier * (state.potenciadorActivo ? 3 : 1)} galletas)
      </button>
    </div>
  )
}
