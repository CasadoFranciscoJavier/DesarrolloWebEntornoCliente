import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente con las mejoras disponibles para comprar
export default function Mejoras() {

  // Obtenemos estado y dispatch del contexto
  const { state, dispatch } = useContext(GameContext);

  return (
    <>
      <div className='row justify-content-center'>
        <h2 className='col-12'>🛠️ Mejoras</h2>
      </div>

      <div className='row justify-content-center'>
        {/* Botón para comprar parcela extra */}
        <button
          className='col-md-3 col-12 btn btn-primary'
          onClick={() => dispatch({ type: 'COMPRAR_PARCELA' })}
          disabled={state.dinero < state.precioParcela || state.numeroParcelas >= 6 || !state.juegoIniciado}
        >
          🌾 Parcela Extra
          <br />
          💰 {state.precioParcela} monedas
          <br />
          <small>({state.numeroParcelas}/6 parcelas)</small>
        </button>

        {/* Botón para comprar fertilizante temporal */}
        <button
          className='col-md-3 col-12 btn btn-success'
          onClick={() => dispatch({ type: 'COMPRAR_FERTILIZANTE' })}
          disabled={state.dinero < 100 || state.fertilizanteActivo || !state.juegoIniciado}
        >
          🚀 Fertilizante x2
          <br />
          💰 100 monedas
          <br />
          <small>(Dura 30 segundos)</small>
          {/* Mostramos tiempo restante si está activo */}
          {state.fertilizanteActivo && (
            <>
              <br />
              <strong>⏱️ {state.tiempoFertilizante}s</strong>
            </>
          )}
        </button>

        {/* Botón para comprar cosecha automática */}
        <button
          className='col-md-3 col-12 btn btn-warning'
          onClick={() => dispatch({ type: 'COMPRAR_COSECHA_AUTOMATICA' })}
          disabled={state.dinero < state.precioCosechaAutomatica || state.cosechaAutomatica || !state.juegoIniciado}
        >
          🤖 Cosecha Automática
          <br />
          💰 {state.precioCosechaAutomatica} monedas
          <br />
          <small>(Permanente)</small>
          {/* Mostramos si ya está comprada */}
          {state.cosechaAutomatica && (
            <>
              <br />
              <strong>✓ COMPRADA</strong>
            </>
          )}
        </button>
      </div>
    </>
  )
}
