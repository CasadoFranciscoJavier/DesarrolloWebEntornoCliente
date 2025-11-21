import { useContext } from 'react';
import { GameContext } from './GameContext';

// Componente que muestra la información principal del juego
export default function InfoJuego() {

  // Obtenemos el estado del contexto
  const { state } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      {/* Mostramos el dinero actual */}
      <h2 className='col-12'>💰 Dinero: {state.dinero} monedas</h2>

      {/* Mostramos cantidad de parcelas */}
      <p className='col-12'>🌾 Parcelas disponibles: {state.numeroParcelas}</p>

      {/* Mostramos si fertilizante está activo */}
      {state.fertilizanteActivo && (
        <p className='col-12' style={{ color: 'green', fontWeight: 'bold' }}>
          🚀 FERTILIZANTE ACTIVO! Crecimiento x2 ({state.tiempoFertilizante}s)
        </p>
      )}

      {/* Mostramos si cosecha automática está comprada */}
      {state.cosechaAutomatica && (
        <p className='col-12' style={{ color: 'blue' }}>
          🤖 Cosecha automática ACTIVA
        </p>
      )}
    </div>
  )
}
