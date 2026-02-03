import { createContext, useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";


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

    //funzione per icone stella

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

    //funzione per flag lingue

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
        
        // utilities
        getStars,
        languageToCountry,
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