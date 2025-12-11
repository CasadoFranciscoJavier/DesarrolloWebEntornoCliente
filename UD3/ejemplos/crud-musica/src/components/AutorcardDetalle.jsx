import { Link, useNavigate } from 'react-router-dom';
import { deleteautores } from '../services/musicaService';
import ModalAniadirObra from './modalAniadirObra';

export default function AutorcardDetalle({ autor }) {
    const navigate = useNavigate();
    const img = autor.foto_url

    return (
        <div className="card shadow">
            <div className="row g-0">
                {/* Columna de la imagen */}
                <div className="col-md-4">
                    {img && (
                        <img
                            src={img}
                            alt={autor.nombre}
                            className="img-fluid rounded-start h-100"
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                </div>

                {/* Columna de la información */}
                <div className="col-md-8 text-start">
                    <div className="card-body d-flex flex-column h-100">
                        <h2 className="card-title mb-3">{autor.nombre}</h2>

                        <p className="text-muted mb-3">
                            <strong>Pais:</strong> {autor.pais}
                        </p>

                        <div className="mb-4">
                            <strong>Periodo:<br></br></strong>
                            <p className="card-text mt-2 badge bg-success">{autor.periodo}</p>
                        </div>

                        <div className="mb-3">
                            <strong>Obras:</strong>
                            <div className="d-flex flex-wrap gap-2">
                                {autor.obras && autor.obras.map((obra, index) => (
                                    <span key={index} className="badge bg-info d-flex flex-column align-items-start ">
                                        <h6>{obra.titulo}</h6>
                                        <p>Tipo: {obra.tipo}</p>
                                        <small>Año: {obra.anio}</small>
                                    </span>
                                ))}
                            </div>

                        
                            <button
                                className="badge bg-info ms-auto border-0 rounded-pill "
                                data-bs-toggle="modal"
                                data-bs-target="#modalAniadirObra"
                                style={{ cursor: 'pointer' }}
                            >
                                ➕
                            </button>
                        </div>

                        <div className="d-flex gap-2">
                            <Link to={`/autores/${autor.id}/edit`} className="btn btn-warning">
                                Editar
                            </Link>
                            <button
                                onClick={() => {
                                    if (window.confirm(`¿Eliminar "${autor.nombre}"?`)) {
                                        deleteautores(autor.id)
                                            .then(() => navigate('/'))
                                            .catch(error => console.error(error));
                                    }
                                }}
                                className="btn btn-danger"
                            >
                                Eliminar
                            </button>
                            <Link to="/" className="btn btn-secondary ms-auto">
                                Volver
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <ModalAniadirObra autor={autor} />
        </div>
    )
}
