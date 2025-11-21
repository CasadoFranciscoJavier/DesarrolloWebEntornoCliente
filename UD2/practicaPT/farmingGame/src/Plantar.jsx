import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente con los botones para plantar cada tipo de cultivo
export default function Plantar() {

  // Obtenemos estado, dispatch y datos de cultivos del contexto
  const { state, dispatch, CULTIVOS } = useContext(GameContext);

  // Función para plantar en la primera parcela vacía disponible
  function plantarEnPrimeraParcelaVacia(tipoCultivo) {
    // Buscamos la primera parcela vacía
    const numParcelasActuales = state.parcelas.length;
    for (let indice = 0; indice < numParcelasActuales; indice = indice + 1) {
      const parcela = state.parcelas[indice];
      // Si la parcela está vacía y dentro del límite de parcelas disponibles
      if (parcela.tipo == null && indice < state.numeroParcelas) {
        dispatch({ type: 'PLANTAR', tipoCultivo, indiceParcela: indice });
        return;
      }
    }
  }

  return (
    <>
      <div className='row justify-content-center'>
        <h2 className='col-12'>🌱 Plantar Cultivos</h2>
      </div>

      <div className='row justify-content-center'>
        {/* Botón para plantar trigo */}
        <button
          className='col-md-2 col-12 btn btn-success'
          onClick={() => plantarEnPrimeraParcelaVacia('trigo')}
          disabled={state.dinero < CULTIVOS.trigo.coste || !state.juegoIniciado}
        >
          🌾 Trigo
          <br />
          💰 {CULTIVOS.trigo.coste} monedas
          <br />
          <small>
            ⏱️ {CULTIVOS.trigo.tiempo}s | 💵 {CULTIVOS.trigo.valor}
          </small>
        </button>

        {/* Botón para plantar maíz */}
        <button
          className='col-md-2 col-12 btn btn-warning'
          onClick={() => plantarEnPrimeraParcelaVacia('maiz')}
          disabled={state.dinero < CULTIVOS.maiz.coste || !state.juegoIniciado}
        >
          🌽 Maíz
          <br />
          💰 {CULTIVOS.maiz.coste} monedas
          <br />
          <small>
            ⏱️ {CULTIVOS.maiz.tiempo}s | 💵 {CULTIVOS.maiz.valor}
          </small>
        </button>

        {/* Botón para plantar tomate */}
        <button
          className='col-md-2 col-12 btn btn-danger'
          onClick={() => plantarEnPrimeraParcelaVacia('tomate')}
          disabled={state.dinero < CULTIVOS.tomate.coste || !state.juegoIniciado}
        >
          🍅 Tomate
          <br />
          💰 {CULTIVOS.tomate.coste} monedas
          <br />
          <small>
            ⏱️ {CULTIVOS.tomate.tiempo}s | 💵 {CULTIVOS.tomate.valor}
          </small>
        </button>
      </div>
    </>
  )
}
