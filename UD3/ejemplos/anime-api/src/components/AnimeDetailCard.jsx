export default function AnimeDetailCard({ anime }) {

    const imagenUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

    return (
        <div className="row">
            <div className="col-md-4">
                {imagenUrl && (
                    <img
                        src={imagenUrl}
                        alt={anime.title_english || anime.title}
                        className="img-fluid rounded"
                    />
                )}
            </div>
            <div className="col-md-8">
                <h1>{anime.title_english || anime.title}</h1>
                <p><strong>Titulo japones:</strong> {anime.title}</p>
                <p><strong>Puntuacion:</strong> {anime.score}</p>
                <p><strong>Ranking:</strong> #{anime.rank}</p>
                <p><strong>Episodios:</strong> {anime.episodes || 'Desconocido'}</p>
                <p><strong>Ano inicio:</strong> {anime.year || 'Desconocido'}</p>
                <p><strong>Tipo:</strong> {anime.type}</p>

                <h3>Sinopsis</h3>
                <p>{anime.synopsis || 'No disponible'}</p>

                {anime.genres && anime.genres.length > 0 && (
                    <div>
                        <h4>Generos</h4>
                        <div>
                            {anime.genres.map((genero) => (
                                <span key={genero.mal_id} className="badge bg-primary me-2">
                                    {genero.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
