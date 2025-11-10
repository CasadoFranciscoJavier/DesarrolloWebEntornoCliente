import { useReducer, useEffect } from "react";
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

  let nuevoEstado = { ...state };
                                                                                                              
  if (action.tipo == "cursor" && state.cookies >= state.cursorPrice) {
    nuevoEstado = {
      ...state,
      cookies: state.cookies - state.cursorPrice,
      cursorCount: state.cursorCount + 1,
      cursorPrice: Math.round(state.cursorPrice * 1.1)
    };

  } else if (action.tipo == "multiplicador" && state.cookies >= state.multiplierPrice) {
    nuevoEstado = {
      ...state,
      cookies: state.cookies - state.multiplierPrice,
      clickMultiplier: state.clickMultiplier + 1,
      multiplierPrice: Math.round(state.multiplierPrice * 1.2)
    };

  } else if (action.tipo == "abuela" && state.cookies >= state.grandmaPrice) {
    nuevoEstado = {
      ...state,
      cookies: state.cookies - state.grandmaPrice,
      grandmaCount: state.grandmaCount + 1,
      grandmaPrice: Math.round(state.grandmaPrice * 1.3)
    };

  } else if (action.tipo == "galleta") {
    nuevoEstado = { ...state, cookies: state.cookies + state.clickMultiplier };
  }

  if (action.tipo == "auto") {
    nuevoEstado = {
      ...state,
      cookies: state.cookies + action.cantidad
    };
  }

  return nuevoEstado;
}

function Contador() {
  const [state, dispatch] = useReducer(contadorReducer, initialState);

  useEffect(() => {
    const id = setInterval(() => {

      const cookiesPorCursor = state.cursorCount * 0.1;
      const cookiesPorAbuela = state.grandmaCount * state.clickMultiplier;

      const total = cookiesPorCursor + cookiesPorAbuela;

      if (total > 0) {
        dispatch({ tipo: "auto", cantidad: total });
      }

    }, 1000);

    return () => clearInterval(id);
  }, [state.cursorCount, state.grandmaCount, state.clickMultiplier]);


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
          Cookies: {Math.floor(state.cookies)}
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