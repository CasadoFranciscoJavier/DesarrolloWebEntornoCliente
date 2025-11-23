import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { GameProvider } from './GameContext';
import PanelInfo from './PanelInfo';
import Atacar from './Atacar';
import Mejoras from './Mejoras';

export default function App() {

  return (
    <>
      <GameProvider>
      
          <h1 className='text-center'>🏰 Tower Defense 🏰</h1>
          <PanelInfo />
          <br />
          <Atacar />
          <br />
          <Mejoras />
      </GameProvider>
    </>
  )
}
