import { useState, useEffect } from 'react';
import { postObras } from '../services/musicaService';

export default function ModalAniadirObra({ autor }) {

    const OBRA_VACIA = {
        titulo: '',
        tipo: '',
        anio: '',
        autor_id: autor.id
    }
    const [obra, setObra] = useState(OBRA_VACIA);

    const TIPOS = ["Misa", "Motete", "Pasión", "Magnificat", "Oficio de difuntos", "Responsorios", "Anthem", "Lamentaciones", "Madrigal espiritual", "Vísperas", "Colección sacra", "Salmo", "Oratorio", "Gloria", "Stabat Mater", "Requiem", "Himno"];

    const [mensajeTitulo, setMensajeTitulo] = useState('');
    const [mensajeTipo, setMensajeTipo] = useState('');
    const [mensajeAnio, setMensajeAnio] = useState('');
  

    useEffect(() => {
        setMensajeTitulo(
            validarTitulo() ? '' : 'El título debe tener una longitud de entre 3 y 50 caracteres'
        )

        setMensajeTipo(
            validarTipo() ? '' : 'Debes seleccionar un tipo'
        )

        setMensajeAnio(
            validarAnio() ? '' : 'El anio debe ser entre 1000 y 2025'
        )

      
    }, [obra]);

    function validarTitulo() {
    return (obra.titulo.length >= 3 && obra.titulo.length <= 50)
  }

  function validarTipo() {
    return obra.tipo !== ''

    // si fuera un checkbox por ejemplo. nos cerciormamos que es un array: tipos []. para el radio seria igual que el que tenemos
    // return obra.tipo.length > 0  
  }

  function validarAnio() {
    return (obra.anio >= 1000 && obra.anio <= 2025)
  }



    function handleChange(input) {
        const { name, value } = input.target;
        setObra({
            ...obra,
            [name]: value
        });
    }

    function handleSubmit(form) {
        form.preventDefault();

        postObras(obra)
            .then(() => {
                window.location.href = `/autores/${autor.id}`;
            })
            .catch((error) => console.error(error));
    }

    const img = autor.foto_url;

    return (
        <div className="modal fade" id="modalAniadirObra" tabIndex="-1" aria-labelledby="modalAniadirObraLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalAniadirObraLabel">Registrar Nueva Obra de {autor.titulo}</h5>
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
                                        {mensajeTitulo && <p className="text-danger">{mensajeTitulo}</p>}
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
                                        {mensajeTipo && <p className="text-danger">{mensajeTipo}</p>}
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
                                        {mensajeAnio && <p className="text-danger">{mensajeAnio}</p>}
                                    </div>
                                </form>
                            </div>

                            {/* Columna de la imagen */}
                            <div className="col-lg-4 col-md-5 col-12 text-center">
                                {img && (
                                    <img
                                        src={img}
                                        alt={autor.titulo}
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
