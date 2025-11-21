import "./App.css";
import { useContext } from 'react';
import { GameContext } from './GameContext';

import CookieAction from "./CookieAction";
import Purchase from "./Purchase";

import { GameProvider } from "./GameContext";

function ContenidoJuego() {
    const { state } = useContext(GameContext);


  return (
    <>
      <CookieAction />

      <br />

      <Purchase />

      <br />


    </>


  );
}
export default function App() {
  return (
    <>
      {/* GameProvider envuelve toda la aplicación */}
      <GameProvider>
        <div className='container'>
          <h1 className='text-center'>🍪 Cookie Clicker 🍪</h1>

          <ContenidoJuego />
        </div>
      </GameProvider>
    </>
  );
}






// https://www.w3schools.com/react/react_useeffect.asp