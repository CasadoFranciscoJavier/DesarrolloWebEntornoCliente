import { useState } from "react";
import "./App.css";

// --- IMPORTACIONES DE IMAGEN RESTAURADAS (TUS RUTAS ORIGINALES) ---
import ruletaImg from "./assets/ruleta.png";
import palancaOffImg from "./assets/palanca-off.png";
import palancaOnImg from "./assets/palanca-on.png";


// --- DATOS MAESTROS ---
// 1. Array "maestro" con la info correcta de CADA número y su color real.
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

// 2. Arrays para definir el LAYOUT (la vista) del tablero.
const filaSuperior = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
const filaMedia =    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const filaInferior = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];

// Helper para buscar el color de un número en nuestro array maestro
function getInfoNumero(numero) {
  // .find() es un método de array, busca el primer elemento que cumpla la condición.
  // No usamos 'break' ni 'continue' aquí.
  const info = infoCasillas.find(casilla => casilla.numero == numero);
  
  // Si no lo encuentra (aunque no debería pasar), devolvemos algo por defecto
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
  // Añadimos un estado para el error del modal, para no usar alert()
  const [errorModal, setErrorModal] = useState("");




  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // --- LÓGICA MODIFICADA ---
  const casilleroApuestas = () => {
    // Obtenemos un índice aleatorio (0 a 36, total 37 números)
    let indice = getRandomInt(0, 36);
    // Usamos el array maestro 'infoCasillas'
    setNumeroAleatorio(infoCasillas[indice].numero);
    setColorAleatorio(infoCasillas[indice].color);
  };

  const abrirModalApuestas = (tipo, valor) => {
    // Ahora podemos guardar qué se está apostando (opcional, pero útil)
    console.log(`Iniciando apuesta a: ${tipo} ${valor}`);
    setApuestaTemporal(5);
    setErrorModal(""); // Limpiamos errores al abrir
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
      setApuesta((apuesta) => apuesta + apuestaTemporal); // Sumamos al total apostado
      setModalApuestasAbierto(false);
      // No giramos aquí, solo confirmamos la apuesta.
      // El usuario puede querer hacer varias apuestas.
    }
  };

  // Esta función ahora solo GIRA, no confirma la apuesta
  const jugarRuleta = () => {
    if (apuesta == 0) {
      // No gira si no hay apuesta
      alert("Debes confirmar al menos una apuesta."); // Dejamos este alert simple por ahora
      return;
    }
    setEstaGirando(true);
    setTimeout(() => {
      setEstaGirando(false);
      casilleroApuestas();
      console.log("Apostaste en total:", apuesta);
      // Aquí calcula ganancias según apuesta y resultado
      
      // Reseteamos la apuesta total para la siguiente ronda
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

  // --- RENDERIZADO ---
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
            {/* Mostramos el error aquí */}
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
          {/* Modificamos el botón para que llame a jugarRuleta */}
          <button onClick={jugarRuleta} disabled={estaGirando || apuesta == 0}>
            <img src={estadoPalancaImg} alt="Palanca" width="120" /> Gira la ruleta
          </button>
        </div>
      </div>

      {/* --- RENDERIZADO DEL TABLERO (MODIFICADO) --- */}
      <div className="tableroContainer">
        <div className="tableroRuleta">
          
          {/* Cero */}
          <button
            className="cero"
            onClick={() => abrirModalApuestas('numero', 0)}
          >
            0
          </button>

          {/* Fila Superior (3, 6, 9...) */}
          {filaSuperior.map((num) => (
            <BotonNumero key={num} numero={num} />
          ))}

          {/* Fila Media (2, 5, 8...) */}
          {filaMedia.map((num) => (
            <BotonNumero key={num} numero={num} />
          ))}

          {/* Fila Inferior (1, 4, 7...) */}
          {filaInferior.map((num) => (
            <BotonNumero key={num} numero={num} />
          ))}

          {/* Apuestas de Columna (2 to 1) */}
          <button className="columna-bet" onClick={() => abrirModalApuestas('columna', 1)}>2 to 1</button>
          <button className="columna-bet" onClick={() => abrirModalApuestas('columna', 2)}>2 to 1</button>
          <button className="columna-bet" onClick={() => abrirModalApuestas('columna', 3)}>2 to 1</button>
          
          {/* Apuestas de Docena (Tercio) */}
          <button className="docena-bet" onClick={() => abrirModalApuestas('docena', '1-12')}>1st 12</button>
          <button className="docena-bet" onClick={() => abrirModalApuestas('docena', '13-24')}>2nd 12</button>
          <button className="docena-bet" onClick={() => abrirModalApuestas('docena', '25-36')}>3rd 12</button>
          
          {/* Apuestas de Color */}
          <button className="color-bet rojo" onClick={() => abrirModalApuestas('color', 'Rojo')}>Rojo</button>
          <button className="color-bet negro" onClick={() => abrirModalApuestas('color', 'Negro')}>Negro</button>

        </div>
      </div>
    </div>
  );
};

export default App;