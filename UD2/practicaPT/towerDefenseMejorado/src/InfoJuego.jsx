import { useContext } from 'react';
import { GameContext } from './GameContext';


// Componente que muestra la información principal del juego
export default function InfoJuego() {

  // Obtenemos el estado del contexto
  const { state } = useContext(GameContext);

  return (
    <div className='row justify-content-center'>
      {/* Mostramos oleada actual */}
      <h1 className='col-12'>Oleada {state.numeroOleada}</h1>

      {/* Mostramos tiempo restante (en rojo si queda poco tiempo) */}
      <h2 className='col-12' style={{ color: state.tiempoRestante <= 5 ? 'red' : 'black' }}>
        ⏱️ Tiempo: {state.tiempoRestante}s
      </h2>

      {/* Mostramos puntos acumulados */}
      <h2 className='col-12'>💰 Puntos: {state.puntos}</h2>

      {/* Mostramos enemigos restantes en la oleada */}
      <p className='col-12'>👾 Enemigos restantes: {state.enemigosRestantes}</p>

      {/* Mostramos stats de daño */}
      <p className='col-12'>
        ⚔️ Daño por clic: {state.danioClic} {state.megaClicActivo && <span>(x2 ACTIVO {state.tiempoMegaClic}s!)</span>}
        <br />
        🔥 Daño automático: {state.danioSegundo}/s
      </p>
    </div>
  )
}


