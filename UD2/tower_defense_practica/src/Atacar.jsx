import { useContext } from 'react';
import { GameContext } from './GameContext';

export default function Atacar() {
    const { state, dispatch } = useContext(GameContext);

    if (state.juegoTerminado) {
        return null;
    }

    return (
        <div className='row justify-content-center'>
         
                <div className='col-md-6 col-12'>
                    <h3>Enemigo</h3>

                    <div className='progress' style={{ height: '30px' }}>
                        <div
                            className='progress-bar bg-danger'
                            role='progressbar'
                            style={{ width: `${(state.saludEnemigo / state.saludMaximaEnemigo) * 100}%` }}
                        >
                            {Math.round(state.saludEnemigo)} / {state.saludMaximaEnemigo}
                        </div>
                    </div>

                    <br />
                    <button
                        className='btn btn-danger btn-lg'
                        onClick={() => dispatch({ type: 'CLIC_ENEMIGO' })}
                    >
                        Atacar
                        <br />
                        ({state.megaClicActivo ? state.danioPorClick * 2 : state.danioPorClick} de daño)
                    </button>
                </div>
         
            
        </div>
    )
}
