import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCompania } from "../services/videojuegosService.js";

export default function CrearCompania() {
    const navigate = useNavigate();
    const [compania, setCompania] = useState({
        nombre: "",
        pais: "",
        tipo: ""
    });

    const TIPOS = ["Indie", "Triple-A", "Pequeña", "Mediana", "Grande"];

    function handleChange(input) {
        const { name, value } = input.target;
        setCompania({
            ...compania,
            [name]: value
        });
    }

    function handleSubmit(form) {
        form.preventDefault();

        postCompania(compania)
            .then((response) => {
                navigate(`/companias/${response.data.id}`);
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="container mt-4">
            <h1>Nueva Compañía</h1>

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre *</label>
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
                    <button type="submit" className="btn btn-primary">Crear Compañía</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/")}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}
