import { createContext, useEffect, useReducer } from 'react';
import './App.css'
import cookieImg from "./assets/galleta.png";
import cursorImg from "./assets/cursor.png";
import grandmaImg from "./assets/abuela.png";
import multiplierImg from "./assets/corre.png";


export const GameContext = createContext();

const INITIAL_STATE = {
    cookies: 0,

    cursorCount: 0,
    clickMultiplier: 1,
    grandmaCount: 0,

    cursorPrice: 15,
    multiplierPrice: 50,
    grandmaPrice: 100,

    multiplierPriceIncrement: 1.2,
    cursorPriceIncrement: 1.1,
    grandmaPriceIncrement: 1.3,

    cookieImg,
    cursorImg,
    grandmaImg,
    multiplierImg
}

export function GameProvider({ children }) {

    function cookieReducer(state, action) {

        let outputState = state;

        if (action.type == 'CLICK_COOKIE') {
            outputState = { ...state, cookies: state.cookies + state.clickMultiplier }
        }
        else if (action.type == 'BUY_MULTIPLIER' && state.cookies >= state.multiplierPrice) {
            outputState =
            {
                ...state,
                clickMultiplier: state.clickMultiplier + 1,
                cookies: state.cookies - state.multiplierPrice,
                multiplierPrice: Math.round(state.multiplierPrice * state.multiplierPriceIncrement)
            }
        }
        else if (action.type == 'BUY_CURSOR' && state.cookies >= state.cursorPrice) {
            outputState =
            {
                ...state,
                cursorCount: state.cursorCount + 1,
                cookies: state.cookies - state.cursorPrice,
                cursorPrice: Math.round(state.cursorPrice * state.cursorPriceIncrement)
            }
        }
        else if (action.type == 'BUY_GRANDMA' && state.cookies >= state.grandmaPrice) {
            outputState =
            {
                ...state,
                grandmaCount: state.grandmaCount + 1,
                cookies: state.cookies - state.grandmaPrice,
                grandmaPrice: Math.round(state.grandmaPrice * state.grandmaPriceIncrement)
            }
        }
        else if (action.type == 'GENERATE_COOKIES') {
            outputState =
            {
                ...state,
                cookies: state.cookies + state.cursorCount * 0.1 + state.grandmaCount * 1
            }
        }

        return outputState;

    }

    const [state, dispatch] = useReducer(cookieReducer, INITIAL_STATE)

    useEffect(() => {
        let timer = setInterval(() => {
            dispatch({ type: 'GENERATE_COOKIES' })
        }, 1000);

        return () => clearInterval(timer)
    }, []);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    )
}
