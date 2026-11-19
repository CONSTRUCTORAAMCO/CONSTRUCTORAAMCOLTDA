import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // Tu componente principal con las rutas
import { LanguageProvider } from "./i18n/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import { HelmetProvider } from "react-helmet-async"; // 1. Importar
import "./index.css";

// React 19 hoists Helmet metadata natively. Remove the static entry tags
// before mounting so navigation cannot leave stale or duplicate canonicals.
document.querySelectorAll("[data-amco-seo]").forEach(tag => tag.remove());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider> {/* 2. Envolver la aplicación */}
      <BrowserRouter>
        <LanguageProvider>
          <App />
          <Analytics />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
