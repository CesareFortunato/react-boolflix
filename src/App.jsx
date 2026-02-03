import { SearchProvider } from "./contexts/SearchContext";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

function App() {

  return (

    <SearchProvider>

      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:type/:id" element={<Detail />} />
        </Route>
      </Routes>

    </SearchProvider>

  );


}

export default App
