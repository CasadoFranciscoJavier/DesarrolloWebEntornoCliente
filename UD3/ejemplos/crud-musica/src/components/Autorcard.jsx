import { Link } from 'react-router-dom';

export default function Autorcard({ autor }) {
    const img = autor.foto_url

    return (
        <div className="col-lg-3 col-md-4 col-12 mb-3">
            <div className="card h-100 shadow-sm">
                <Link
                    to={`/autores/${autor.id}`}
                    className="text-decoration-none text-dark"
                >
                    {img && (
                        <img
                            src={img}
                            alt={autor.nombre}
                            className="card-img-top"
                            style={{ objectFit: 'cover' }}
                        />
                    )}

                    <div className="card-body">
                        <h5 className="card-title">{autor.nombre}</h5>
                        <p className="card-text text-muted">{autor.release_year}</p>

                        <div className="d-flex flex-wrap gap-1">
                            
                                <span className="badge bg-primary">
                                     Número de obras: {autor.obras?.length ?? 0}
                                </span>
                                
                          
                            
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
