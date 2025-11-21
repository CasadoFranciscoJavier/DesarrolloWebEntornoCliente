import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra todas las mejoras disponibles para comprar
export default function Mejoras() {

  // Obtenemos estado y dispatch del contexto
  const { state, dispatch } = useContext(GameContext);

  return (
    <>
      <div className='row justify-content-center'>
        <h2 className='col-12'>Mejoras</h2>
      </div>

      {/* Sección de mejoras de producción automática */}
      <div className='row justify-content-center'>
        <h3 className='col-12'>Producción Automática</h3>

        {/* Botón para comprar cursor */}
        <button
          className='col-md-2 col-12 btn btn-primary'
          onClick={() => dispatch({ type: 'BUY_CURSOR' })}
          disabled={state.cookies < state.cursorPrice} // Deshabilitado si no hay galletas suficientes
        >
          🖱️ Cursor
          <br />
          x{state.cursorCount}
          <br />
          {state.cursorPrice} 🍪
          <br />
          <small>(+0.1/s)</small>
        </button>

        {/* Botón para comprar abuela */}
        <button
          className='col-md-2 col-12 btn btn-primary'
          onClick={() => dispatch({ type: 'BUY_GRANDMA' })}
          disabled={state.cookies < state.grandmaPrice}
        >
          👵 Abuela
          <br />
          x{state.grandmaCount}
          <br />
          {state.grandmaPrice} 🍪
          <br />
          <small>(+1/s)</small>
        </button>

        {/* Botón para comprar fábrica */}
        <button
          className='col-md-2 col-12 btn btn-primary'
          onClick={() => dispatch({ type: 'BUY_FACTORY' })}
          disabled={state.cookies < state.factoryPrice}
        >
          🏭 Fábrica
          <br />
          x{state.factoryCount}
          <br />
          {state.factoryPrice} 🍪
          <br />
          <small>(+5/s)</small>
        </button>
      </div>

      {/* Sección de mejoras de clic manual */}
      <div className='row justify-content-center'>
        <h3 className='col-12'>Mejora de Clic</h3>

        {/* Botón para comprar multiplicador de clic */}
        <button
          className='col-md-3 col-12 btn btn-success'
          onClick={() => dispatch({ type: 'BUY_MULTIPLIER' })}
          disabled={state.cookies < state.multiplierPrice}
        >
          ⚡ Multiplicador
          <br />
          x{state.clickMultiplier}
          <br />
          {state.multiplierPrice} 🍪
          <br />
          <small>(+1 por clic)</small>
        </button>
      </div>

      {/* Sección de potenciadores temporales */}
      <div className='row justify-content-center'>
        <h3 className='col-12'>Potenciadores</h3>

        {/* Botón para activar potenciador temporal */}
        <button
          className='col-md-4 col-12 btn btn-danger'
          onClick={() => dispatch({ type: 'ACTIVAR_POTENCIADOR' })}
          disabled={state.cookies < 200 || state.potenciadorActivo} // Deshabilitado si no hay galletas o ya está activo
        >
          🚀 Potenciador x3
          <br />
          200 🍪
          <br />
          <small>(Dura 10 segundos)</small>
          {/* Mostramos tiempo restante si está activo */}
          {state.potenciadorActivo && <><br /><strong>ACTIVO: {state.tiempoPotenciador}s</strong></>}
        </button>
      </div>
    </>
  )
}
