import { useState, useEffect } from "react";
import { getCompanias } from "../services/videojuegosService.js";
import CompaniaCard from "../components/CompaniaCard.jsx";

export default function ListarCompanias() {
    const [companias, setCompanias] = useState([])

    useEffect(() => {
        getCompanias()
            .then((response) => {
                setCompanias(response.data)
            })
            .catch((error) => console.error(error))
    }, [])

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Compañías de Videojuegos</h1>
            </div>

            <div className="row">
                {companias.length > 0 ? (
                    companias.map((compania) => (
                        <CompaniaCard key={compania.id} compania={compania} />
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-muted text-center">No hay compañías registradas.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
