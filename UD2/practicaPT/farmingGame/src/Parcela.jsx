import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra una parcela individual
export default function Parcela({ indice }) {

  // Obtenemos estado y dispatch del contexto
  const { state, dispatch } = useContext(GameContext);

  // Obtenemos la parcela actual
  const parcela = state.parcelas[indice];

  // Si la parcela está vacía
  if (parcela.tipo == null) {
    return (
      <div className='col-md-4 col-12'>
        <div className='card' style={{ minHeight: '150px', backgroundColor: '#f0f0f0' }}>
          <div className='card-body text-center'>
            <h5>Parcela {indice + 1}</h5>
            <p>🟫 Vacía</p>
          </div>
        </div>
      </div>
    )
  }

  // Si la parcela tiene cultivo
  const emojisCultivos = {
    trigo: '🌾',
    maiz: '🌽',
    tomate: '🍅'
  };

  const emoji = emojisCultivos[parcela.tipo];
  const estaLista = parcela.tiempoRestante <= 0;

  return (
    <div className='col-md-4 col-12'>
      <div className='card' style={{ minHeight: '150px', backgroundColor: estaLista ? '#d4edda' : '#fff3cd' }}>
        <div className='card-body text-center'>
          <h5>Parcela {indice + 1}</h5>
          <h2>{emoji}</h2>

          {/* Si está lista para cosechar */}
          {estaLista ? (
            <>
              <p style={{ color: 'green', fontWeight: 'bold' }}>¡Listo para cosechar!</p>
              {/* Botón de cosechar (si cosecha automática no está activa) */}
              {!state.cosechaAutomatica && (
                <button
                  className='btn btn-success'
                  onClick={() => dispatch({ type: 'COSECHAR', indiceParcela: indice })}
                  disabled={!state.juegoIniciado || state.juegoPausado}
                >
                  Cosechar
                </button>
              )}
              {state.cosechaAutomatica && <p><small>(Cosecha automática)</small></p>}
            </>
          ) : (
            // Si aún está creciendo
            <>
              <p>Creciendo...</p>
              <p><strong>{parcela.tiempoRestante}s</strong></p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
