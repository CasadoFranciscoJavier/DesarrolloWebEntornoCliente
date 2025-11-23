import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function Mejoras() {
    const { state, dispatch } = useContext(GameContext);

    if (state.juegoTerminado) {
        return null;
    }

    return (
        <>
            <div className='row justify-content-center'>
                <h2 className='col-12'>Mejoras</h2>
            </div>

            <div className='row justify-content-center'>
                <button
                    className='col-md-3 col-12 btn btn-primary'
                    onClick={() => dispatch({ type: 'COMPRAR_DANIO_CLIC' })}
                    disabled={state.puntos < state.precioDanioClic}
                >
                    Mejorar Daño Clic
                    <br />
                    Nivel: {state.danioPorClick}
                    <br />
                    {state.precioDanioClic} puntos
                    <br />
                    <small>(+1 daño por clic)</small>
                </button>

                <button
                    className='col-md-3 col-12 btn btn-primary'
                    onClick={() => dispatch({ type: 'COMPRAR_DANIO_SEGUNDO' })}
                    disabled={state.puntos < state.precioDanioSegundo}
                >
                    Mejorar Daño Auto
                    <br />
                    Nivel: {state.danioPorSegundo}
                    <br />
                    {state.precioDanioSegundo} puntos
                    <br />
                    <small>(+1 daño/segundo)</small>
                </button>

                <button
                    className='col-md-3 col-12 btn btn-warning'
                    onClick={() => dispatch({ type: 'COMPRAR_MEGA_CLIC' })}
                    disabled={state.puntos < 50 || state.megaClicActivo}
                >
                    Mega Clic x2
                    <br />
                    50 puntos
                    <br />
                    <small>(Dura 10 segundos)</small>
                    {state.megaClicActivo && (
                        <>
                            <br />
                            <strong>ACTIVO: {state.megaClicDuracion}s</strong>
                        </>
                    )}
                </button>
            </div>
        </>
    )
}
