import { useState, useEffect } from "react";
import { postJuego } from "../services/videojuegosService.js";

export default function ModalAniadirJuego({ compania }) {

    const JUEGO_VACIO = {
        titulo: '',
        anio_lanzamiento: '',
        genero: '',
        cover_url: '',
        nota_personal: 10,
        compania_id: compania.id
    }

    const [juego, setJuego] = useState(JUEGO_VACIO);

    const GENEROS = ["Accion", "Aventura", "RPG", "Estrategia", "Sandbox", "Musica", "Party", "Arcade"];

    const [mensajeTitulo, setMensajeTitulo] = useState('');

    useEffect(() => {
        setMensajeTitulo(
            validarTitulo() ? '' : 'El título debe tener entre 3 y 100 caracteres'
        );
    }, [juego]);

    function validarTitulo() {
        return (juego.titulo.length >= 3 && juego.titulo.length <= 100)
    }

    function handleChange(input) {
        const { name, value } = input.target;
        setJuego({
            ...juego,
            [name]: value
        });
    }

    function handleSubmit(form) {
        form.preventDefault();

        postJuego(juego)
            .then(() => {
                window.location.href = `/companias/${compania.id}`;
            })
            .catch((error) => console.error(error));
    }

    const img = juego.cover_url;

    return (
        <div className="modal fade" id="modalAniadirJuego" tabIndex="-1" aria-labelledby="modalAniadirJuegoLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalAniadirJuegoLabel">Registrar Nuevo Juego de {compania.nombre}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-8 col-md-7 col-12">
                                <form onSubmit={handleSubmit} id="formAniadirJuego">
                                    <div className="mb-3">
                                        <label className="form-label"><strong>Título:</strong></label>
                                        <input
                                            type="text"
                                            name="titulo"
                                            className="form-control"
                                            value={juego.titulo}
                                            onChange={handleChange}
                                            required
                                        />
                                        {mensajeTitulo && <p className="text-danger">{mensajeTitulo}</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label"><strong>Año de Lanzamiento:</strong></label>
                                        <input
                                            type="number"
                                            name="anio_lanzamiento"
                                            className="form-control"
                                            value={juego.anio_lanzamiento}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label"><strong>Género:</strong></label>
                                        <select
                                            name="genero"
                                            className="form-select"
                                            value={juego.genero}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Selecciona un género</option>
                                            {GENEROS.map((genero) => (
                                                <option key={genero} value={genero}>
                                                    {genero}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label"><strong>URL de la Carátula:</strong></label>
                                        <input
                                            type="url"
                                            name="cover_url"
                                            className="form-control"
                                            value={juego.cover_url}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label"><strong>Nota Personal (1-10):</strong></label>
                                        <input
                                            type="number"
                                            name="nota_personal"
                                            className="form-control"
                                            value={juego.nota_personal}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="col-lg-4 col-md-5 col-12 text-center">
                                {img && (
                                    <img
                                        src={img}
                                        alt={juego.titulo}
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
                        <button type="submit" form="formAniadirJuego" className="btn btn-primary">
                            Guardar Juego
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
