import { useParams } from "react-router-dom";
import { proyectos } from "./vistaproyectos.data";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";
import VideoPlayer from './VideoPlayer';

const VistaProyecto = () => {
  const { id } = useParams();
  const proyecto = proyectos.find((p) => p.id === Number(id));
  const [selectedImg, setSelectedImg] = useState(null);

  if (!proyecto) {
    return (
      <p className="text-center text-gray-400 mt-10 text-base sm:text-lg font-medium">
        Proyecto no encontrado
      </p>
    );
  }

  const hasGallery = Array.isArray(proyecto.content) && proyecto.content.length > 0;
  const itemData = hasGallery
    ? proyecto.content.map((item) => ({
        img: item.image,
        title: proyecto.title,
      }))
    : [];

  return (
    <section className="relative min-h-screen flex justify-center px-3 sm:px-6 pt-44 sm:pt-40 md:pt-48 pb-16 sm:pb-20 overflow-hidden bg-black">
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
              {proyecto.title}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
              {proyecto.description}
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
            <ImageList sx={{ width: "100%", maxWidth: 900 }} variant="quilted" cols={4} rowHeight={120}>
              {itemData.map((item, index) => (
                <ImageListItem
                  key={index}
                  className="cursor-pointer"
                  onClick={() => setSelectedImg(item.img)}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="rounded-lg hover:scale-105 transition"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        )}

        {/* MODAL */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center"
            onClick={() => setSelectedImg(null)}
          >
            <img
              src={selectedImg}
              alt="preview"
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl transition"
            />
          </div>
        )}
      </div>
    </section>
    
  );
};

export default VistaProyecto;