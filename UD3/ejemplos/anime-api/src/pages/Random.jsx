import { useState, useEffect } from "react";
import { getRandomAnime } from "../services/animeService.js";
import AnimeDetailCard from "../components/AnimeDetailCard.jsx";

export default function Random() {

    const [anime, setAnime] = useState(null);
    const [contador, setContador] = useState(0);

    const cargarAnimeAleatorio = () => {
        setAnime(null);
        setContador(contador + 1);
    }

    useEffect(() => {
        getRandomAnime()
            .then((response) => {
                console.log(response);
                setAnime(response.data.data);
            })
            .catch((error) => console.error(error));
    }, [contador]);

    if (!anime) {
        return <div>Cargando anime aleatorio...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Anime Aleatorio</h2>

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                    <AnimeDetailCard anime={anime} />
                    <div className="mt-4">
                        <button
                            onClick={cargarAnimeAleatorio}
                            className="btn btn-primary"
                        >
                            Otro anime aleatorio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
