import { useEffect, useState } from "react";
import styles from "./Objetivo.module.css";
import { useLanguage } from "../../../i18n/LanguageContext";

import imagenProyecto from "../../../assets/img/objetivosocialimg.png";
import videoBg from "../../../assets/video/21233-316116300_small.mp4";

const Objetivo = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  /* Detectar móvil */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize();

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  /* Animación scroll */
  useEffect(() => {
    const texto = document.querySelector(`.${styles.reveal}`);
    if (!texto) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          texto.classList.add(styles.active);
        } else {
          texto.classList.remove(styles.active);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(texto);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.objetivoSection}>
      {/* IZQUIERDA */}
      <div className={styles.leftBox}>
        <video
          className={styles.videoBg}
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className={`${styles.glassOverlay} ${styles.reveal}`}>
          <h2>{t('objetivo.title')}</h2>
          <p>
            {t('objetivo.description')}
          </p>
        </div>
      </div>

      {/* DERECHA (solo desktop) */}
      {!isMobile && (
        <div className={styles.rightBox}>
          <img src={imagenProyecto} alt="Proyecto AMCO" />
        </div>
      )}
    </section>
  );
};

export default Objetivo;
