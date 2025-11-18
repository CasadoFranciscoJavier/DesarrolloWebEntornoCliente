const filaSuperior = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
const filaMedia = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const filaInferior = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];

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

function BotonNumero({ numero, onClick }) {
  const info = obtenerInfoNumero(numero);
  const claseColor = info.color == "Rojo" ? "rojo" : "negro";

  return (
    <button
      className={`numero ${claseColor}`}
      onClick={() => onClick('numero', numero)}
    >
      {numero}
    </button>
  );
}

function Tablero({ alAbrirModal }) {
  return (
    <div className="tableroContainer">
      <div className="tableroRuleta">
        <button className="cero" onClick={() => alAbrirModal('numero', 0)}>
          0
        </button>

        {filaSuperior.map((num) => (
          <BotonNumero key={num} numero={num} onClick={alAbrirModal} />
        ))}
        <button className="columna-bet" onClick={() => alAbrirModal('columna', 1)}>2 to 1</button>

        {filaMedia.map((num) => (
          <BotonNumero key={num} numero={num} onClick={alAbrirModal} />
        ))}
        <button className="columna-bet" onClick={() => alAbrirModal('columna', 2)}>2 to 1</button>

        {filaInferior.map((num) => (
          <BotonNumero key={num} numero={num} onClick={alAbrirModal} />
        ))}
        <button className="columna-bet" onClick={() => alAbrirModal('columna', 3)}>2 to 1</button>

        <div className="espacio-vacio"></div>
        <button className="docena-bet" onClick={() => alAbrirModal('docena', '1-12')}>1st 12</button>
        <button className="docena-bet" onClick={() => alAbrirModal('docena', '13-24')}>2nd 12</button>
        <button className="docena-bet" onClick={() => alAbrirModal('docena', '25-36')}>3rd 12</button>
        <div className="espacio-vacio"></div>

        <div className="espacio-vacio"></div>
        <button className="apuesta-simple" onClick={() => alAbrirModal('parImpar', 'impar')}>IMPAR</button>
        <button className="color-bet rojo" onClick={() => alAbrirModal('color', 'Rojo')}>ROJO</button>
        <button className="color-bet negro" onClick={() => alAbrirModal('color', 'Negro')}>NEGRO</button>
        <button className="apuesta-simple" onClick={() => alAbrirModal('parImpar', 'par')}>PAR</button>
        <div className="espacio-vacio"></div>
      </div>
    </div>
  );
}

export default Tablero;