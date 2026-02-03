import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import "flag-icons/css/flag-icons.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
  </StrictMode>,
)
