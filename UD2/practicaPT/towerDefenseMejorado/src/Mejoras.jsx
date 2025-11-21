import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra todas las mejoras disponibles
export default function Mejoras() {

  // Obtenemos estado y dispatch del contexto
  const { state, dispatch } = useContext(GameContext);

  return (
    <>
      <div className='row justify-content-center'>
        <h2 className='col-12'>🛠️ Mejoras</h2>
      </div>

      <div className='row justify-content-center'>
        {/* Botón para mejorar daño por clic */}
        <button
          className='col-md-3 col-12 btn btn-primary'
          onClick={() => dispatch({ type: 'COMPRAR_DANIO_CLIC' })}
          disabled={state.puntos < state.precioDanioClic || !state.juegoIniciado}
        >
          ⚔️ Mejorar Daño Clic
          <br />
          Nivel: {state.danioClic}
          <br />
          💰 {state.precioDanioClic} puntos
          <br />
          <small>(+1 daño por clic)</small>
        </button>

        {/* Botón para mejorar daño automático */}
        <button
          className='col-md-3 col-12 btn btn-primary'
          onClick={() => dispatch({ type: 'COMPRAR_DANIO_SEGUNDO' })}
          disabled={state.puntos < state.precioDanioSegundo || !state.juegoIniciado}
        >
          🔥 Mejorar Daño Auto
          <br />
          Nivel: {state.danioSegundo}
          <br />
          💰 {state.precioDanioSegundo} puntos
          <br />
          <small>(+1 daño/segundo)</small>
        </button>

        {/* Botón para activar mega clic temporal */}
        <button
          className='col-md-3 col-12 btn btn-warning'
          onClick={() => dispatch({ type: 'COMPRAR_MEGA_CLIC' })}
          disabled={state.puntos < 50 || state.megaClicActivo || !state.juegoIniciado}
        >
          💥 Mega Clic x2
          <br />
          💰 50 puntos
          <br />
          <small>(Dura 10 segundos)</small>
          {/* Mostramos tiempo restante si está activo */}
          {state.megaClicActivo && (
            <>
              <br />
              <strong>⏱️ ACTIVO: {state.tiempoMegaClic}s</strong>
            </>
          )}
        </button>
      </div>
    </>
  )
}
