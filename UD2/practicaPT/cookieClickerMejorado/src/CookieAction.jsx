
import { useContext } from 'react';
import { GameContext } from './GameContext';


export default function CookieAction() {
 
      const { state, dispatch } = useContext(GameContext);

  return (
    <div className="app">

      <div className="galleta">
        <button
          onClick={() => dispatch({ tipo: "galleta" })}
          className="transparente"
        >
          <img src={state.galletaImg} alt="Galleta" width="120" />
          <br />
          Cookies: {Math.floor(state.cookies)}
        </button>
      </div>

     
    </div>
  );
}

