import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompaniaById, deleteCompania } from "../services/videojuegosService.js";
import CompaniaCardDetalle from "../components/CompaniaCardDetalle.jsx";
import ModalAniadirJuego from "../components/ModalAniadirJuego.jsx";

export default function DetalleCompania() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [compania, setCompania] = useState(null);

    useEffect(() => {
        cargarCompania();
    }, [id]);

    function cargarCompania() {
        getCompaniaById(id)
            .then((response) => {
                setCompania(response.data);
            })
            .catch((error) => console.error(error));
    }

    function handleEliminarCompania() {
        if (window.confirm(`¿Eliminar "${compania.nombre}"?`)) {
            deleteCompania(compania.id)
                .then(() => {
                    navigate('/');
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className="container mt-4">
            {!compania ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <CompaniaCardDetalle
                        compania={compania}
                        onJuegoEliminado={cargarCompania}
                    />

                    <button
                        onClick={handleEliminarCompania}
                        className="btn btn-danger"
                    >
                        Eliminar Compañía
                    </button>

                    <ModalAniadirJuego compania={compania} />
                </>
            )}
        </div>
    )
}
