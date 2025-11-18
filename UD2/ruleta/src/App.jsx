import { useReducer,useState } from "react";
import "./App.css";

import ruletaImg from "./assets/ruleta.png";
import palancaOffImg from "./assets/palanca-off.png";
import palancaOnImg from "./assets/palanca-on.png";


const infoCasillas = [
  { numero: 0, color: "Verde" },
  { numero: 1, color: "Rojo" }, { numero: 2, color: "Negro" }, { numero: 3, color: "Rojo" },
  { numero: 4, color: "Negro" }, { numero: 5, color: "Rojo" }, { numero: 6, color: "Negro" },
  { numero: 7, color: "Rojo" }, { numero: 8, color: "Negro" }, { numero: 9, color: "Rojo" },
  { numero: 10, color: "Negro" }, { numero: 11, color: "Negro" }, { numero: 12, color: "Rojo" },
  { numero: 13, color: "Negro" }, { numero: 14, color: "Rojo" }, { numero: 15, color: "Negro" },
  { numero: 16, color: "Rojo" }, { numero: 17, color: "Negro" }, { numero: 18, color: "Rojo" },
  { numero: 19, color: "Rojo" }, { numero: 20, color: "Negro" }, { numero: 21, color: "Rojo" },
  { numero: 22, color: "Negro" }, { numero: 23, color: "Rojo" }, { numero: 24, color: "Negro" },
  { numero: 25, color: "Rojo" }, { numero: 26, color: "Negro" }, { numero: 27, color: "Rojo" },
  { numero: 28, color: "Negro" }, { numero: 29, color: "Negro" }, { numero: 30, color: "Rojo" },
  { numero: 31, color: "Negro" }, { numero: 32, color: "Rojo" }, { numero: 33, color: "Negro" },
  { numero: 34, color: "Rojo" }, { numero: 35, color: "Negro" }, { numero: 36, color: "Rojo" },
];

const filaSuperior = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
const filaMedia =    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const filaInferior = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];

const initialState = {
  numeroSimple: 0,
  color: 0,
  parImpar: 1,
  tercio: 0,
  columna: 15,
  multiplierNumero: 36,
  multiplierColor: 2,
  multiplierParImpar: 2,
  multiplierTercio: 3,
  multiplierColumna: 3
};

function apuestaReducer(state, action) {
  let nuevoEstado = { ...state };
                                                                                                              
  if (action.tipo == "numeroSimple" && state.cookies >= state.cursorPrice) {
    nuevoEstado = {
      ...state,
      cookies: state.cookies - state.cursorPrice,
      cursorCount: state.cursorCount + 1,
      cursorPrice: Math.round(state.cursorPrice * 1.1)
    };

  } else if (action.tipo == "multiplicador" && state.cookies >= state.multiplierPrice) {
    nuevoEstado = {
      ...state,
      cookies: state.cookies - state.multiplierPrice,
      clickMultiplier: state.clickMultiplier + 1,
      multiplierPrice: Math.round(state.multiplierPrice * 1.2)
    };

  } else if (action.tipo == "abuela" && state.cookies >= state.grandmaPrice) {
    nuevoEstado = {
      ...state,
      cookies: state.cookies - state.grandmaPrice,
      grandmaCount: state.grandmaCount + 1,
      grandmaPrice: Math.round(state.grandmaPrice * 1.3)
    };

  } else if (action.tipo == "galleta") {
    nuevoEstado = { ...state, cookies: state.cookies + state.clickMultiplier };
  }

  if (action.tipo == "auto") {
    nuevoEstado = {
      ...state,
      cookies: state.cookies + action.cantidad
    };
  }

  return nuevoEstado;
}



function getInfoNumero(numero) {
  const info = infoCasillas.find(casilla => casilla.numero == numero);
  
  let resultado = { numero: numero, color: "Negro" };
  if (info) {
    resultado = info;
  }
  return resultado;
}


function App() {
  const [estaGirando, setEstaGirando] = useState(false);
  const [numeroAleatorio, setNumeroAleatorio] = useState("");
  const [colorAleatorio, setColorAleatorio] = useState("");
  const [saldo, setSaldo] = useState(50);
  const [apuesta, setApuesta] = useState(0);
  const [modalApuestasAbierto, setModalApuestasAbierto] = useState(false);
  const [apuestaTemporal, setApuestaTemporal] = useState(5);
  const [errorModal, setErrorModal] = useState("");




  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const casilleroApuestas = () => {
    let indice = getRandomInt(0, 36);
    setNumeroAleatorio(infoCasillas[indice].numero);
    setColorAleatorio(infoCasillas[indice].color);
  };

  const abrirModalApuestas = (tipo, valor) => {
    console.log(`Iniciando apuesta a: ${tipo} ${valor}`);
    setApuestaTemporal(5);
    setErrorModal("");
    setModalApuestasAbierto(true);
  };

  const aumentarApuesta = () => {
    if (apuestaTemporal + 5 <= saldo) setApuestaTemporal(apuestaTemporal + 5);
  };

  const disminuirApuesta = () => {
    if (apuestaTemporal - 5 >= 5) setApuestaTemporal(apuestaTemporal - 5);
  };

  const confirmarApuesta = () => {
    let esValida = true;
    if (apuestaTemporal < 5 || apuestaTemporal > saldo) {
      setErrorModal("Apuesta no válida. Mínimo 5€ y no puedes superar tu saldo.");
      esValida = false;
    }

    if (esValida) {
      setSaldo((saldo) => saldo - apuestaTemporal);
      setApuesta((apuesta) => apuesta + apuestaTemporal); 
      setModalApuestasAbierto(false);
   
    }
  };

  const jugarRuleta = () => {
    if (apuesta == 0) {
      alert("Debes confirmar al menos una apuesta."); 
      return;
    }
    setEstaGirando(true);
    setTimeout(() => {
      setEstaGirando(false);
      casilleroApuestas();
      console.log("Apostaste en total:", apuesta);
      // Aquí calcula ganancias según apuesta y resultado
      
      setApuesta(0); 
    }, 3000);
  };

  const claseGiro = estaGirando ? "girando" : "";
  const estadoPalancaImg = estaGirando ? palancaOnImg : palancaOffImg;


  const BotonNumero = ({ numero }) => {
    const info = getInfoNumero(numero);
    const claseColor = info.color == "Rojo" ? "rojo" : "negro";
    
    return (
       <button
        className={`numero ${claseColor}`}
        onClick={() => abrirModalApuestas('numero', numero)}
      >
        {numero}
      </button>
    )
  }

  return (
    <div className="app">
      <h2>RULETA</h2>

      <div className="panelInfoJugador">
        <p>Saldo: {saldo}€</p>
        <p>Apuesta: {apuesta}€</p>
      </div>

      {modalApuestasAbierto && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>¿Cuánto deseas apostar?</h3>
            <p>Saldo disponible: {saldo}€</p>
            <div>
              <button onClick={disminuirApuesta}>-5</button>
              <span style={{ margin: "0 10px" }}>{apuestaTemporal}€</span>
              <button onClick={aumentarApuesta}>+5</button>
            </div>
          
            {errorModal && <p className="modalError">{errorModal}</p>}
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => setModalApuestasAbierto(false)}>Cancelar</button>
              <button onClick={confirmarApuesta}>Confirmar Apuesta</button>
            </div>
          </div>
        </div>
      )}

      <h1>
        {numeroAleatorio} {colorAleatorio}
      </h1>

      <div className="ruletaLoader">
        <img
          src={ruletaImg}
          alt="Ruleta"
          className={claseGiro}
          style={{ width: "400px", height: "auto" }}
        />
        <div className="palancaContainer">
          <button onClick={jugarRuleta} disabled={estaGirando || apuesta == 0}>
            <img src={estadoPalancaImg} alt="Palanca" width="120" /> Gira la ruleta
          </button>
        </div>
      </div>

 
      <div className="tableroContainer">
        <div className="tableroRuleta">
          
         
          <button
            className="cero"
            onClick={() => abrirModalApuestas('numero', 0)}
          >
            0
          </button>

        
          {filaSuperior.map((num) => (
            <BotonNumero key={num} numero={num} />
          ))}

          {filaMedia.map((num) => (
            <BotonNumero key={num} numero={num} />
          ))}

          {filaInferior.map((num) => (
            <BotonNumero key={num} numero={num} />
          ))}

        
          <button className="columna-bet" onClick={() => abrirModalApuestas('columna', 1)}>2 to 1</button>
          <button className="columna-bet" onClick={() => abrirModalApuestas('columna', 2)}>2 to 1</button>
          <button className="columna-bet" onClick={() => abrirModalApuestas('columna', 3)}>2 to 1</button>
          
          <button className="docena-bet" onClick={() => abrirModalApuestas('docena', '1-12')}>1st 12</button>
          <button className="docena-bet" onClick={() => abrirModalApuestas('docena', '13-24')}>2nd 12</button>
          <button className="docena-bet" onClick={() => abrirModalApuestas('docena', '25-36')}>3rd 12</button>
          
          <button className="color-bet rojo" onClick={() => abrirModalApuestas('color', 'Rojo')}>Rojo</button>
          <button className="color-bet negro" onClick={() => abrirModalApuestas('color', 'Negro')}>Negro</button>

          <button className="parImpar-bet par" onClick={() => abrirModalApuestas('parImpar', 'par')}>Par</button>
          <button className="parImpar-bet impar" onClick={() => abrirModalApuestas('parImpar', 'impar')}>Impar</button>

        </div>
      </div>
    </div>
  );
};

export default App;
















// import { useReducer, useState } from "react";
// import "./App.css";

// import ruletaImg from "./assets/ruleta.png";
// import palancaOffImg from "./assets/palanca-off.png";
// import palancaOnImg from "./assets/palanca-on.png";

// const infoCasillas = [
//   { numero: 0, color: "Verde" },
//   { numero: 1, color: "Rojo" }, { numero: 2, color: "Negro" }, { numero: 3, color: "Rojo" },
//   { numero: 4, color: "Negro" }, { numero: 5, color: "Rojo" }, { numero: 6, color: "Negro" },
//   { numero: 7, color: "Rojo" }, { numero: 8, color: "Negro" }, { numero: 9, color: "Rojo" },
//   { numero: 10, color: "Negro" }, { numero: 11, color: "Negro" }, { numero: 12, color: "Rojo" },
//   { numero: 13, color: "Negro" }, { numero: 14, color: "Rojo" }, { numero: 15, color: "Negro" },
//   { numero: 16, color: "Rojo" }, { numero: 17, color: "Negro" }, { numero: 18, color: "Rojo" },
//   { numero: 19, color: "Rojo" }, { numero: 20, color: "Negro" }, { numero: 21, color: "Rojo" },
//   { numero: 22, color: "Negro" }, { numero: 23, color: "Rojo" }, { numero: 24, color: "Negro" },
//   { numero: 25, color: "Rojo" }, { numero: 26, color: "Negro" }, { numero: 27, color: "Rojo" },
//   { numero: 28, color: "Negro" }, { numero: 29, color: "Negro" }, { numero: 30, color: "Rojo" },
//   { numero: 31, color: "Negro" }, { numero: 32, color: "Rojo" }, { numero: 33, color: "Negro" },
//   { numero: 34, color: "Rojo" }, { numero: 35, color: "Negro" }, { numero: 36, color: "Rojo" },
// ];

// const initialState = {
//   saldo: 50,
//   apuesta: 0,
//   apuestas: {} // {categoria: {valor: cantidad}}
// };

// function ruletaReducer(state, action) {
//   let nuevoEstado = { ...state, apuestas: { ...state.apuestas } };

//   if (action.tipo == "apostar") {
//     let categoria = action.categoria;
//     let valor = action.valor;
//     let cantidad = action.cantidad;

//     if (cantidad > state.saldo) return state; 

//     nuevoEstado.saldo = state.saldo - cantidad;

//     if (!nuevoEstado.apuestas[categoria]) {
//       nuevoEstado.apuestas[categoria] = {};
//     }
//     if (!nuevoEstado.apuestas[categoria][valor]) {
//       nuevoEstado.apuestas[categoria][valor] = 0;
//     }
//     nuevoEstado.apuestas[categoria][valor] += cantidad;
//     nuevoEstado.apuesta += cantidad;
//   }

//   if (action.tipo == "resetApuestas") {
//     nuevoEstado.apuestas = {};
//     nuevoEstado.apuesta = 0;
//   }

//   if (action.tipo == "agregarSaldo") {
//     nuevoEstado.saldo += action.cantidad;
//   }

//   return nuevoEstado;
// }

// function getInfoNumero(numero) {
//   for (let i = 0; i < infoCasillas.length; i++) {
//     if (infoCasillas[i].numero == numero) return infoCasillas[i];
//   }
//   return { numero: numero, color: "Negro" };
// }

// function App() {
//   const [state, dispatch] = useReducer(ruletaReducer, initialState);
//   const [numeroAleatorio, setNumeroAleatorio] = useState(null);
//   const [colorAleatorio, setColorAleatorio] = useState("");
//   const [estaGirando, setEstaGirando] = useState(false);

//   function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   function apostar(categoria, valor) {
//     dispatch({ tipo: "apostar", categoria: categoria, valor: valor, cantidad: 5 });
//   }

//   function calcularGanancias(numeroResultante) {
//     let info = getInfoNumero(numeroResultante);
//     let ganancia = 0;

//     // Número simple
//     if (state.apuestas.numero && state.apuestas.numero[numeroResultante]) {
//       ganancia += state.apuestas.numero[numeroResultante] * 36;
//     }

//     // Color
//     if (state.apuestas.color && state.apuestas.color[info.color]) {
//       ganancia += state.apuestas.color[info.color] * 2;
//     }

//     // Par/Impar
//     if (numeroResultante !== 0 && state.apuestas.parImpar) {
//       let paridad = numeroResultante % 2 == 0 ? "par" : "impar";
//       if (state.apuestas.parImpar[paridad]) {
//         ganancia += state.apuestas.parImpar[paridad] * 2;
//       }
//     }

//     return ganancia;
//   }

//   function girarRuleta() {
//     if (state.apuesta == 0) {
//       alert("Debes apostar al menos una vez");
//       return;
//     }

//     setEstaGirando(true);

//     setTimeout(function () {
//       let numeroResultante = getRandomInt(0, 36);
//       let colorResultante = getInfoNumero(numeroResultante).color;

//       setNumeroAleatorio(numeroResultante);
//       setColorAleatorio(colorResultante);

//       let ganancia = calcularGanancias(numeroResultante);
//       if (ganancia > 0) {
//         dispatch({ tipo: "agregarSaldo", cantidad: ganancia });
//       }

//       dispatch({ tipo: "resetApuestas" });
//       setEstaGirando(false);
//     }, 2000);
//   }

//   let claseGiro = estaGirando ? "girando" : "";
//   let estadoPalancaImg = estaGirando ? palancaOnImg : palancaOffImg;

//   return (
//     <div className="app">
//       <h2>RULETA</h2>

//       <div className="panelInfoJugador">
//         <p>Saldo: {state.saldo}€</p>
//         <p>Apuesta total: {state.apuesta}€</p>
//       </div>

//       <h1>{numeroAleatorio !== null ? numeroAleatorio + " " + colorAleatorio : "Gira la ruleta"}</h1>

//       <div className="ruletaLoader">
//         <img src={ruletaImg} alt="Ruleta" className={claseGiro} style={{ width: "400px" }} />
//         <div className="palancaContainer">
//           <button onClick={girarRuleta} disabled={estaGirando}>
//             <img src={estadoPalancaImg} alt="Palanca" width="120" /> Gira la ruleta
//           </button>
//         </div>
//       </div>

//       <div className="tableroContainer">
//         <div className="tableroRuleta">
//           <button className="cero" onClick={function () { apostar("numero", 0); }}>0</button>
//           {infoCasillas.slice(1).map(function (casilla) {
//             let claseColor = casilla.color == "Rojo" ? "rojo" : "negro";
//             return (
//               <button key={casilla.numero} className={"numero " + claseColor} onClick={function () { apostar("numero", casilla.numero); }}>{casilla.numero}</button>
//             );
//           })}
//           <button className="color-bet rojo" onClick={function () { apostar("color", "Rojo"); }}>Rojo</button>
//           <button className="color-bet negro" onClick={function () { apostar("color", "Negro"); }}>Negro</button>
//           <button className="parImpar-bet par" onClick={function () { apostar("parImpar", "par"); }}>Par</button>
//           <button className="parImpar-bet impar" onClick={function () { apostar("parImpar", "impar"); }}>Impar</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
