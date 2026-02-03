import { useState } from 'react'
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const endpoint = "https://api.themoviedb.org/3/search/tv?api_key="

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [tvResults, setTvResults] = useState([]);

  function handleSearch() {

    axios
      .get(endpoint + API_KEY + "&query=" + searchInput)
      .then(response => {
        setTvResults(response.data)
      })
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
          <ul>
            {tvResults.map(el =>
            (<li key={el.id}>
              <p>{el.name}</p>
              <p>{el.original_name}</p>
              <p>{el.original_language}</p>
              <p>{el.vote_average}</p>
            </li>)
            )}
          </ul>
        </div>
      </div>
    </div>

  );

}

export default App
