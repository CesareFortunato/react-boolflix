import { createContext, useContext, useState } from "react";
import axios from "axios";

//variabile context
const SearchContext = createContext();

//variabili per call api
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const endpointTV = "https://api.themoviedb.org/3/search/tv?api_key="
const endpointMovie = "https://api.themoviedb.org/3/search/movie?api_key="



export function SearchProvider({ children }) {

    //variabili di stato

    const [searchInput, setSearchInput] = useState("");
    const [tvResults, setTvResults] = useState([]);
    const [movieResults, setMovieResults] = useState([]);

//funzione per far partire le chiamate

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

    //variavile che passo all'app

    const value = {
        // state
        searchInput,
        tvResults,
        movieResults,

        // setters / actions
        setSearchInput,
        handleSearch,
    };


    return (
        //tutti i componenti figli possono accedere a value
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}



export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch deve essere usato dentro <SearchProvider>");
    }
    return context;


}


export default SearchContext