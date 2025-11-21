import { createContext, useEffect, useReducer } from 'react';

// Creamos el contexto para compartir el estado del juego
export const GameContext = createContext();

// Estado inicial con todas las variables del juego
const INITIAL_STATE = {
  puntos: 0,

  danioClic: 1,
  danioSegundo: 0,

  numeroOleada: 1,
  enemigosRestantes: 5,

  saludEnemigo: 20,
  saludMaxEnemigo: 20,

  precioDanioClic: 20,
  precioDanioSegundo: 30,

  tiempoRestante: 20,

  megaClicActivo: false,
  tiempoMegaClic: 0,

  juegoIniciado: false,
  juegoPausado: false,
  juegoTerminado: false
}

// Provider que envuelve la aplicación
export function GameProvider({ children }) {

  // Función reductora con toda la lógica del juego
  function gameReducer(state, action) {

    let outputState = state;

    // Acción para atacar al enemigo con clic
    if (action.type == 'CLIC_ENEMIGO') {
      // Calculamos daño: normal o x2 si mega clic está activo
      const danio = state.megaClicActivo ? state.danioClic * 2 : state.danioClic;
      const nuevaSaludEnemigo = state.saludEnemigo - danio;

      // Si el enemigo sigue vivo, actualizamos su vida
      if (nuevaSaludEnemigo > 0) {
        outputState = { ...state, saludEnemigo: nuevaSaludEnemigo }
      }
      // Si muere, ganamos puntos y reseteamos su vida a 0
      else {
        outputState = { ...state, puntos: state.puntos + 5, saludEnemigo: 0 }
      }
    }
    // Acción para generar un nuevo enemigo
    else if (action.type == 'GENERAR_ENEMIGO') {
      // Vida del enemigo escala con la oleada: 20 + (oleada * 10)
      const salud = 20 + state.numeroOleada * 10;
      outputState = {
        ...state,
        saludEnemigo: salud,
        saludMaxEnemigo: salud,
        enemigosRestantes: state.enemigosRestantes - 1 // Restamos un enemigo de la oleada
      }
    }
    // Acción para aplicar daño automático cada segundo
    else if (action.type == 'DANIO_AUTOMATICO') {
      // Solo si el enemigo está vivo y el juego no está pausado
      if (state.saludEnemigo > 0 && state.juegoIniciado && !state.juegoPausado) {
        const nuevaSaludEnemigo = state.saludEnemigo - state.danioSegundo;

        if (nuevaSaludEnemigo > 0) {
          outputState = { ...state, saludEnemigo: nuevaSaludEnemigo }
        }
        else {
          outputState = { ...state, puntos: state.puntos + 5, saludEnemigo: 0 }
        }
      }
    }
    // Acción para reducir el tiempo cada segundo
    else if (action.type == 'TICK_TIEMPO') {
      // Solo si el juego está iniciado y no pausado
      if (state.juegoIniciado && !state.juegoPausado) {
        outputState = { ...state, tiempoRestante: state.tiempoRestante - 1 }
      }
    }
    // Acción para iniciar una nueva oleada
    else if (action.type == 'NUEVA_OLEADA') {
      // Cantidad de enemigos: 5 + número de oleada actual
      const cantidadEnemigos = 5 + state.numeroOleada;
      outputState = {
        ...state,
        numeroOleada: state.numeroOleada + 1,
        enemigosRestantes: cantidadEnemigos,
        tiempoRestante: 20 // Reiniciamos el tiempo
      }
    }
    // Acción para comprar mejora de daño por clic
    else if (action.type == 'COMPRAR_DANIO_CLIC' && state.puntos >= state.precioDanioClic) {
      outputState = {
        ...state,
        danioClic: state.danioClic + 1,
        puntos: state.puntos - state.precioDanioClic,
        precioDanioClic: Math.round(state.precioDanioClic * 1.2) // +20% precio
      }
    }
    // Acción para comprar mejora de daño por segundo
    else if (action.type == 'COMPRAR_DANIO_SEGUNDO' && state.puntos >= state.precioDanioSegundo) {
      outputState = {
        ...state,
        danioSegundo: state.danioSegundo + 1,
        puntos: state.puntos - state.precioDanioSegundo,
        precioDanioSegundo: Math.round(state.precioDanioSegundo * 1.15) // +15% precio
      }
    }
    // Acción para activar mega clic temporal
    else if (action.type == 'COMPRAR_MEGA_CLIC' && state.puntos >= 50 && !state.megaClicActivo) {
      outputState = {
        ...state,
        puntos: state.puntos - 50,
        megaClicActivo: true,
        tiempoMegaClic: 10 // Dura 10 segundos
      }
    }
    // Acción para reducir el tiempo del mega clic
    else if (action.type == 'TICK_MEGA_CLIC') {
      if (state.megaClicActivo && state.juegoIniciado && !state.juegoPausado) {
        const nuevoTiempo = state.tiempoMegaClic - 1;
        outputState = {
          ...state,
          tiempoMegaClic: nuevoTiempo,
          megaClicActivo: nuevoTiempo > 0 // Se desactiva cuando llega a 0
        }
      }
    }
    // Acción para comprobar si el juego ha terminado (Game Over)
    else if (action.type == 'COMPROBAR_GAME_OVER') {
      // Game over si el tiempo es 0 y aún hay enemigos vivos o restantes
      const terminado = state.tiempoRestante <= 0 && (state.saludEnemigo > 0 || state.enemigosRestantes > 0);
      outputState = { ...state, juegoTerminado: terminado }
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
      outputState = INITIAL_STATE
    }

    return outputState;

  }

  // Hook useReducer para gestionar el estado
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

  // Timer principal: daño automático, tiempo y mega clic
  useEffect(() => {
    let timer = setInterval(() => {
      dispatch({ type: 'DANIO_AUTOMATICO' })
      dispatch({ type: 'TICK_TIEMPO' })
      dispatch({ type: 'TICK_MEGA_CLIC' })
      dispatch({ type: 'COMPROBAR_GAME_OVER' })
    }, 1000);

    return () => clearInterval(timer)
  }, []);

  // useEffect para gestionar muerte de enemigos y cambio de oleada
  useEffect(() => {
    // Si el enemigo muere y quedan más enemigos, generamos uno nuevo
    if (state.saludEnemigo <= 0 && state.enemigosRestantes > 0) {
      dispatch({ type: 'GENERAR_ENEMIGO' })
    }

    // Si ya no quedan enemigos, pasamos a la siguiente oleada
    if (state.saludEnemigo <= 0 && state.enemigosRestantes == 0) {
      dispatch({ type: 'NUEVA_OLEADA' })
    }
  }, [state.saludEnemigo, state.enemigosRestantes]);

  // Retornamos el Provider con estado y dispatch
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
