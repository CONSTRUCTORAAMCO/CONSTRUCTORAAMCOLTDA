// ================= IMPORTS =================
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../assets/components/layout/MainLayout";
import ScrollToTop from "../assets/components/scrolltotop/ScrollToTop";

// ================= LAZY LOADING =================
const Home = lazy(() => import("../pages/Home"));
const Nosotros = lazy(() => import("../pages/Nosotros"));
const Entrecalles = lazy(() => import("../pages/Entrecalles"));
const Contacto = lazy(() => import("../pages/Contacto"));
const Proyectos = lazy(() => import("../pages/Proyectos"));
const Politicaprivacidad = lazy(() => import("../pages/Politicaprivacidad"));
const Tyc = lazy(() => import("../pages/Tyc"));

const VistasProyecto = lazy(() =>
  import("../assets/modules/vistasproyectos/vistaproyecto").then((module) => ({
    default: module.default,
  }))
);

const ComunidadesCarousel = lazy(() =>
  import("../assets/modules/prototipos").then((module) => ({
    default: module.ComunidadesCarousel,
  }))
);

// 👇 404 PAGE
const Error404 = lazy(() => import("../pages/Error404.jsx"));

// ================= COMPONENT =================
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>

          {/* ===== RUTAS PRINCIPALES ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/entrecalles" element={<Entrecalles />} />
          <Route path="/prototipos" element={<ComunidadesCarousel />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/politicaprivacidad" element={<Politicaprivacidad />} />
          <Route path="/tyc" element={<Tyc />} />
          <Route path="/proyecto/:id" element={<VistasProyecto />} />

          {/* 🚨 404 CATCH ALL (IMPORTANTE) */}
          <Route path="*" element={<Error404 />} />

        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;