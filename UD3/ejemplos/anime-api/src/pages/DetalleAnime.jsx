import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAnimeByID } from "../services/animeService.js";
import AnimeDetailCard from "../components/AnimeDetailCard.jsx";

export default function DetalleAnime() {

    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [detalleAnimeActual, setDetalleAnimeActual] = useState(id)
    const [paginaActual, setPaginaActual] = useState(1)
     


    useEffect(() => {
        getAnimeByID(detalleAnimeActual)
            .then((response) => {
                console.log(response);
                setAnime(response.data.data);
            })
            .catch((error) => console.error(error));
    }, [detalleAnimeActual]);

    const irAPaginaAnterior = () => {
        if (detalleAnimeActual > 1) {
            setDetalleAnimeActual(detalleAnimeActual - 1)
            setPaginaActual(paginaActual - 1)
        }
    }

    const irAPaginaSiguiente = () => {
        setDetalleAnimeActual(detalleAnimeActual + 1)
        setPaginaActual(paginaActual + 1)
    }

    if (!anime) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mt-4">
            <AnimeDetailCard anime={anime} />

            <div className="paginacion mt-4">
                <button
                    onClick={irAPaginaAnterior}
                    disabled={paginaActual == 1}
                >
                    ← Anterior
                </button>
                <span>Página {paginaActual}</span>
                <button onClick={irAPaginaSiguiente}>
                    Siguiente →
                </button>
            </div>
        </div>
    );
}
