import { createContext, useEffect, useReducer } from 'react';

// Creamos el contexto para compartir el estado del juego
export const GameContext = createContext();

// Estado inicial del juego
const INITIAL_STATE = {
  dinero: 50,

  // Array de parcelas: cada una tiene tipo de cultivo, tiempo restante
  parcelas: [
    { tipo: null, tiempoRestante: 0 }, // null = vacía
    { tipo: null, tiempoRestante: 0 },
    { tipo: null, tiempoRestante: 0 }
  ],

  numeroParcelas: 3, // Cantidad de parcelas disponibles
  precioParcela: 200,

  fertilizanteActivo: false,
  tiempoFertilizante: 0,

  cosechaAutomatica: false,
  precioCosechaAutomatica: 300,

  juegoIniciado: false,
  juegoPausado: false
}

// Datos de los cultivos
const CULTIVOS = {
  trigo: { coste: 10, tiempo: 5, valor: 25 },
  maiz: { coste: 30, tiempo: 10, valor: 70 },
  tomate: { coste: 50, tiempo: 15, valor: 120 }
}

// Provider que envuelve la aplicación
export function GameProvider({ children }) {

  // Función reductora con toda la lógica del juego
  function gameReducer(state, action) {

    let outputState = state;

    // Acción para plantar un cultivo en una parcela específica
    if (action.type == 'PLANTAR') {
      const { tipoCultivo, indiceParcela } = action;
      const cultivo = CULTIVOS[tipoCultivo];

      // Solo plantamos si: hay dinero suficiente, parcela existe y está vacía
      if (state.dinero >= cultivo.coste && indiceParcela < state.numeroParcelas && state.parcelas[indiceParcela].tipo == null) {
        const nuevasParcelas = [...state.parcelas];
        // Plantamos el cultivo con su tiempo de crecimiento
        nuevasParcelas[indiceParcela] = {
          tipo: tipoCultivo,
          tiempoRestante: cultivo.tiempo
        };

        outputState = {
          ...state,
          dinero: state.dinero - cultivo.coste,
          parcelas: nuevasParcelas
        }
      }
    }
    // Acción para cosechar una parcela
    else if (action.type == 'COSECHAR') {
      const { indiceParcela } = action;
      const parcela = state.parcelas[indiceParcela];

      // Solo cosechamos si el cultivo está listo (tiempo = 0)
      if (parcela.tipo != null && parcela.tiempoRestante <= 0) {
        const cultivo = CULTIVOS[parcela.tipo];
        const nuevasParcelas = [...state.parcelas];
        // Vaciamos la parcela
        nuevasParcelas[indiceParcela] = { tipo: null, tiempoRestante: 0 };

        outputState = {
          ...state,
          dinero: state.dinero + cultivo.valor,
          parcelas: nuevasParcelas
        }
      }
    }
    // Acción para hacer avanzar el tiempo de crecimiento
    else if (action.type == 'TICK_CULTIVOS') {
      // Solo si el juego está activo
      if (state.juegoIniciado && !state.juegoPausado) {
        const nuevasParcelas = state.parcelas.map(parcela => {
          // Si hay cultivo plantado y aún le queda tiempo
          if (parcela.tipo != null && parcela.tiempoRestante > 0) {
            // Reducimos tiempo: normal 1 seg, o 2 seg si fertilizante está activo
            const reduccion = state.fertilizanteActivo ? 2 : 1;
            return {
              ...parcela,
              tiempoRestante: Math.max(parcela.tiempoRestante - reduccion, 0)
            };
          }
          return parcela;
        });

        outputState = { ...state, parcelas: nuevasParcelas }
      }
    }
    // Acción para cosecha automática (si está comprada)
    else if (action.type == 'COSECHA_AUTOMATICA') {
      if (state.cosechaAutomatica && state.juegoIniciado && !state.juegoPausado) {
        let nuevasParcelas = [...state.parcelas];
        let dineroGanado = 0;

        // Recorremos todas las parcelas
        const numParcelasActuales = nuevasParcelas.length;
        for (let indice = 0; indice < numParcelasActuales; indice = indice + 1) {
          const parcela = nuevasParcelas[indice];
          // Si está lista para cosechar, la cosechamos automáticamente
          if (parcela.tipo != null && parcela.tiempoRestante <= 0) {
            const cultivo = CULTIVOS[parcela.tipo];
            dineroGanado = dineroGanado + cultivo.valor;
            nuevasParcelas[indice] = { tipo: null, tiempoRestante: 0 };
          }
        }

        if (dineroGanado > 0) {
          outputState = {
            ...state,
            dinero: state.dinero + dineroGanado,
            parcelas: nuevasParcelas
          }
        }
      }
    }
    // Acción para comprar parcela extra
    else if (action.type == 'COMPRAR_PARCELA' && state.dinero >= state.precioParcela && state.numeroParcelas < 6) {
      const nuevasParcelas = [...state.parcelas, { tipo: null, tiempoRestante: 0 }];

      outputState = {
        ...state,
        dinero: state.dinero - state.precioParcela,
        numeroParcelas: state.numeroParcelas + 1,
        parcelas: nuevasParcelas,
        precioParcela: Math.round(state.precioParcela * 1.5) // +50% precio
      }
    }
    // Acción para activar fertilizante temporal
    else if (action.type == 'COMPRAR_FERTILIZANTE' && state.dinero >= 100 && !state.fertilizanteActivo) {
      outputState = {
        ...state,
        dinero: state.dinero - 100,
        fertilizanteActivo: true,
        tiempoFertilizante: 30 // Dura 30 segundos
      }
    }
    // Acción para hacer tick del fertilizante
    else if (action.type == 'TICK_FERTILIZANTE') {
      if (state.fertilizanteActivo && state.juegoIniciado && !state.juegoPausado) {
        const nuevoTiempo = state.tiempoFertilizante - 1;
        outputState = {
          ...state,
          tiempoFertilizante: nuevoTiempo,
          fertilizanteActivo: nuevoTiempo > 0
        }
      }
    }
    // Acción para comprar cosecha automática
    else if (action.type == 'COMPRAR_COSECHA_AUTOMATICA' && state.dinero >= state.precioCosechaAutomatica && !state.cosechaAutomatica) {
      outputState = {
        ...state,
        dinero: state.dinero - state.precioCosechaAutomatica,
        cosechaAutomatica: true
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
    // Acción para reiniciar el juego
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

  // Timer principal: crecimiento de cultivos, fertilizante y cosecha automática
  useEffect(() => {
    let timer = setInterval(() => {
      dispatch({ type: 'TICK_CULTIVOS' })
      dispatch({ type: 'TICK_FERTILIZANTE' })
      dispatch({ type: 'COSECHA_AUTOMATICA' })
    }, 1000);

    return () => clearInterval(timer)
  }, []);

  // Retornamos el Provider con estado, dispatch y datos de cultivos
  return (
    <GameContext.Provider value={{ state, dispatch, CULTIVOS }}>
      {children}
    </GameContext.Provider>
  );
}
