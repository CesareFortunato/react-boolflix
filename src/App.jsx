import { useState } from 'react'
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const endpoint = "https://api.themoviedb.org/3/search/tv?api_key="

function App() {
  const [searchInput, setSearchInput] = useState("");

  function handleSearch() {

    axios
      .get(endpoint + API_KEY + "&query=" + searchInput)
      .then(response => {
        console.log(response.data.results)
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
        </div>
      </div>
    </div>

  );

}

export default App
