import { useReducer } from "react";
import "./App.css";

import galletaImg from "./img/galleta.png";
import abuelaImg from "./img/abuela.png";
import cursorImg from "./img/cursor.png";

const initialState = {
  cookies: 0,
  cursorCount: 0,
  clickMultiplier: 1,
  grandmaCount: 0,
  cursorPrice: 15,
  multiplierPrice: 50,
  grandmaPrice: 100,
};

function contadorReducer(state, action) {
  let nuevoEstado = state;
 
  if (action.tipo == "cursor" && cookies >= cursorPrice) {
    nuevoEstado = { ...state, cursorCount: state.cursorCount + 1};
  } else if (action.tipo == "multiplicador") {
    nuevoEstado = { ...state, clickMultiplier: state.clickMultiplier + 1 };
  } else if (action.tipo == "abuela") {
    nuevoEstado = { ...state, grandmaCount: state.grandmaCount + 1 };
  } else if (action.tipo == "galleta") {
    nuevoEstado = { ...state, cookies: state.cookies + 1 };
  }

  return nuevoEstado;
}

function Contador() {
  const [state, dispatch] = useReducer(contadorReducer, initialState);

  return (
    <div className="app">
      <h2>COOKIE CLICKER</h2>

      <div className="galleta">
        <button
          onClick={() => dispatch({ tipo: "galleta" })}
          className="transparente"
        >
          <img src={galletaImg} alt="Galleta" width="120" />
          <br />
          Cookies: {state.cookies}
        </button>
      </div>

      <div className="botones">
        <button
          onClick={() => dispatch({ tipo: "cursor" })}
          className="transparente"
        >
          <img src={cursorImg} alt="Cursor" width="50" />
          <br />
          Cursor (x{state.cursorCount})
          <br />
          Precio: {state.cursorPrice}
        </button>

        <button
          onClick={() => dispatch({ tipo: "multiplicador" })}
          className="transparente"
        >
          <i className="fa fa-times"></i>
          <br />
          Multiplicador (x{state.clickMultiplier})
           <br />
          Precio: {state.multiplierPrice}
        </button>

        <button
          onClick={() => dispatch({ tipo: "abuela" })}
          className="transparente"
        >
          <img src={abuelaImg} alt="Abuela" width="50" />
          <br />
          Abuela (x{state.grandmaCount})
           <br />
          Precio: {state.grandmaPrice}
        </button>
      </div>
    </div>
  );
}

export default Contador;


// https://www.w3schools.com/react/react_useeffect.asp