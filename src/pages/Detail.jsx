import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSearch } from "../context/SearchContext";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w342";
const PLACEHOLDER = "https://dummyimage.com/342x513/444/ffffff&text=No+Image";

function Detail() {
  const { type, id } = useParams(); // type = "movie" | "tv"
  const { getStars, languageToCountry } = useSearch();

  const [item, setItem] = useState(null);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // 1) dettaglio
    const detailUrl = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=it-IT`;

    // 2) credits (cast)
    const creditsUrl = `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=it-IT`;

    axios
      .get(detailUrl)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Errore nel caricamento dei dettagli.");
      });

    axios
      .get(creditsUrl)
      .then((res) => {
        const firstFive = res.data.cast ? res.data.cast.slice(0, 5) : [];
        setCast(firstFive);
      })
      .catch((err) => {
        console.log(err);
        // qui NON blocco tutto: se fallisce cast, mostro solo dettagli
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [type, id]);

  if (isLoading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;
  if (!item) return <p>Nessun dettaglio disponibile.</p>;

  // campi diversi tra movie e tv
  const title = type === "movie" ? item.title : item.name;
  const originalTitle = type === "movie" ? item.original_title : item.original_name;

  const countryCode = languageToCountry(item.original_language);

  return (
    <div className="row g-4">
      <div className="col-12 col-md-4">
        <img
          className="img-fluid rounded shadow-sm"
          src={item.poster_path ? `${IMG_BASE}${item.poster_path}` : PLACEHOLDER}
          alt={title}
        />
      </div>

      <div className="col-12 col-md-8">
        <h1 className="h3 mb-1">{title}</h1>
        <p className="text-muted mb-2">{originalTitle}</p>

        <div className="d-flex align-items-center gap-3 mb-3">
          {countryCode ? (
            <span
              className={`fi fi-${countryCode}`}
              style={{ width: "28px", height: "18px" }}
            />
          ) : (
            <span className="badge text-bg-secondary">
              {item.original_language}
            </span>
          )}

          <span>{getStars(item.vote_average)}</span>
        </div>

        <h2 className="h6">Overview</h2>
        <p>{item.overview || "Nessuna descrizione disponibile."}</p>

        <h2 className="h6 mt-4">Attori</h2>
        {cast.length > 0 ? (
          <ul className="mb-0">
            {cast.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted mb-0">Cast non disponibile.</p>
        )}
      </div>
    </div>
  );
}

export default Detail;
