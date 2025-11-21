import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente con la tienda de mejoras
export default function Tienda() {

  // Obtenemos estado y dispatch del contexto
  const { state, dispatch } = useContext(GameContext);

  return (
    <>
      <div className='row justify-content-center'>
        <h2 className='col-12'>🏪 Tienda</h2>
      </div>

      <div className='row justify-content-center'>
        {/* Botón para comprar espada */}
        <button
          className='col-md-2 col-12 btn btn-primary'
          onClick={() => dispatch({ type: 'COMPRAR_ESPADA' })}
          disabled={state.oro < state.precioEspada || !state.juegoIniciado}
        >
          ⚔️ Espada
          <br />
          💰 {state.precioEspada} oro
          <br />
          <small>(+5 ataque)</small>
        </button>

        {/* Botón para comprar escudo */}
        <button
          className='col-md-2 col-12 btn btn-primary'
          onClick={() => dispatch({ type: 'COMPRAR_ESCUDO' })}
          disabled={state.oro < state.precioEscudo || !state.juegoIniciado}
        >
          🛡️ Escudo
          <br />
          💰 {state.precioEscudo} oro
          <br />
          <small>(+3 defensa)</small>
        </button>

        {/* Botón para comprar poción */}
        <button
          className='col-md-2 col-12 btn btn-success'
          onClick={() => dispatch({ type: 'COMPRAR_POCION' })}
          disabled={state.oro < state.precioPocion || !state.juegoIniciado || state.vidaJugador >= state.vidaMaximaJugador}
        >
          🧪 Poción
          <br />
          💰 {state.precioPocion} oro
          <br />
          <small>(+50 vida)</small>
        </button>

        {/* Botón para comprar armadura */}
        <button
          className='col-md-2 col-12 btn btn-warning'
          onClick={() => dispatch({ type: 'COMPRAR_ARMADURA' })}
          disabled={state.oro < state.precioArmadura || !state.juegoIniciado}
        >
          🥋 Armadura
          <br />
          💰 {state.precioArmadura} oro
          <br />
          <small>(+20 vida máx)</small>
        </button>
      </div>
    </>
  )
}
