import { createContext, useEffect, useReducer } from 'react';

// Creamos el contexto que compartirá el estado entre componentes
export const GameContext = createContext();

// Estado inicial del juego con todas las variables necesarias
const INITIAL_STATE = {
  cookies: 0,

  cursorCount: 0,
  clickMultiplier: 1,
  grandmaCount: 0,
  factoryCount: 0,

  cursorPrice: 15,
  multiplierPrice: 50,
  grandmaPrice: 100,
  factoryPrice: 500,

  potenciadorActivo: false,
  tiempoPotenciador: 0,

  juegoIniciado: false,
  juegoPausado: false
}

// Provider que envuelve la aplicación y proporciona el estado global
export function GameProvider({ children }) {

  // Función reductora que gestiona todas las acciones del juego
  function gameReducer(state, action) {

    let outputState = state;

    // Acción para hacer clic en la galleta
    if (action.type == 'CLICK_COOKIE') {
      // Calculamos las galletas ganadas: multiplicador base * (potenciador si está activo)
      const cookiesGanadas = state.clickMultiplier * (state.potenciadorActivo ? 3 : 1);
      outputState = { ...state, cookies: state.cookies + cookiesGanadas }
    }
    // Acción para generar galletas automáticamente cada segundo
    else if (action.type == 'GENERATE_COOKIES') {
      // Solo genera si el juego está iniciado y no pausado
      if (state.juegoIniciado && !state.juegoPausado) {
        // Calculamos producción: cursores + abuelas + fábricas
        const produccion = (
          state.cursorCount * 0.1 +
          state.grandmaCount * 1 +
          state.factoryCount * 5
        ) * (state.potenciadorActivo ? 3 : 1); // Multiplicamos por 3 si el potenciador está activo

        outputState = { ...state, cookies: state.cookies + produccion }
      }
    }
    // Acción para comprar un cursor
    else if (action.type == 'BUY_CURSOR' && state.cookies >= state.cursorPrice) {
      outputState = {
        ...state,
        cursorCount: state.cursorCount + 1,
        cookies: state.cookies - state.cursorPrice,
        cursorPrice: Math.round(state.cursorPrice * 1.1) // Aumenta precio 10%
      }
    }
    // Acción para comprar un multiplicador de clic
    else if (action.type == 'BUY_MULTIPLIER' && state.cookies >= state.multiplierPrice) {
      outputState = {
        ...state,
        clickMultiplier: state.clickMultiplier + 1,
        cookies: state.cookies - state.multiplierPrice,
        multiplierPrice: Math.round(state.multiplierPrice * 1.2) // Aumenta precio 20%
      }
    }
    // Acción para comprar una abuela
    else if (action.type == 'BUY_GRANDMA' && state.cookies >= state.grandmaPrice) {
      outputState = {
        ...state,
        grandmaCount: state.grandmaCount + 1,
        cookies: state.cookies - state.grandmaPrice,
        grandmaPrice: Math.round(state.grandmaPrice * 1.3) // Aumenta precio 30%
      }
    }
    // Acción para comprar una fábrica
    else if (action.type == 'BUY_FACTORY' && state.cookies >= state.factoryPrice) {
      outputState = {
        ...state,
        factoryCount: state.factoryCount + 1,
        cookies: state.cookies - state.factoryPrice,
        factoryPrice: Math.round(state.factoryPrice * 1.4) // Aumenta precio 40%
      }
    }
    // Acción para activar el potenciador temporal
    else if (action.type == 'ACTIVAR_POTENCIADOR' && state.cookies >= 200 && !state.potenciadorActivo) {
      outputState = {
        ...state,
        cookies: state.cookies - 200,
        potenciadorActivo: true,
        tiempoPotenciador: 10 // Dura 10 segundos
      }
    }
    // Acción para hacer tick del potenciador (reduce el tiempo cada segundo)
    else if (action.type == 'TICK_POTENCIADOR') {
      if (state.potenciadorActivo) {
        const nuevoTiempo = state.tiempoPotenciador - 1;
        outputState = {
          ...state,
          tiempoPotenciador: nuevoTiempo,
          potenciadorActivo: nuevoTiempo > 0 // Se desactiva cuando llega a 0
        }
      }
    }
    // Acción para iniciar el juego
    else if (action.type == 'INICIAR_JUEGO') {
      outputState = { ...state, juegoIniciado: true, juegoPausado: false }
    }
    // Acción para pausar el juego
    else if (action.type == 'PAUSAR_JUEGO') {
      outputState = { ...state, juegoPausado: true }
    }
    // Acción para reanudar el juego
    else if (action.type == 'REANUDAR_JUEGO') {
      outputState = { ...state, juegoPausado: false }
    }
    // Acción para reiniciar el juego completamente
    else if (action.type == 'REINICIAR_JUEGO') {
      // Reiniciamos PERO iniciamos el juego automáticamente
      outputState = {
        ...INITIAL_STATE,
        juegoIniciado: true,
        juegoPausado: false
      }
    }

    return outputState;

  }

  // Hook useReducer: gestiona el estado con el reducer
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

  // useEffect para el timer principal: genera galletas y controla el potenciador
  useEffect(() => {
    let timer = setInterval(() => {
      dispatch({ type: 'GENERATE_COOKIES' })
      dispatch({ type: 'TICK_POTENCIADOR' })
    }, 1000);

    return () => clearInterval(timer)
  }, []);

  // Retornamos el Provider con el estado y dispatch disponibles para todos los hijos
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
