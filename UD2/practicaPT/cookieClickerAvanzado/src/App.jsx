import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { GameProvider } from './GameContext';
import Contador from './Contador';
import BotonClic from './BotonClic';
import Controles from './Controles';
import Mejoras from './Mejoras';

// Componente principal que envuelve toda la aplicación con el Provider
export default function App() {

  return (
    <>
      {/* GameProvider envuelve todos los componentes para compartir el estado */}
      <GameProvider>
        <div className='container'>
          <h1 className='text-center'>Cookie Clicker Avanzado</h1>

          {/* Componente que muestra el contador de galletas */}
          <Contador />

          {/* Componente con el botón principal de clic */}
          <BotonClic />

          <br />

          {/* Componente con los controles del juego */}
          <Controles />

          <br />

          {/* Componente con todas las mejoras disponibles */}
          <Mejoras />
        </div>
      </GameProvider>
    </>
  )
}
