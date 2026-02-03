


function App() {






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
