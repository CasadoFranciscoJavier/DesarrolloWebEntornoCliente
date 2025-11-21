import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra el contador de galletas
export default function Contador() {

  // Obtenemos el estado del contexto
  const { state } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      {/* Math.round para mostrar número entero de galletas */}
      <h1 className='col-12'>{Math.round(state.cookies)} 🍪</h1>

      {/* Mostramos información de producción si hay mejoras compradas */}
      {(state.cursorCount > 0 || state.grandmaCount > 0 || state.factoryCount > 0) && (
        <p className='col-12'>
          Producción por segundo: {
            Math.round((state.cursorCount * 0.1 + state.grandmaCount * 1 + state.factoryCount * 5) * 10) / 10
          } 🍪/s
          {/* Mostramos multiplicador si el potenciador está activo */}
          {state.potenciadorActivo && <span> (x3 ACTIVO! {state.tiempoPotenciador}s)</span>}
        </p>
      )}
    </div>
  )
}
