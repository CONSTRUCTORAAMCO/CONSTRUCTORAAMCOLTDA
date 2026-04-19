import { Link } from "react-router-dom";
import { Construction, Home } from "lucide-react";

const Error404 = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden text-white bg-black">

      {/* ️ Fondo con temática de construcción */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb1930060')] bg-cover bg-center opacity-20 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/95 to-black" />
      </div>

      {/* ✨ Brillos industriales naranja */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-64 h-64 bg-orange-500/10 rounded-full top-1/4 -left-32 blur-[100px] animate-pulse" />
        <div className="absolute w-64 h-64 bg-amber-500/10 rounded-full bottom-1/4 -right-32 blur-[100px] animate-pulse" />
      </div>

      {/* 🚧 Card principal */}
      <div className="relative z-10 text-center max-w-lg">

        {/* Glass container */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-orange-500/20 rounded-[2.5rem] px-10 py-12 shadow-2xl shadow-black/80">

          {/* Icono animado */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/30 animate-bounce">
              <Construction size={48} className="text-orange-500" />
            </div>
          </div>

          {/* 404 */}
          <h1 className="text-8xl sm:text-[110px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-orange-700 drop-shadow-2xl">
            404
          </h1>

          {/* Título */}
          <h2 className="text-2xl font-bold mt-2 text-white uppercase tracking-tight">
            Página fuera de los planos
          </h2>

          {/* Descripción */}
          <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-xs mx-auto">
            La ruta que intentas acceder no existe o se encuentra actualmente bajo remodelación.
          </p>

          {/* Botón */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold hover:scale-105 transition-all duration-300 shadow-xl shadow-orange-500/30 uppercase tracking-widest text-xs"
            >
              <Home size={16} />
              Volver al inicio
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Error404;