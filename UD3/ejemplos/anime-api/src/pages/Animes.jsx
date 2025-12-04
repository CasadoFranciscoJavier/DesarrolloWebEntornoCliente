import { useState, useEffect } from "react";
import { getAnimes } from "../services/animeService.js"
import AnimeCard from "../components/AnimeCard.jsx";

export default function ListarAnimes() {

    const [animes, setAnimes] = useState([])
    const [paginaActual, setPaginaActual] = useState(1)

   useEffect(() => {
    getAnimes(paginaActual)
        .then((response) => {
            // console.log(response)
            setAnimes(response.data.data)
        })
        .catch((error) => console.error(error))
}, [paginaActual])

    const irAPaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1)
        }
    }

    const irAPaginaSiguiente = () => {
        setPaginaActual(paginaActual + 1)
    }

    return (
        <div>
            <h2>Listado de animes</h2>

            <div className="paginacion">
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

            <div className="row">
            
                {animes.map((anime) => (
                    <AnimeCard key={anime.mal_id} anime = { anime } />
                ))}
            </div>

            <div className="paginacion">
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