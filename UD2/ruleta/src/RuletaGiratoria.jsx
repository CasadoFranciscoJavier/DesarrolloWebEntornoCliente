import ruletaImg from "./assets/ruleta.png";
import palancaOffImg from "./assets/palanca-off.png";
import palancaOnImg from "./assets/palanca-on.png";

function RuletaGiratoria({ estaGirando, puedeGirar, alGirar }) {
  const claseGiro = estaGirando ? "girando" : "";
  const imagenPalanca = estaGirando ? palancaOnImg : palancaOffImg;

  return (
    <div className="ruletaLoader">
      <img
        src={ruletaImg}
        alt="Ruleta"
        className={claseGiro}
        style={{ width: "400px", height: "auto" }}
      />
      <div className="palancaContainer">
        <button onClick={alGirar} disabled={estaGirando || !puedeGirar}>
          <img src={imagenPalanca} alt="Palanca" width="120" />
          {estaGirando ? "Girando..." : "Gira la ruleta"}
        </button>
      </div>
    </div>
  );
}

export default RuletaGiratoria;