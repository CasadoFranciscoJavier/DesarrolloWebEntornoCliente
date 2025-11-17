import { useReducer, useEffect, useState } from "react";
import "./App.css";

import ruletaImg from "./assets/ruleta.png";
import palancaOff from "./assets/palanca-off.png";
import palancaOn from "./assets/palanca-on.png";

const initialState = {
  cookies: 0,
  cursorCount: 0,
  clickMultiplier: 1,
  grandmaCount: 0,
  cursorPrice: 15,
  multiplierPrice: 50,
  grandmaPrice: 100,
};


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function App() {

  const [estaGirando, setEstaGirando] = useState(false);
  const [numeroAleatorio, setNumeroAleatorio] = useState("")
  const [colorAleatorio, setColorAleatorio] = useState("")

  // function generarNumeroAleatorio() {
  //   let numero = getRandomInt(0, 36);
  //   setNumeroAleatorio(numero);
  //   return numero;
  // }

  function casilleroApuestas() {


    const numeroColorRuleta = [
  // Cero
  { numero: 0, color: 'Verde' },

  // Rojos (1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36)
  { numero: 1, color: 'Rojo' },
  { numero: 3, color: 'Rojo' },
  { numero: 5, color: 'Rojo' },
  { numero: 7, color: 'Rojo' },
  { numero: 9, color: 'Rojo' },
  { numero: 12, color: 'Rojo' },
  { numero: 14, color: 'Rojo' },
  { numero: 16, color: 'Rojo' },
  { numero: 18, color: 'Rojo' },
  { numero: 19, color: 'Rojo' },
  { numero: 21, color: 'Rojo' },
  { numero: 23, color: 'Rojo' },
  { numero: 25, color: 'Rojo' },
  { numero: 27, color: 'Rojo' },
  { numero: 30, color: 'Rojo' },
  { numero: 32, color: 'Rojo' },
  { numero: 34, color: 'Rojo' },
  { numero: 36, color: 'Rojo' },

  // Negros (2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35)
  { numero: 2, color: 'Negro' },
  { numero: 4, color: 'Negro' },
  { numero: 6, color: 'Negro' },
  { numero: 8, color: 'Negro' },
  { numero: 10, color: 'Negro' },
  { numero: 11, color: 'Negro' },
  { numero: 13, color: 'Negro' },
  { numero: 15, color: 'Negro' },
  { numero: 17, color: 'Negro' },
  { numero: 20, color: 'Negro' },
  { numero: 22, color: 'Negro' },
  { numero: 24, color: 'Negro' },
  { numero: 26, color: 'Negro' },
  { numero: 28, color: 'Negro' },
  { numero: 29, color: 'Negro' },
  { numero: 31, color: 'Negro' },
  { numero: 33, color: 'Negro' },
  { numero: 35, color: 'Negro' },
];
    let numero = getRandomInt(0, 36);

      setNumeroAleatorio(numeroColorRuleta[numero].numero);
      setColorAleatorio(numeroColorRuleta[numero].color);
    return numero;
  }



  const jugarRuleta = () => {
    console.log("¡La ruleta está girando!");
    setEstaGirando(true);

   
    setTimeout(() => {
      setEstaGirando(false);
      casilleroApuestas();
    }, 3000);
  };

  
  const claseGiro = estaGirando ? 'girando' : '';
    const estadoPalanca = estaGirando ? palancaOn : palancaOff;



  return (
    <div className="app">
      <h2>RULETA</h2>

      <div className="ruletaLoader">
    
        <img 
          src={ruletaImg} 
          alt="Ruleta" 
          width="120" 
          className={claseGiro} 
          style={{ width: '400px', height: 'auto' }} 
        />
        </div>
      <div className="palancaContainer">

        <button onClick={jugarRuleta} disabled={estaGirando}>
          <img 
            src={estadoPalanca} 
            alt="Palanca" 
            width="120" 
            style={{ 
              width: '200px', 
              height: 'auto', 
              backgroundColor: 'transparent' 
            }} 
          />
        </button>
            <h1>{numeroAleatorio} {colorAleatorio}</h1>
     
        <br />
      </div>
    </div>
  );
}

export default App;