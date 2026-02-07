// ================= IMPORTS =================
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// Local Components & Data
import VideoPlayer from './VideoPlayer';
import { proyectos } from "./vistaproyectos.data";
import { useLanguage } from "../../../i18n/LanguageContext";

const VistaProyecto = () => {
  // ================= HOOKS =================
  const { t } = useLanguage();
  const { id } = useParams();
  const [selectedImg, setSelectedImg] = useState(null);

  // Efecto: Scroll al inicio al cargar un nuevo proyecto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ================= LOGIC =================
  // Buscar proyecto por ID (convirtiendo ambos a String para seguridad)
  const proyecto = proyectos?.find((p) => String(p.id) === String(id));

  // Manejo de caso: Proyecto no encontrado
  if (!proyecto) {
    return (
      <p className="text-center text-gray-400 mt-10 text-base sm:text-lg font-medium">
        Proyecto no encontrado (ID buscado: {id})
      </p>
    );
  }

  // Preparar datos de la galería si existe contenido
  const hasGallery = Array.isArray(proyecto.content) && proyecto.content.length > 0;
  const itemData = hasGallery
    ? proyecto.content.map((item) => ({
        img: item.image,
        title: proyecto.title,
      }))
    : [];

  return (
    <section className="relative min-h-screen flex justify-center px-3 sm:px-6 pt-24 sm:pt-40 md:pt-48 pb-16 sm:pb-20 overflow-hidden bg-black">
      {/* FONDO */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute w-[200%] h-[200%]
          bg-[radial-gradient(circle,white_1.5px,transparent_3px),radial-gradient(circle,yellow_1.5px,transparent_3px)]
          bg-[size:120px_120px]
          animate-[moveParticles_20s_linear_infinite]"
        />
      </div>

      {/* CONTENIDO */}
      <div className="max-w-6xl w-full flex flex-col items-center gap-16">
           <br /><br /><br />
        {/* IMAGEN PRINCIPAL Y TEXTO */}
        <div className="w-full flex flex-col md:flex-row items-center gap-10">
          
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={proyecto.image}
              alt={proyecto.title}
              className="w-full max-h-[180px] sm:max-h-[280px] md:max-h-[420px] object-contain rounded-lg sm:rounded-xl shadow-xl shadow-yellow-500/10 transition-transform duration-500 md:hover:scale-105"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight">
              {t(`data_proyectos.${proyecto.id}.title`) || proyecto.title}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
              {t(`data_proyectos.${proyecto.id}.description`) || proyecto.description}
            </p>
          </div>
        </div>

        {/* VIDEO */}
        {proyecto.video && (
          <div className="w-full flex justify-center">
            <VideoPlayer src={proyecto.video} title={proyecto.title} />
          </div>
        )}
{/* GALERÍA */}
{hasGallery && (
  <div className="w-full flex justify-center">
    <ImageList
      sx={{ width: "100%", maxWidth: 1000 }}
      variant="quilted"
      cols={4}
      rowHeight={130}
      gap={12}
    >
      {itemData.map((item, index) => (
        <ImageListItem
          key={index}
          className="group cursor-pointer overflow-hidden rounded-2xl"
          onClick={() => setSelectedImg(item.img)}
        >
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            className="
              w-full h-full object-cover
              transition-all duration-500 ease-out
              group-hover:scale-110
              group-hover:brightness-110
              group-hover:contrast-110
            "
          />

          {/* Overlay futurista */}
          <div className="
            absolute inset-0
            bg-gradient-to-t from-black/40 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition duration-500
          " />
        </ImageListItem>
      ))}
    </ImageList>
  </div>
)}
{/* MODAL FUTURISTA */}
{selectedImg && (
  <div
    className="
      fixed inset-0 z-[999]
      bg-black/70 backdrop-blur-xl
      flex items-center justify-center
      p-4 overflow-auto
      animate-fadeIn
    "
    onClick={() => setSelectedImg(null)}
  >
    <div
      className="
        relative
        max-w-6xl w-full
        flex items-center justify-center
        animate-popIn
      "
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={selectedImg}
        alt="preview"
        className="
          max-h-[90vh] w-auto
          rounded-3xl
          shadow-[0_20px_80px_rgba(0,0,0,0.6)]
          border border-white/10
          select-none
        "
      />

      {/* Solo ícono Remix Icon */}
      <i
        className="
          ri-close-line text-3xl text-white
          absolute top-4 right-4
          cursor-pointer
          transition-transform duration-300
          hover:scale-125 animate-bounce
        "
        onClick={() => setSelectedImg(null)}
      ></i>
    </div>
  </div>
)}
</div> 
    </section>
  );
};



export default VistaProyecto;