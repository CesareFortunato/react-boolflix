import { Outlet } from "react-router-dom";
import  Header from "../components/Header.jsx"
function DefaultLayout() {
    return (
        <>
            <Header />

            <main className="container my-4">
                <Outlet />
            </main>
        </>
    );
}

export default DefaultLayout;
