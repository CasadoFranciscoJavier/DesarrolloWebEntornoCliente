function ModalApuesta({ 
  estaAbierto, 
  saldo, 
  apuestaTemporal, 
  errorModal,
  alAumentar,
  alDisminuir,
  alCancelar,
  alConfirmar
}) {
  if (!estaAbierto) {
    return null;
  }

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3>¿Cuánto deseas apostar?</h3>
        <p>Saldo disponible: {saldo}€</p>
        <div>
          <button onClick={alDisminuir}>-5€</button>
          <span style={{ margin: "0 15px", fontSize: "20px" }}>{apuestaTemporal}€</span>
          <button onClick={alAumentar}>+5€</button>
        </div>
        {errorModal && <p className="modalError">{errorModal}</p>}
        <div style={{ marginTop: "15px" }}>
          <button onClick={alCancelar}>Cancelar</button>
          <button onClick={alConfirmar}>Confirmar Apuesta</button>
        </div>
      </div>
    </div>
  );
}

export default ModalApuesta;