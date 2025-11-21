import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { GameProvider } from './GameContext';
import InfoJuego from './InfoJuego';
import Parcelas from './Parcelas';
import Plantar from './Plantar';
import Mejoras from './Mejoras';
import Controles from './Controles';

// Componente principal que envuelve la aplicación con el Provider
export default function App() {

  return (
    <>
      {/* GameProvider envuelve toda la aplicación para compartir el estado */}
      <GameProvider>
        <div className='container'>
          <h1 className='text-center'>🌾 Farming Game 🌾</h1>

          {/* Información del juego: dinero, parcelas, fertilizante */}
          <InfoJuego />

          <br />

          {/* Todas las parcelas de cultivo */}
          <Parcelas />

          <br />

          {/* Botones para plantar cada tipo de cultivo */}
          <Plantar />

          <br />

          {/* Controles: iniciar, pausar, reiniciar */}
          <Controles />

          <br />

          {/* Mejoras disponibles */}
          <Mejoras />
        </div>
      </GameProvider>
    </>
  )
}
