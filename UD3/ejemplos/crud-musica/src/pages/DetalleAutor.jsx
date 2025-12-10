import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getautoresById } from "../services/musicaService.js";
import AutorcardDetalle from "../components/AutorcardDetalle.jsx";

export default function DetalleAutor() {

    const { id } = useParams();
    const [autor, setAutor] = useState(null);



    useEffect(() => {
        getautoresById(id)
            .then((response) => {
                setAutor(response.data);
            })
            .catch((error) => console.error(error));
    }, [id]);

    if (!autor) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mt-4">
            <AutorcardDetalle autor={autor} />
        </div>
    );
}
