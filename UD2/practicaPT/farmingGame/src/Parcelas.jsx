import { useContext } from 'react';
import { GameContext } from './GameContext';
import Parcela from './Parcela';

// Componente que muestra todas las parcelas disponibles
export default function Parcelas() {

  // Obtenemos el estado del contexto
  const { state } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      {/* Mapeamos las parcelas y mostramos cada una con su índice */}
      {state.parcelas.map((parcela, indice) => (
        // Solo mostramos las parcelas que están dentro del número disponible
        indice < state.numeroParcelas && <Parcela key={indice} indice={indice} />
      ))}
    </div>
  )
}
