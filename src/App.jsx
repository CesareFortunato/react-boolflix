import { useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const endpointTV = "https://api.themoviedb.org/3/search/tv?api_key="
const endpointMovie = "https://api.themoviedb.org/3/search/movie?api_key="

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [tvResults, setTvResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);

  function getStars(num) {

    const stars = Math.ceil(num / 2);

    return (
      <>
        {[...Array(5)].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={i < stars ? faStarSolid : faStarRegular}
          />
        ))}
      </>
    );

  }



  function handleSearch() {

    axios
      .get(endpointMovie + API_KEY + "&query=" + searchInput)
      .then(response => {
        setMovieResults(response.data.results)
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(endpointTV + API_KEY + "&query=" + searchInput)
      .then(response => {
        setTvResults(response.data.results)
      })
      .catch(err => {
        console.log(err);
      });
  }

  function languageToCountry(lang) {
    const map = {
      en: "gb",
      it: "it",
      fr: "fr",
      es: "es",
      de: "de",
      ja: "jp",
      ko: "kr",
      zh: "cn"
    };

    return map[lang] || null;
  }

  return (

    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="input-group">

            <input type="text" value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="form-control"
              placeholder="Cerca..." />

            <button className="btn btn-dark"
              onClick={handleSearch}>
              Cerca
            </button>
          </div>
          <h1>Serie TV</h1>
          <ul>
            {tvResults.map(el => {

              const countryCode = languageToCountry(el.original_language);


              return (
                <li key={el.id}>
                  <p>{el.name}</p>
                  <p>{el.original_name}</p>
                  {countryCode ? (
                    <span className={`fi fi-${countryCode}`}
                      style={{ width: "24px", height: "16px" }}
                    ></span>
                  ) : (
                    <span>{el.original_language}</span>
                  )}
                  <p>{getStars(el.vote_average)}</p>
                </li>
              )
            })}
          </ul>
          <h1>Film</h1>
          <ul>
            {movieResults.map(el => {

              const countryCode = languageToCountry(el.original_language);

              return (
                <li key={el.id}>
                  <img
                    src={
                      el.poster_path
                        ? `https://image.tmdb.org/t/p/w342${el.poster_path}`
                        : "https://via.placeholder.com/342x513?text=No+Image"
                    }
                    alt={el.title} />
                  <p>{el.title}</p>
                  <p>{el.original_title}</p>
                  {countryCode ? (
                    <span className={`fi fi-${countryCode}`}
                      style={{ width: "24px", height: "16px" }}
                    ></span>
                  ) : (
                    <span>{el.original_language}</span>
                  )}
                  <p>{getStars(el.vote_average)}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>

  );

}

export default App
