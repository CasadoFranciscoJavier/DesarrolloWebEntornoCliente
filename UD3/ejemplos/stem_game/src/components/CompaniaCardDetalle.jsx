import { Link } from "react-router-dom";
import { deleteJuego } from "../services/videojuegosService.js";

export default function CompaniaCardDetalle({ compania, onJuegoEliminado }) {
    function handleEliminarJuego(juego) {
        if (window.confirm(`¿Eliminar "${juego.titulo}"?`)) {
            deleteJuego(juego.id)
                .then(() => {
                    if (onJuegoEliminado) onJuegoEliminado();
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <h2 className="card-title">{compania.nombre}</h2>
                <p className="card-text">
                    <strong>País:</strong> {compania.pais}
                </p>
                <p className="card-text">
                    <strong>Tipo:</strong> {compania.tipo}
                </p>

                <div className="d-flex gap-2 mt-3">
                    <Link to={`/companias/${compania.id}/edit`} className="btn btn-warning">
                        Editar
                    </Link>
                    <Link to="/" className="btn btn-secondary">
                        Volver
                    </Link>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Juegos ({compania.juegos.length})</h3>
                    <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#modalAniadirJuego"
                    >
                        + Añadir Juego
                    </button>
                </div>

                <div className="row">
                    {compania.juegos.length > 0 ? (
                        compania.juegos.map((juego) => (
                            <div key={juego.id} className="col-lg-3 col-md-4 col-6 mb-3">
                                <div className="card h-100">
                                    <img
                                        src={juego.cover_url}
                                        className="card-img-top"
                                        alt={juego.titulo}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h6 className="card-title">{juego.titulo}</h6>
                                        <p className="card-text small">
                                            <strong>Año:</strong> {juego.anio_lanzamiento}
                                        </p>
                                        <p className="card-text small">
                                            <strong>Género:</strong> {juego.genero}
                                        </p>
                                        <span className="badge bg-success">
                                            ⭐ {juego.nota_personal}/10
                                        </span>
                                        <button
                                            onClick={() => handleEliminarJuego(juego)}
                                            className="btn btn-danger btn-sm w-100 mt-2"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No hay juegos registrados para esta compañía.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
