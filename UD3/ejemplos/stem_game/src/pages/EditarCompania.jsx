import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCompaniaById, putCompania } from "../services/videojuegosService.js";

export default function EditarCompania() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [compania, setCompania] = useState({
        nombre: "",
        pais: "",
        tipo: ""
    });

    const TIPOS = ["Indie", "Triple-A", "Pequeña", "Mediana", "Grande"];

    useEffect(() => {
        getCompaniaById(id)
            .then((response) => setCompania(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    function handleChange(input) {
        const { name, value } = input.target;
        setCompania({
            ...compania,
            [name]: value
        });
    }

    function handleSubmit(form) {
        form.preventDefault();

        putCompania(id, compania)
            .then(() => {
                navigate(`/companias/${id}`);
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="container mt-4">
            <h1>Editar Compañía</h1>

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={compania.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="pais" className="form-label">País</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pais"
                        name="pais"
                        value={compania.pais}
                        onChange={handleChange}
                        placeholder="Ej: Japón, Estados Unidos..."
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo</label>
                    <select
                        name="tipo"
                        className="form-select"
                        value={compania.tipo}
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

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(`/companias/${id}`)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}
