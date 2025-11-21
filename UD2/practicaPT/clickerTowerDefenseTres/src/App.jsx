import { useEffect, useReducer } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

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
  tiempoMegaClic: 0
}

export default function App() {

  function gameReducer(state, action) {

    let outputState = state;

    if (action.type == 'CLIC_ENEMIGO') {
      const danio = state.megaClicActivo ? state.danioClic * 2 : state.danioClic;
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
        saludMaxEnemigo: salud,
        enemigosRestantes: state.enemigosRestantes - 1
      }
    }
    else if (action.type == 'DANIO_AUTOMATICO') {
      if (state.saludEnemigo > 0) {
        const nuevaSaludEnemigo = state.saludEnemigo - state.danioSegundo;

        if (nuevaSaludEnemigo > 0) {
          outputState = { ...state, saludEnemigo: nuevaSaludEnemigo }
        }
        else {
          outputState = { ...state, puntos: state.puntos + 5, saludEnemigo: 0 }
        }
      }
    }
    else if (action.type == 'TICK_TIEMPO') {
      outputState = { ...state, tiempoRestante: state.tiempoRestante - 1 }
    }
    else if (action.type == 'NUEVA_OLEADA') {
      const cantidadEnemigos = 5 + state.numeroOleada;
      outputState = {
        ...state,
        numeroOleada: state.numeroOleada + 1,
        enemigosRestantes: cantidadEnemigos,
        tiempoRestante: 15
      }
    }
    else if (action.type == 'COMPRAR_DANIO_CLIC' && state.puntos >= state.precioDanioClic) {
      outputState = {
        ...state,
        danioClic: state.danioClic + 1,
        puntos: state.puntos - state.precioDanioClic,
        precioDanioClic: Math.round(state.precioDanioClic * 1.2)
      }
    }
    else if (action.type == 'COMPRAR_DANIO_SEGUNDO' && state.puntos >= state.precioDanioSegundo) {
      outputState = {
        ...state,
        danioSegundo: state.danioSegundo + 1,
        puntos: state.puntos - state.precioDanioSegundo,
        precioDanioSegundo: Math.round(state.precioDanioSegundo * 1.15)
      }
    }
    else if (action.type == 'COMPRAR_MEGA_CLIC' && state.puntos >= 50 && !state.megaClicActivo) {
      outputState = {
        ...state,
        puntos: state.puntos - 50,
        megaClicActivo: true,
        tiempoMegaClic: 10
      }
    }
    else if (action.type == 'TICK_MEGA_CLIC') {
      if (state.megaClicActivo) {
        const nuevoTiempo = state.tiempoMegaClic - 1;
        outputState = {
          ...state,
          tiempoMegaClic: nuevoTiempo,
          megaClicActivo: nuevoTiempo > 0
        }
      }
    }

    return outputState;

  }

  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE)

  useEffect(() => {
    let timer = setInterval(() => {
      dispatch({ type: 'DANIO_AUTOMATICO' })
      dispatch({ type: 'TICK_TIEMPO' })
      dispatch({ type: 'TICK_MEGA_CLIC' })
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

  const juegoTerminado = state.tiempoRestante <= 0 && (state.saludEnemigo > 0 || state.enemigosRestantes > 0);

  return (
    <>
      <div className='container'>
        {juegoTerminado ? (
          <div className='row justify-content-center'>
            <h1 className='col-12'>Fin del juego</h1>
            <p className='col-12'>Oleada alcanzada: {state.numeroOleada}</p>
            <p className='col-12'>Puntos totales: {state.puntos}</p>
          </div>
        ) : (
          <>
            <div className='row justify-content-center'>
              <h1 className='col-12'>Oleada {state.numeroOleada}</h1>
              <h2 className='col-12'>Tiempo: {state.tiempoRestante}s</h2>
              <h2 className='col-12'>Puntos: {state.puntos}</h2>
              <p className='col-12'>Enemigos restantes: {state.enemigosRestantes}</p>
            </div>

            <div className='row justify-content-center'>
              {state.saludEnemigo > 0 ? (
                <div className='col-12'>
                  <h3>Enemigo: {Math.round(state.saludEnemigo)} / {state.saludMaxEnemigo}</h3>
                  <button className='btn btn-danger' onClick={() => dispatch({ type: 'CLIC_ENEMIGO' })}>
                    Atacar ({state.megaClicActivo ? state.danioClic * 2 : state.danioClic} daño)
                  </button>
                </div>
              ) : (
                <p className='col-12'>Esperando enemigo...</p>
              )}
            </div>

            <div className='row justify-content-center'>
              <h2 className='col-12'>Mejoras</h2>
              <p className='col-12'>Danio por clic: {state.danioClic} | Danio por segundo: {state.danioSegundo}</p>
            </div>

            <div className='row justify-content-center'>
              <button className='col-md-3 col-12 btn btn-primary' onClick={() => dispatch({ type: 'COMPRAR_DANIO_CLIC' })}>
                Mejorar clic (+1): {state.precioDanioClic} puntos
              </button>
              <button className='col-md-3 col-12 btn btn-primary' onClick={() => dispatch({ type: 'COMPRAR_DANIO_SEGUNDO' })}>
                Mejorar automatico (+1): {state.precioDanioSegundo} puntos
              </button>
              <button className='col-md-3 col-12 btn btn-warning' onClick={() => dispatch({ type: 'COMPRAR_MEGA_CLIC' })}>
                Mega clic x2 (50 puntos) {state.megaClicActivo ? `${state.tiempoMegaClic}s` : ''}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
