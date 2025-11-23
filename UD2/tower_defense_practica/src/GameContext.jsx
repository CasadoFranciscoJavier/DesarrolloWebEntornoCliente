import { createContext, useEffect, useReducer } from 'react';

export const GameContext = createContext();

const INITIAL_STATE = {
    puntos: 0,
    danioPorClick: 1,
    precioDanioClic: 20,

    danioPorSegundo: 0,
    precioDanioSegundo: 30,

    saludEnemigo: 20,
    saludMaximaEnemigo: 20,
    numeroOleada: 1,
    enemigosRestantes: 5,

    megaClicActivo: false,
    megaClicDuracion: 0,

    tiempoRestante: 20,
    juegoTerminado: false
};

export function GameProvider({ children }) {

    function gameReducer(state, action) {

        let outputState = state;

        if (action.type == 'CLIC_ENEMIGO') {
            const danio = state.megaClicActivo ? state.danioPorClick * 2 : state.danioPorClick;
            const nuevaSaludEnemigo = state.saludEnemigo - danio;

            if (nuevaSaludEnemigo > 0) {
                outputState = { ...state, saludEnemigo: nuevaSaludEnemigo }
            }
            else {
                outputState = { ...state, puntos: state.puntos + 5, saludEnemigo: 0 }
            }
        }
        else if (action.type == 'GENERAR_ENEMIGO') {
            const salud = 20 + state.numeroOleada * 10;
            outputState = {
                ...state,
                saludEnemigo: salud,
                saludMaximaEnemigo: salud,
                enemigosRestantes: state.enemigosRestantes - 1
            }
        }
        else if (action.type == 'DANIO_AUTOMATICO') {
            if (state.saludEnemigo > 0 && !state.juegoTerminado) {
                const nuevaSaludEnemigo = state.saludEnemigo - state.danioPorSegundo;

                if (nuevaSaludEnemigo > 0) {
                    outputState = { ...state, saludEnemigo: nuevaSaludEnemigo }
                }
                else {
                    outputState = { ...state, puntos: state.puntos + 5, saludEnemigo: 0 }
                }
            }
        }
        else if (action.type == 'TICK_TIEMPO') {
            if (!state.juegoTerminado) {
                outputState = { ...state, tiempoRestante: state.tiempoRestante - 1 }
            }
        }
        else if (action.type == 'NUEVA_OLEADA') {
            const cantidadEnemigos = 5 + state.numeroOleada;
            outputState = {
                ...state,
                numeroOleada: state.numeroOleada + 1,
                enemigosRestantes: cantidadEnemigos,
                tiempoRestante: 20
            }
        }
        else if (action.type == 'COMPRAR_DANIO_CLIC' && state.puntos >= state.precioDanioClic) {
            outputState = {
                ...state,
                danioPorClick: state.danioPorClick + 1,
                puntos: state.puntos - state.precioDanioClic,
                precioDanioClic: Math.round(state.precioDanioClic * 1.2)
            }
        }
        else if (action.type == 'COMPRAR_DANIO_SEGUNDO' && state.puntos >= state.precioDanioSegundo) {
            outputState = {
                ...state,
                danioPorSegundo: state.danioPorSegundo + 1,
                puntos: state.puntos - state.precioDanioSegundo,
                precioDanioSegundo: Math.round(state.precioDanioSegundo * 1.15)
            }
        }
        else if (action.type == 'COMPRAR_MEGA_CLIC' && state.puntos >= 50 && !state.megaClicActivo) {
            outputState = {
                ...state,
                puntos: state.puntos - 50,
                megaClicActivo: true,
                megaClicDuracion: 10
            }
        }
        else if (action.type == 'TICK_MEGA_CLIC') {
            if (state.megaClicActivo && !state.juegoTerminado) {
                const nuevaDuracion = state.megaClicDuracion - 1;
                outputState = {
                    ...state,
                    megaClicDuracion: nuevaDuracion,
                    megaClicActivo: nuevaDuracion > 0
                }
            }
        }
        else if (action.type == 'COMPROBAR_GAME_OVER') {
            const terminado = state.tiempoRestante <= 0 && (state.saludEnemigo > 0 || state.enemigosRestantes > 0);
            outputState = { ...state, juegoTerminado: terminado }
        }
        else if (action.type == 'REINICIAR_JUEGO') {
            outputState = INITIAL_STATE
        }


        return outputState;
    }

    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

    useEffect(() => {
        let timer = setInterval(() => {
            dispatch({ type: 'DANIO_AUTOMATICO' })
            dispatch({ type: 'TICK_TIEMPO' })
            dispatch({ type: 'TICK_MEGA_CLIC' })
            dispatch({ type: 'COMPROBAR_GAME_OVER' })
        }, 1000);

        return () => clearInterval(timer)
    }, []);

    useEffect(() => {
        if (state.saludEnemigo <= 0 && state.enemigosRestantes > 0) {
            dispatch({ type: 'GENERAR_ENEMIGO' })
        }

        if (state.saludEnemigo <= 0 && state.enemigosRestantes == 0) {
            dispatch({ type: 'NUEVA_OLEADA' })
        }
    }, [state.saludEnemigo, state.enemigosRestantes]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

