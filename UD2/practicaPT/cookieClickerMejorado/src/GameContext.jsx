import { createContext, useEffect, useReducer } from 'react';
import galletaImg from "./img/galleta.png";
import abuelaImg from "./img/abuela.png";
import cursorImg from "./img/cursor.png";


export const GameContext = createContext();

const INITIAL_STATE = {
    cookies: 0,
    cursorCount: 0,
    clickMultiplier: 1,
    grandmaCount: 0,
    cursorPrice: 15,
    multiplierPrice: 50,
    grandmaPrice: 100,
    galletaImg,
    abuelaImg,
    cursorImg
};

export function GameProvider({ children }) {
    function contadorReducer(state, action) {
        let outputState = { ...state };

        if (action.tipo == "cursor" && state.cookies >= state.cursorPrice) {
            outputState = {
                ...state,
                cookies: state.cookies - state.cursorPrice,
                cursorCount: state.cursorCount + 1,
                cursorPrice: Math.round(state.cursorPrice * 1.1)
            };

        } else if (action.tipo == "multiplicador" && state.cookies >= state.multiplierPrice) {
            outputState = {
                ...state,
                cookies: state.cookies - state.multiplierPrice,
                clickMultiplier: state.clickMultiplier + 1,
                multiplierPrice: Math.round(state.multiplierPrice * 1.2)
            };

        } else if (action.tipo == "abuela" && state.cookies >= state.grandmaPrice) {
            outputState = {
                ...state,
                cookies: state.cookies - state.grandmaPrice,
                grandmaCount: state.grandmaCount + 1,
                grandmaPrice: Math.round(state.grandmaPrice * 1.3)
            };

        } else if (action.tipo == "galleta") {
            outputState = { ...state, cookies: state.cookies + state.clickMultiplier };
        }

        if (action.tipo == "auto") {
            outputState = {
                ...state,
                cookies: state.cookies + action.cantidad
            };
        }

        return outputState;
    }

    const [state, dispatch] = useReducer(contadorReducer, INITIAL_STATE);

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
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    )

}