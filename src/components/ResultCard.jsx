function ResultCard({ item }) {
  return (
    <div className="card h-100 shadow-sm">
      {/* Immagine placeholder (milestone 3 la sostituiamo con poster_path) */}
      <div className="bg-secondary-subtle" style={{ height: "240px" }} />

      <div className="card-body d-flex flex-column">
        <h3 className="h6 mb-1">{item.name}</h3>
        <p className="text-muted small mb-2">{item.original_name}</p>

        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge text-bg-dark">{item.original_language}</span>
          <span className="badge text-bg-secondary">
            Voto: {item.vote_average}
          </span>
        </div>

        {/* Spazio per info extra / hover in milestone 4 */}
        <button className="btn btn-outline-dark btn-sm mt-auto" type="button">
          Dettagli
        </button>
      </div>
    </div>
  );
}

export default ResultCard;