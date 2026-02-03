import ResultCard from "./ResultCard";
import { useState } from 'react'
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const endpoint = "https://api.themoviedb.org/3/search/tv?api_key="

function ResultsList({ results }) {

    const [searchInput, setSearchInput] = useState("");
    const [tvResults, setTvResults] = useState([]);


    function handleSearch() {

        axios
            .get(endpoint + API_KEY + "&query=" + searchInput)
            .then(response => {
                setTvResults(response.data.results)
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <section className="mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h5 m-0">Risultati</h2>
                <span className="text-muted small">
                    Trovati: {results.length}
                </span>
            </div>

            <div className="row g-3">
                {tvResults.map((item) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                        <ResultCard item={item} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ResultsList;