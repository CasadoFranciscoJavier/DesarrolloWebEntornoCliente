import { Link } from "react-router-dom";

export default function CompaniaCard({ compania }) {
    return (
        <div className="col-lg-3 col-md-4 col-12 mb-3">
            <div className="card h-100 shadow-sm">
                <Link to={`/companias/${compania.id}`} className="text-decoration-none">
                    <div className="card-body">
                        <h5 className="card-title text-dark">{compania.nombre}</h5>
                        <p className="card-text text-secondary mb-1">
                            <strong>País:</strong> {compania.pais}
                        </p>
                        <p className="card-text text-secondary mb-1">
                            <strong>Tipo:</strong> {compania.tipo}
                        </p>
                        <span className="badge bg-primary">
                            {compania.juegos.length} juegos
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
