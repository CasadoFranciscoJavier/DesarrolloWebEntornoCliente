import { useState, useEffect } from "react";

export default function App() {
  const tiempoMaximo = 5; // segundos por oleada

  const [numeroCorrecto, setNumeroCorrecto] = useState(1);
  const [tiempoRestante, setTiempoRestante] = useState(tiempoMaximo);
  const [puntuacion, setPuntuacion] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  function generarNuevoNumeroCorrecto() {
    const nuevoNumero = Math.floor(Math.random() * 4) + 1;
    if (nuevoNumero === numeroCorrecto) {
      return nuevoNumero === 4 ? 1 : nuevoNumero + 1;
    }
    return nuevoNumero;
  }

  function avanzarOleada() {
    const siguienteNumero = generarNuevoNumeroCorrecto();
    setNumeroCorrecto(siguienteNumero);
    setTiempoRestante(tiempoMaximo);
  }

  function manejarEleccion(numeroElegido) {
    if (juegoTerminado) {
      return;
    }

    if (numeroElegido === numeroCorrecto) {
      const nuevaPuntuacion = puntuacion + 1;
      setPuntuacion(nuevaPuntuacion);
      avanzarOleada();
      return;
    }

    setJuegoTerminado(true);
  }

  useEffect(() => {
    if (juegoTerminado) {
      return;
    }

    const intervalo = setInterval(() => {
      setTiempoRestante((valorActual) => {
        const nuevoValor = valorActual - 1;
        if (nuevoValor > 0) {
          return nuevoValor;
        }

        setJuegoTerminado(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [juegoTerminado]);

  function reiniciarJuego() {
    setPuntuacion(0);
    setNumeroCorrecto(1);
    setTiempoRestante(tiempoMaximo);
    setJuegoTerminado(false);
  }

  return (
    <div style={estilos.contenedor}>
      <h1>Juego de Reacción</h1>

      {juegoTerminado ? (
        <div style={estilos.panelFinal}>
          <h2>Fin del juego</h2>
          <p>Puntuación: {puntuacion}</p>
          <button style={estilos.boton} onClick={reiniciarJuego}>
            Reiniciar
          </button>
        </div>
      ) : (
        <div style={estilos.zonaJuego}>
          <p>Tiempo restante: {tiempoRestante}</p>
          <p>Puntuación: {puntuacion}</p>
          <h3>Pulsa el botón: {numeroCorrecto}</h3>

          <div style={estilos.contenedorBotones}>
            <button style={estilos.boton} onClick={() => manejarEleccion(1)}>1</button>
            <button style={estilos.boton} onClick={() => manejarEleccion(2)}>2</button>
            <button style={estilos.boton} onClick={() => manejarEleccion(3)}>3</button>
            <button style={estilos.boton} onClick={() => manejarEleccion(4)}>4</button>
          </div>
        </div>
      )}
    </div>
  );
}

const estilos = {
  contenedor: {
    fontFamily: "sans-serif",
    padding: "2rem",
    textAlign: "center",
  },
  zonaJuego: {
    marginTop: "1.5rem",
  },
  panelFinal: {
    marginTop: "1.5rem",
  },
  contenedorBotones: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  boton: {
    padding: "1rem",
    fontSize: "1.3rem",
    cursor: "pointer",
  },
};
