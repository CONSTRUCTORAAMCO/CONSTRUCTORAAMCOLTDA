import { useLanguage } from "../../../i18n/LanguageContext";

const HeroVideo = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-black">
      
      {/* Video YouTube Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77dvh] h-[100dvh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 scale-110 pointer-events-none"
          src="https://www.youtube.com/embed/km0MPLUZ0NQ?autoplay=1&mute=1&loop=1&playlist=km0MPLUZ0NQ&controls=0&rel=0&iv_load_policy=3&disablekb=1"
          title="Hero Background Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* CONTENIDO IZQUIERDA */}
      <div className="relative z-10 h-full flex items-center">
        <div
          className="
            pl-6
            sm:pl-10
            md:pl-20
            lg:pl-32
            2xl:pl-40
            text-left
          "
        >
          {/* Aquí va tu contenido */}
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce text-white">
        <span className="text-xs tracking-widest mb-1">
          {t("hero.scroll")}
        </span>
        <div className="w-[2px] h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default HeroVideo;