import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GameProvider } from "./GameContext";
import { GameContext } from './GameContext';
import { useContext } from "react";



import CookieAction from "./CookieAction";
import Mejoras from "./Mejoras";



export default function PanelInfo() {
    const { state } = useContext(GameContext);
    return (
        <>
            <div className='container'>
                <h1 className='text-center'>🍪 Cookie Clicker 🍪</h1>
                <h3>Nivel click: x{Math.round(state.clickMultiplier)}</h3>
                <h3>Click automático: x{Math.round(state.cursorCount * 0.1 + state.grandmaCount * 1)}</h3>

            </div>

        </>
    );
}






