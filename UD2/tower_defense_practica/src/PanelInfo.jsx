import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function PanelInfo() {
    const { state, dispatch } = useContext(GameContext);
    let contenido;

    if (state.juegoTerminado) {
        contenido = (
            <>
                <h1 className='col-12' style={{ color: 'red' }}>GAME OVER</h1>
                <p className='col-12'>Oleada alcanzada: {state.numeroOleada}</p>
                <p className='col-12'>Puntos totales: {state.puntos}</p>
                <button
                    className='col-4 btn btn-success'
                    onClick={() => dispatch({ type: 'REINICIAR_JUEGO' })}
                >
                    Reiniciar Juego
                </button>
            </>
        );
    } else {
        contenido = (
            <>
                <h3 className='col-12'>Oleada {state.numeroOleada}</h3>

                <h3 className='col-12' style={{ color: state.tiempoRestante <= 5 ? 'red' : 'black' }}>
                    Tiempo: {state.tiempoRestante}s
                </h3>

                <h3 className='col-12'>Puntos: {state.puntos}</h3>

                <p className='col-12'>Enemigos restantes: {state.enemigosRestantes}</p>

                <p className='col-12'>
                    Daño por clic: {state.danioPorClick}
                </p>

                {state.megaClicActivo && (
                    <div className="col-12 text-center">
                        <div className='progress' style={{ height: '30px', width: '200px', margin: '0 auto' }}>
                            <div
                                className='progress-bar bg-warning'
                                role='progressbar'
                                style={{ width: `${(state.megaClicDuracion / 10) * 100}%` }}
                            >
                                (x2 ACTIVO {state.megaClicDuracion}s!)
                            </div>
                        </div>
                    </div>
                )}

                <p className='col-12'>
                    Daño automático: {state.danioPorSegundo}/s
                </p>
            </>
        );
    }

    return (
        <div className='row justify-content-center'>
            {contenido}
        </div>
    );
}

