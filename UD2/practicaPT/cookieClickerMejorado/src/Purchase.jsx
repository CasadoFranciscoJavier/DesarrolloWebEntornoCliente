
import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function Purchase() {
 
      const { state, dispatch } = useContext(GameContext);

  return (
    <div className="app">
      <h2>TIENDA</h2>


      <div className="botones">
        <button
          onClick={() => dispatch({ tipo: "cursor" })}
          className="transparente"
        >
          <img src={state.cursorImg} alt="Cursor" width="50" />
          <br />
          Cursor (x{state.cursorCount})
          <br />
          Precio: {state.cursorPrice}
        </button>

        <button
          onClick={() => dispatch({ tipo: "multiplicador" })}
          className="transparente"
        >
          <i>❌</i>
          <br />
          Multiplicador (x{state.clickMultiplier})
          <br />
          Precio: {state.multiplierPrice}
        </button>

        <button
          onClick={() => dispatch({ tipo: "abuela" })}
          className="transparente"
        >
          <img src={state.abuelaImg} alt="Abuela" width="50" />
          <br />
          Abuela (x{state.grandmaCount})
          <br />
          Precio: {state.grandmaPrice}
        </button>
      </div>
    </div>
  );
}

