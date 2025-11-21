import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra el monstruo actual
export default function Monstruo() {

  // Obtenemos el estado del contexto
  const { state } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      <div className='col-md-6 col-12'>
        <h2>👾 Monstruo Nivel {state.nivelMonstruo}</h2>

        {/* Barra de vida del monstruo */}
        <div className='progress' style={{ height: '25px' }}>
          <div
            className='progress-bar bg-danger'
            role='progressbar'
            style={{ width: `${(state.vidaMonstruo / state.vidaMaximaMonstruo) * 100}%` }}
          >
            {/* Mostramos vida actual / vida máxima */}
            {Math.round(state.vidaMonstruo)} / {state.vidaMaximaMonstruo}
          </div>
        </div>

        <br />

        {/* Estadísticas del monstruo */}
        <p>
          ⚔️ Ataque: {state.ataqueMonstruo}
          <br />
          💰 Recompensa: {10 + (state.nivelMonstruo * 15)} oro
        </p>
      </div>
    </div>
  )
}
