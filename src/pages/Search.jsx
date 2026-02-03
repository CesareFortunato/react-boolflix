import { useSearch } from "../context/SearchContext";

const IMG_BASE = "https://image.tmdb.org/t/p/w342";
const PLACEHOLDER = "https://via.placeholder.com/342x513?text=No+Image";

function Search() {
  const {
    searchInput,
    getStars,
    languageToCountry,
    tvResults,
    movieResults,
  } = useSearch();

  return (
    <div>
      <h1 className="h4 mb-3">
        Risultati per: <span className="text-muted">{searchInput}</span>
      </h1>

      {/* SERIE TV */}
      <h2 className="h5 mt-4">Serie TV</h2>

      <div className="row g-3">
        {tvResults.map((el) => {
          const countryCode = languageToCountry(el.original_language);

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={el.id}>
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top"
                  src={el.poster_path ? `${IMG_BASE}${el.poster_path}` : PLACEHOLDER}
                  alt={el.name}
                />

                <div className="card-body">
                  <h3 className="h6 mb-1">{el.name}</h3>
                  <p className="text-muted small mb-2">{el.original_name}</p>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    {countryCode ? (
                      <span
                        className={`fi fi-${countryCode}`}
                        style={{ width: "24px", height: "16px" }}
                      />
                    ) : (
                      <span className="badge text-bg-secondary">
                        {el.original_language}
                      </span>
                    )}

                    <span className="ms-auto">{getStars(el.vote_average)}</span>
                  </div>

                  <p className="small mb-0">
                    {el.overview}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FILM */}
      <h2 className="h5 mt-5">Film</h2>

      <div className="row g-3">
        {movieResults.map((el) => {
          const countryCode = languageToCountry(el.original_language);

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={el.id}>
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top"
                  src={el.poster_path ? `${IMG_BASE}${el.poster_path}` : PLACEHOLDER}
                  alt={el.title}
                />

                <div className="card-body">
                  <h3 className="h6 mb-1">{el.title}</h3>
                  <p className="text-muted small mb-2">{el.original_title}</p>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    {countryCode ? (
                      <span
                        className={`fi fi-${countryCode}`}
                        style={{ width: "24px", height: "16px" }}
                      />
                    ) : (
                      <span className="badge text-bg-secondary">
                        {el.original_language}
                      </span>
                    )}

                    <span className="ms-auto">{getStars(el.vote_average)}</span>
                  </div>

                  <p className="small mb-0">
                    {el.overview}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )

}

export default Search