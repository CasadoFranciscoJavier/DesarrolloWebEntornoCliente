import { useReducer } from 'react';

// Función reductora
function contadorReducer(state, action) {

  let estadoSalida = state;

  if(action.tipo == 'incrementar'){
    estadoSalida = { count: state.count + 1 }
  }
  else if(action.tipo == 'decrementar'){
    estadoSalida = { count: state.count - 1 }
  }
  else if(action.tipo == 'reiniciar'){
    estadoSalida = { count: 0 }
  }

  return estadoSalida;
}

function Contador() {

  const [state, dispatch] = useReducer(contadorReducer, { count: 0 });

  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ tipo: 'incrementar' })}>Incrementar</button>
      <button onClick={() => dispatch({ tipo: 'decrementar' })}>Decrementar</button>
      <button onClick={() => dispatch({ tipo: 'reiniciar' })}>Reiniciar</button>
    </div>
  );
}

export default Contador;