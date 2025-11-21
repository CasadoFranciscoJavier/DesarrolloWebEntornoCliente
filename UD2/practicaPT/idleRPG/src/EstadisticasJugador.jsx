import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra las estadísticas del jugador
export default function EstadisticasJugador() {

  // Obtenemos el estado del contexto
  const { state } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      <div className='col-md-6 col-12'>
        <h2>⚔️ Tu Héroe</h2>

        {/* Barra de vida del jugador */}
        <div className='progress' style={{ height: '25px' }}>
          <div
            className='progress-bar bg-success'
            role='progressbar'
            style={{ width: `${(state.vidaJugador / state.vidaMaximaJugador) * 100}%` }}
          >
            {/* Mostramos vida actual / vida máxima */}
            ❤️ {Math.round(state.vidaJugador)} / {state.vidaMaximaJugador}
          </div>
        </div>

        <br />

        {/* Estadísticas del jugador */}
        <p>
          💰 Oro: {state.oro}
          <br />
          ⚔️ Ataque: {state.ataqueJugador}
          <br />
          🛡️ Defensa: {state.defensaJugador}
        </p>

        {/* Mostramos equipo comprado */}
        <p style={{ fontSize: '0.9em', color: 'gray' }}>
          Espadas: {state.contadorEspadas} | Escudos: {state.contadorEscudos} | Armaduras: {state.contadorArmaduras}
        </p>
      </div>
    </div>
  )
}
