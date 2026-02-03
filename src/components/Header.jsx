import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Header() {
    const {
        searchInput,
        setSearchInput,
        handleSearch
    } = useSearch();

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        handleSearch();
        navigate("/search");
    }

    return (
        <header className="bg-dark text-white py-3">
            <div className="container d-flex align-items-center justify-content-between gap-3">

                {/* Logo */}
                <Link to="/" className="fw-bold fs-4 text-white text-decoration-none">
                    BoolFlix
                </Link>

                {/* Search */}
                {/* form per fare invio da tastiera */}
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

export default Header