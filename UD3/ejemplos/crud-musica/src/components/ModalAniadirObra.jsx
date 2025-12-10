import { useState } from 'react';
import { postObras } from '../services/musicaService';

const obraVacia = {
    titulo: '',
    tipo: '',
    anio: ''
}

export default function ModalAniadirObra({ autor }) {
    const [obra, setObra] = useState(obraVacia);

    const TIPOS = ["Misa", "Motete", "Pasión", "Magnificat", "Oficio de difuntos", "Responsorios", "Anthem", "Lamentaciones", "Madrigal espiritual", "Vísperas", "Colección sacra", "Salmo", "Oratorio", "Gloria", "Stabat Mater", "Requiem", "Himno"];

    function handleChange(input) {
        const { name, value } = input.target;
        setObra({
            ...obra,
            [name]: value
        });
    }

    function handleSubmit(form) {
        form.preventDefault();

        const obraData = {
            titulo: obra.titulo,
            tipo: obra.tipo,
            anio: parseInt(obra.anio),
            autor_id: autor.id
        };

        postObras(obraData)
            .then(() => {
                setObra(obraVacia);
                alert('Obra añadida correctamente');
                window.location.reload();
            })
            .catch((error) => console.error(error));
    }

    const img = autor.foto_url;

    return (
        <div className="modal fade" id="modalAniadirObra" tabIndex="-1" aria-labelledby="modalAniadirObraLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalAniadirObraLabel">Registrar Nueva Obra de {autor.nombre}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {/* Columna del formulario */}
                            <div className="col-lg-8 col-md-7 col-12">
                                <form onSubmit={handleSubmit} id="formAniadirObra">
                                    <div className="mb-3">
                                        <label className="form-label"><strong>Título:</strong></label>
                                        <input
                                            type="text"
                                            name="titulo"
                                            className="form-control"
                                            value={obra.titulo}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label"><strong>Tipo:</strong></label>
                                        <select
                                            name="tipo"
                                            className="form-select"
                                            value={obra.tipo}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Selecciona un tipo</option>
                                            {TIPOS.map((tipo) => (
                                                <option key={tipo} value={tipo}>
                                                    {tipo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label"><strong>Año:</strong></label>
                                        <input
                                            type="number"
                                            name="anio"
                                            className="form-control"
                                            value={obra.anio}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Columna de la imagen */}
                            <div className="col-lg-4 col-md-5 col-12 text-center">
                                {img && (
                                    <img
                                        src={img}
                                        alt={autor.nombre}
                                        className="img-fluid rounded"
                                        style={{ maxHeight: '300px', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button type="submit" form="formAniadirObra" className="btn btn-primary">
                            Guardar Obra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
