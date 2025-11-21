import { useState, useEffect } from "react";

export default function App() {
  const [listaEnemigos, setListaEnemigos] = useState([]);
  const [numeroOleada, setNumeroOleada] = useState(1);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [vidaJugador, setVidaJugador] = useState(3);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // Crear enemigos nuevos al empezar cada oleada
  function generarEnemigos() {
    const cantidad = numeroOleada + 2;
    const nuevosEnemigos = [];

    let indice = 0;
    while (indice < cantidad) {
      nuevosEnemigos.push({
        id: indice,
        nombre: "Enemigo " + (indice + 1),
        vida: 2
      });
      indice = indice + 1;
    }

    setListaEnemigos(nuevosEnemigos);
  }

  // Atacar un enemigo
  function atacarEnemigo(idObjetivo) {
    const enemigosActualizados = listaEnemigos.map((enemigo) => {
      if (enemigo.id === idObjetivo) {
        return { ...enemigo, vida: enemigo.vida - 1 };
      }
      return enemigo;
    });

    const enemigosVivos = enemigosActualizados.filter(
      (enemigo) => enemigo.vida > 0
    );

    setListaEnemigos(enemigosVivos);

    if (enemigosVivos.length === 0) {
      setNumeroOleada(numeroOleada + 1);
    }
  }

  // Reinicia la oleada cuando no quedan enemigos
  useEffect(() => {
    if (listaEnemigos.length === 0 && !juegoTerminado) {
      generarEnemigos();
      setTiempoRestante(10);
    }
  }, [listaEnemigos, juegoTerminado]);

  // Contador regresivo
  useEffect(() => {
    if (juegoTerminado) {
      return;
    }

    const intervalo = setInterval(() => {
      setTiempoRestante((valor) => valor - 1);
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, [numeroOleada]);

  // Si el tiempo llega a 0, pierdes 1 vida y se reinicia la oleada
  useEffect(() => {
    if (tiempoRestante > 0 || juegoTerminado) {
      return;
    }

    setVidaJugador(vidaJugador - 1);

    if (vidaJugador - 1 <= 0) {
      setJuegoTerminado(true);
      return;
    }

    setNumeroOleada(numeroOleada + 1);
    setTiempoRestante(10);
  }, [tiempoRestante]);

  // Interfaz
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {juegoTerminado ? (
        <h1>Has perdido</h1>
      ) : (
        <div>
          <h1>Oleada {numeroOleada}</h1>
          <p>Tiempo restante: {tiempoRestante}s</p>
          <p>Vida del jugador: {vidaJugador}</p>

          <h2>Enemigos:</h2>
          {listaEnemigos.length === 0 && <p>Cargando oleada...</p>}

          {listaEnemigos.map((enemigo) => (
            <div
              key={enemigo.id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid gray",
                width: "200px"
              }}
            >
              <strong>{enemigo.nombre}</strong>
              <p>Vida: {enemigo.vida}</p>
              <button onClick={() => atacarEnemigo(enemigo.id)}>
                Atacar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
