
import { useContext } from 'react';
import { GameContext } from './GameContext';

import './App.css'

export default function CookieAction() {
     const { state, dispatch } = useContext(GameContext);
     return (

    <div className='container'>
         <div className='row justify-content-center'>
          <button className='col-md-2 col-12  btn btn-transparent' 
          onClick={() => dispatch({ type: 'BUY_CURSOR' })}
          disabled={state.cookies < state.cursorPrice}>
            <img className='img-fluid' src={state.cursorImg} />
            x{state.cursorCount}
          </button>

          <button className='col-md-2 col-12  btn btn-transparent' 
          onClick={() => dispatch({ type: 'BUY_MULTIPLIER' })}
          disabled={state.cookies < state.multiplierPrice}>
            <img className='img-fluid' src={state.multiplierImg} />
            x{state.clickMultiplier}
          </button>
          
          <button className='col-md-2 col-12  btn btn-transparent' 
          onClick={() => dispatch({ type: 'BUY_GRANDMA' })}
          disabled={state.cookies < state.grandmaPrice}>
            <img className='img-fluid' src={state.grandmaImg} />
            x{state.grandmaCount}
          </button>
        </div>
        <div className='row justify-content-center'>
          <p className='col-md-2 col-12'>{state.cursorPrice} 🍪</p>
          <p className='col-md-2 col-12'>{state.multiplierPrice} 🍪</p>
          <p className='col-md-2 col-12'>{state.grandmaPrice} 🍪</p>
        </div>
    </div>
        )
}