import { createContext, useReducer } from 'react';

// Creamos el contexto para compartir el estado del juego
export const GameContext = createContext();

// Estado inicial del juego con todas las variables
const INITIAL_STATE = {
  oro: 0,

  vidaJugador: 100,
  vidaMaximaJugador: 100,
  ataqueJugador: 10,
  defensaJugador: 0,

  nivelMonstruo: 1,
  vidaMonstruo: 50,
  vidaMaximaMonstruo: 50,
  ataqueMonstruo: 5,

  precioEspada: 30,
  precioEscudo: 20,
  precioPocion: 25,
  precioArmadura: 80,

  contadorEspadas: 0,
  contadorEscudos: 0,
  contadorArmaduras: 0,

  juegoIniciado: false,
  juegoPausado: false,
  juegoTerminado: false
}

// Provider que envuelve la aplicación
export function GameProvider({ children }) {

  // Función reductora con toda la lógica del juego
  function gameReducer(state, action) {

    let outputState = state;

    // Acción para atacar al monstruo
    if (action.type == 'ATACAR_MONSTRUO') {
      // Solo si el juego está activo y el jugador está vivo
      if (state.juegoIniciado && !state.juegoPausado && state.vidaJugador > 0) {
        // Calculamos daño del jugador al monstruo
        const danioAlMonstruo = Math.max(state.ataqueJugador, 1); // Mínimo 1 de daño
        const nuevaVidaMonstruo = state.vidaMonstruo - danioAlMonstruo;

        // Si el monstruo muere
        if (nuevaVidaMonstruo <= 0) {
          // Calculamos el oro ganado: 10 + (nivel * 15)
          const oroGanado = 10 + (state.nivelMonstruo * 15);

          // Generamos siguiente monstruo
          const nuevoNivel = state.nivelMonstruo + 1;
          const nuevaVidaMaxMonstruo = 50 + (nuevoNivel * 20);
          const nuevoAtaqueMonstruo = 5 + (nuevoNivel * 3);

          outputState = {
            ...state,
            oro: state.oro + oroGanado,
            nivelMonstruo: nuevoNivel,
            vidaMonstruo: nuevaVidaMaxMonstruo,
            vidaMaximaMonstruo: nuevaVidaMaxMonstruo,
            ataqueMonstruo: nuevoAtaqueMonstruo
          }
        }
        // Si el monstruo sobrevive, contraataca
        else {
          // Calculamos daño del monstruo al jugador (mínimo 1)
          const danioAlJugador = Math.max(state.ataqueMonstruo - state.defensaJugador, 1);
          const nuevaVidaJugador = state.vidaJugador - danioAlJugador;

          outputState = {
            ...state,
            vidaMonstruo: nuevaVidaMonstruo,
            vidaJugador: Math.max(nuevaVidaJugador, 0), // No puede ser negativa
            juegoTerminado: nuevaVidaJugador <= 0 // Game Over si muere el jugador
          }
        }
      }
    }
    // Acción para comprar espada (mejora ataque)
    else if (action.type == 'COMPRAR_ESPADA' && state.oro >= state.precioEspada) {
      outputState = {
        ...state,
        ataqueJugador: state.ataqueJugador + 5,
        oro: state.oro - state.precioEspada,
        precioEspada: Math.round(state.precioEspada * 1.3), // +30% precio
        contadorEspadas: state.contadorEspadas + 1
      }
    }
    // Acción para comprar escudo (mejora defensa)
    else if (action.type == 'COMPRAR_ESCUDO' && state.oro >= state.precioEscudo) {
      outputState = {
        ...state,
        defensaJugador: state.defensaJugador + 3,
        oro: state.oro - state.precioEscudo,
        precioEscudo: Math.round(state.precioEscudo * 1.25), // +25% precio
        contadorEscudos: state.contadorEscudos + 1
      }
    }
    // Acción para comprar poción (recupera vida)
    else if (action.type == 'COMPRAR_POCION' && state.oro >= state.precioPocion) {
      // Recuperamos 50 de vida pero sin superar el máximo
      const nuevaVida = Math.min(state.vidaJugador + 50, state.vidaMaximaJugador);
      outputState = {
        ...state,
        vidaJugador: nuevaVida,
        oro: state.oro - state.precioPocion
      }
    }
    // Acción para comprar armadura (aumenta vida máxima)
    else if (action.type == 'COMPRAR_ARMADURA' && state.oro >= state.precioArmadura) {
      const nuevaVidaMaxima = state.vidaMaximaJugador + 20;
      // Al aumentar vida máxima, también recuperamos esa vida
      const nuevaVidaActual = state.vidaJugador + 20;

      outputState = {
        ...state,
        vidaMaximaJugador: nuevaVidaMaxima,
        vidaJugador: nuevaVidaActual,
        oro: state.oro - state.precioArmadura,
        precioArmadura: Math.round(state.precioArmadura * 1.4), // +40% precio
        contadorArmaduras: state.contadorArmaduras + 1
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

  // Hook useReducer para gestionar el estado
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

  // Retornamos el Provider con estado y dispatch
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
