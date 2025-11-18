import { createContext, useReducer, useContext, useState } from 'react';
import "./App.css";
import RuletaGiratoria from './RuletaGiratoria';
import ModalApuesta from './ModalApuesta';
import Tablero from './Tablero';

// ==============================
// 1. DATOS DE LA RULETA
// ==============================
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
const filaMedia = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const filaInferior = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];

// ==============================
// 2. ESTADO INICIAL DEL JUEGO
// ==============================
const estadoInicial = {
  saldo: 100,
  apuestasActivas: [],
  numeroGanador: null,
  colorGanador: null,
  mensajeResultado: "",
  totalApostado: 0
};

// ==============================
// 3. FUNCIÓN REDUCTORA
// ==============================
function ruletaReducer(estado, accion) {
  let nuevoEstado = estado;

  if (accion.tipo == "AGREGAR_APUESTA") {
    const nuevaApuesta = accion.apuesta;
    const nuevoSaldo = estado.saldo - nuevaApuesta.cantidad;
    const nuevoTotalApostado = estado.totalApostado + nuevaApuesta.cantidad;
    const nuevasApuestas = [...estado.apuestasActivas, nuevaApuesta];

    nuevoEstado = {
      ...estado,
      saldo: nuevoSaldo,
      apuestasActivas: nuevasApuestas,
      totalApostado: nuevoTotalApostado
    };
  } else if (accion.tipo == "GIRAR_RULETA") {
    const numeroAleatorio = Math.floor(Math.random() * 37);
    let colorDelNumero = "Verde";
    
    let indice = 0;
    while (indice < infoCasillas.length) {
      if (infoCasillas[indice].numero == numeroAleatorio) {
        colorDelNumero = infoCasillas[indice].color;
      }
      indice = indice + 1;
    }

    let gananciasTotal = 0;
    let apuestaIndex = 0;

    while (apuestaIndex < estado.apuestasActivas.length) {
      const apuesta = estado.apuestasActivas[apuestaIndex];
      let ganoEstaApuesta = false;
      let multiplicador = 0;

      if (apuesta.tipoApuesta == "numero") {
        if (apuesta.valor == numeroAleatorio) {
          ganoEstaApuesta = true;
          multiplicador = 36;
        }
      } else if (apuesta.tipoApuesta == "color") {
        if (apuesta.valor == colorDelNumero && colorDelNumero !== "Verde") {
          ganoEstaApuesta = true;
          multiplicador = 2;
        }
      } else if (apuesta.tipoApuesta == "parImpar") {
        const esPar = numeroAleatorio % 2 == 0;
        if (apuesta.valor == "par" && esPar && numeroAleatorio !== 0) {
          ganoEstaApuesta = true;
          multiplicador = 2;
        } else if (apuesta.valor == "impar" && !esPar) {
          ganoEstaApuesta = true;
          multiplicador = 2;
        }
      } else if (apuesta.tipoApuesta == "docena") {
        if (apuesta.valor == "1-12" && numeroAleatorio >= 1 && numeroAleatorio <= 12) {
          ganoEstaApuesta = true;
          multiplicador = 3;
        } else if (apuesta.valor == "13-24" && numeroAleatorio >= 13 && numeroAleatorio <= 24) {
          ganoEstaApuesta = true;
          multiplicador = 3;
        } else if (apuesta.valor == "25-36" && numeroAleatorio >= 25 && numeroAleatorio <= 36) {
          ganoEstaApuesta = true;
          multiplicador = 3;
        }
      } else if (apuesta.tipoApuesta == "columna") {
        let estaEnColumna = false;
        if (apuesta.valor == 1) {
          let i = 0;
          while (i < filaSuperior.length) {
            if (filaSuperior[i] == numeroAleatorio) {
              estaEnColumna = true;
            }
            i = i + 1;
          }
        } else if (apuesta.valor == 2) {
          let i = 0;
          while (i < filaMedia.length) {
            if (filaMedia[i] == numeroAleatorio) {
              estaEnColumna = true;
            }
            i = i + 1;
          }
        } else if (apuesta.valor == 3) {
          let i = 0;
          while (i < filaInferior.length) {
            if (filaInferior[i] == numeroAleatorio) {
              estaEnColumna = true;
            }
            i = i + 1;
          }
        }
        if (estaEnColumna) {
          ganoEstaApuesta = true;
          multiplicador = 3;
        }
      }

      if (ganoEstaApuesta) {
        gananciasTotal = gananciasTotal + (apuesta.cantidad * multiplicador);
      }

      apuestaIndex = apuestaIndex + 1;
    }

    const nuevoSaldo = estado.saldo + gananciasTotal;
    let mensaje = "";
    
    if (gananciasTotal > 0) {
      const gananciaLimpia = gananciasTotal - estado.totalApostado;
      mensaje = `¡Ganaste ${gananciasTotal}€! Ganancia neta: ${gananciaLimpia}€`;
    } else {
      mensaje = `Perdiste ${estado.totalApostado}€. ¡Suerte la próxima vez!`;
    }

    nuevoEstado = {
      ...estado,
      numeroGanador: numeroAleatorio,
      colorGanador: colorDelNumero,
      saldo: nuevoSaldo,
      apuestasActivas: [],
      totalApostado: 0,
      mensajeResultado: mensaje
    };
  } else if (accion.tipo == "LIMPIAR_MENSAJE") {
    nuevoEstado = {
      ...estado,
      mensajeResultado: ""
    };
  }

  return nuevoEstado;
}

// ==============================
// 4. CREAMOS EL CONTEXT
// ==============================
const RuletaContext = createContext();

// ==============================
// 5. PROVIDER
// ==============================
export function RuletaProvider({ children }) {
  const [estado, dispatch] = useReducer(ruletaReducer, estadoInicial);

  return (
    <RuletaContext.Provider value={{ estado, dispatch }}>
      {children}
    </RuletaContext.Provider>
  );
}

// ==============================
// 6. HOOK PERSONALIZADO
// ==============================
export function useRuleta() {
  return useContext(RuletaContext);
}

// ==============================
// 7. FUNCIÓN AUXILIAR para obtener info del número
// ==============================
function obtenerInfoNumero(numero) {
  let resultado = { numero: numero, color: "Negro" };
  let i = 0;
  
  while (i < infoCasillas.length) {
    if (infoCasillas[i].numero == numero) {
      resultado = infoCasillas[i];
    }
    i = i + 1;
  }
  
  return resultado;
} 

// ==============================
// 8. FUNCIÓN para obtener texto de apuesta
// ==============================
function obtenerTextoApuesta(apuesta) {
  let texto = "";
  
  if (apuesta.tipoApuesta == "numero") {
    const info = obtenerInfoNumero(apuesta.valor);
    texto = `Número ${apuesta.valor} ${info.color}`;
  } else if (apuesta.tipoApuesta == "color") {
    texto = `Color ${apuesta.valor}`;
  } else if (apuesta.tipoApuesta == "parImpar") {
    texto = apuesta.valor == "par" ? "Par" : "Impar";
  } else if (apuesta.tipoApuesta == "docena") {
    texto = `Docena ${apuesta.valor}`;
  } else if (apuesta.tipoApuesta == "columna") {
    texto = `Columna ${apuesta.valor}`;
  }
  
  return texto;
}

// ==============================
// 9. COMPONENTE PRINCIPAL DE LA RULETA
// ==============================
function RuletaJuego() {
  const { estado, dispatch } = useRuleta();
  const [estaGirando, setEstaGirando] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [apuestaTemporal, setApuestaTemporal] = useState(5);
  const [tipoApuestaActual, setTipoApuestaActual] = useState("");
  const [valorApuestaActual, setValorApuestaActual] = useState("");
  const [errorModal, setErrorModal] = useState("");

  const abrirModal = (tipo, valor) => {
    setTipoApuestaActual(tipo);
    setValorApuestaActual(valor);
    setApuestaTemporal(5);
    setErrorModal("");
    setModalAbierto(true);
  };

  const aumentarApuesta = () => {
    if (apuestaTemporal + 5 <= estado.saldo) {
      setApuestaTemporal(apuestaTemporal + 5);
    }
  };

  const disminuirApuesta = () => {
    if (apuestaTemporal - 5 >= 5) {
      setApuestaTemporal(apuestaTemporal - 5);
    }
  };

  const confirmarApuesta = () => {
    if (apuestaTemporal < 5) {
      setErrorModal("La apuesta mínima es 5€");
      return;
    }
    
    if (apuestaTemporal > estado.saldo) {
      setErrorModal("No tienes suficiente saldo");
      return;
    }

    const nuevaApuesta = {
      tipoApuesta: tipoApuestaActual,
      valor: valorApuestaActual,
      cantidad: apuestaTemporal
    };

    dispatch({ tipo: "AGREGAR_APUESTA", apuesta: nuevaApuesta });
    setModalAbierto(false);
  };

  const girarRuleta = () => {
    if (estado.apuestasActivas.length == 0) {
      alert("Debes hacer al menos una apuesta antes de girar");
      return;
    }

    setEstaGirando(true);
    dispatch({ tipo: "LIMPIAR_MENSAJE" });

    setTimeout(() => {
      dispatch({ tipo: "GIRAR_RULETA" });
      setEstaGirando(false);
    }, 3000);
  };

  return (
    <div className="app">
      <h2>RULETA</h2>

      <div className="panelInfoJugador">
        <p>Saldo disponible: {estado.saldo}€</p>
        <p>Total apostado: {estado.totalApostado}€</p>
      </div>

      {estado.apuestasActivas.length > 0 && (
        <div className="apuestasActivas">
          <h3>Apuestas Activas:</h3>
          {estado.apuestasActivas.map((apuesta, index) => (
            <div key={index} className="apuestaItem">
              <p>{obtenerTextoApuesta(apuesta)} - {apuesta.cantidad}€</p>
            </div>
          ))}
        </div>
      )}

      <ModalApuesta
        estaAbierto={modalAbierto}
        saldo={estado.saldo}
        apuestaTemporal={apuestaTemporal}
        errorModal={errorModal}
        alAumentar={aumentarApuesta}
        alDisminuir={disminuirApuesta}
        alCancelar={() => setModalAbierto(false)}
        alConfirmar={confirmarApuesta}
      />

      {estado.numeroGanador !== null && (
        <div className="resultadoContainer">
          <h1>Resultado: {estado.numeroGanador} {estado.colorGanador}</h1>
          <p className="mensajeResultado">{estado.mensajeResultado}</p>
        </div>
      )}

      <RuletaGiratoria
        estaGirando={estaGirando}
        puedeGirar={estado.apuestasActivas.length > 0}
        alGirar={girarRuleta}
      />

      <Tablero alAbrirModal={abrirModal} />
    </div>
  );
}

// ==============================
// 10. APP PRINCIPAL
// ==============================
function App() {
  return (
    <RuletaProvider>
      <RuletaJuego />
    </RuletaProvider>
  );
}

export default App;