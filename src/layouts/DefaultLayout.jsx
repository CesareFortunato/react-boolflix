import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <>
      <header className="bg-dark text-white py-3">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="fw-bold fs-4">BoolFlix</div>
          {/* SearchBar */}
        </div>
      </header>

      <main className="container my-4">
        <Outlet />
      </main>
    </>
  );
}

export default DefaultLayout;
