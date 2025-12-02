import { Link } from 'react-router-dom';

export default function AnimeCard({ anime }) {
    const img = anime.images?.jpg?.image_url

    return (
        <div className="col-lg-3 col-md-4 col-12 mb-3">
            <div className="card h-100 p-2 shadow-sm">


                <Link
                    to={`/anime/${anime.mal_id}`}
                    className="text-decoration-none fw-semibold d-block mt-1"
                >

                    {anime.title_english || anime.title}

                    {img && (
                        <img
                            src={img}
                            alt={anime.title_english || anime.title}
                            className="img-fluid rounded mb-2"
                        />
                    )}

                    ✨{anime.score} - #{anime.rank}



                </Link>
            </div>
        </div>
    )
}

