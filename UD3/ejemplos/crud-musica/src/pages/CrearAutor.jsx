import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postautores } from "../services/musicaService.js";

const peliculaVacia = {
    foto_url: '',
    title: '',
    release_year: '',
    genres: [],
    synopsis: ''
}

export default function CrearAutor() {

    const navigate = useNavigate();
    const [autor, setAutor] = useState(peliculaVacia);

    const PERIODOS = ['Renacimiento', 'Renacimiento tardío', 'Barroco temprano', 'Barroco', 'Clasicismo', 'Romanticismo'];

    // Estados para los mensajes de error
    // const [mensajeautor, setMensajeautor] = useState('');
    // const [mensajeTitulo, setMensajeTitulo] = useState('');
    // const [mensajeAno, setMensajeAno] = useState('');
    // const [mensajePERIODOS, setMensajePERIODOS] = useState('');
    // const [mensajeSinopsis, setMensajeSinopsis] = useState('');

    // useEffect para validar en tiempo real
    // useEffect(() => {
    //     setMensajeautor(
    //         validarautor() ? '' : 'La URL del póster debe ser válida y no estar vacía'
    //     );

    //     setMensajeTitulo(
    //         validarTitulo() ? '' : 'El título debe tener entre 1 y 100 caracteres'
    //     );

    //     setMensajeAno(
    //         validarAno() ? '' : 'El año debe estar entre 1888 (primera película) y el año actual'
    //     );

    //     setMensajePERIODOS(
    //         validarPERIODOS() ? '' : 'Debes seleccionar al menos un género'
    //     );

    //     setMensajeSinopsis(
    //         validarSinopsis() ? '' : 'La sinopsis debe tener entre 10 y 500 caracteres'
    //     );
    // }, [autor]);

    function handleChange(input) {
        const { name, value } = input.target;
        setAutor({
            ...autor,
            [name]: value
        });
        console.log(autor)
    } 

    // function validarautor() {
    //     return autor.foto_url.trim().length > 0;
    // }

    // function validarTitulo() {
    //     return autor.title.trim().length >= 1 && autor.title.trim().length <= 100;
    // }

    // function validarAno() {
    //     const anoActual = new Date().getFullYear();
    //     const ano = parseInt(autor.release_year);
    //     return ano >= 1888 && ano <= anoActual;
    // }

    // function validarPERIODOS() {
    //     return autor.genres.length >= 1;
    // }

    // function validarSinopsis() {
    //     return autor.synopsis.trim().length >= 10 && autor.synopsis.trim().length <= 500;
    // }

    function handlePeriodoChange(periodo) {
  setAutor({
    ...autor,
    periodo: periodo
  });
}


    function handleSubmit(form) {
        form.preventDefault();
        
            postautores(autor)
                .then((response) => navigate(`/autores/${response.data.id}`))
                .catch((error) => console.error(error));
        
    }
    const img = autor.foto_url

    return (


        <div className="container mt-4">


            <div className="row">

                {/* Columna del formulario */}
                <div className="col-lg-8 col-md-7 col-12 ">
                    <h2 className="mb-4">Registrar Autor</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label"><strong>URL Póster:</strong></label>
                            <input
                                type="url"
                                name="foto_url"
                                className="form-control"
                                value={img}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="mb-3">
                            <label className="form-label"><strong>Nombre: </strong></label>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                value={autor.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><strong>Pais: </strong></label>
                            <input
                                type="text"
                                name="pais"
                                className="form-control"
                                value={autor.pais}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label"><strong>Periodo: </strong></label>
                            <div className="row">
                                {PERIODOS.map((periodo) => (
                                    <div key={periodo} className="col-6 col-md-3">
                                        <div >
                                            <input
                                                type="radio"
                                                name="periodo"
                                                className="form-check-input"
                                                checked={autor.periodo == periodo}
                                                onChange={() => handlePeriodoChange(periodo)}
                                            />
                                            <label className="form-check-label">{periodo}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate(`/`)}
                            >
                                Cancelar
                            </button>
                        </div>

                    </form>
                </div>

                {/* Columna de la imagen */}
                <div className="col-lg-4 col-md-5 col-12 text-center">
                    {img && (
                        <img
                            src={img}
                            alt={autor.title}
                            className="img-fluid rounded"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                    )}
                </div>

            </div>
        </div>

    );
}
