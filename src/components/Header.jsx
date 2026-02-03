import { useSearch } from "../contexts/SearchContext";

function Header() {
    const {
        searchInput,
        setSearchInput,
        handleSearch
    } = useSearch();

    function handleSubmit(e) {
        e.preventDefault();
        handleSearch();
    }

    return (
        <header className="bg-dark text-white py-3">
            <div className="container d-flex align-items-center justify-content-between gap-3">

                {/* Logo */}
                <div className="fw-bold fs-4">
                    BoolFlix
                </div>

                {/* Search */}
                <form className="d-flex gap-2" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cerca un film o una serie..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />

                    <button className="btn btn-danger" type="submit">
                        Cerca
                    </button>
                </form>

            </div>
        </header>

    )
}