// ================= IMPORTS =================
// React y Hooks
import React, { useEffect, useRef, useState } from "react";
// Iconos
import { Building2, Target, Users, Award, Clock, ChevronRight, CheckCircle, Calendar, X, ChevronLeft, ChevronRight as RightIcon, Info } from "lucide-react";
// Imágenes
import edificioImage from '../../img/Entrecallesimg1h.png';
import edificioImage2 from '../../img/Entrecallesimg2.png';
import edificioImage3 from '../../img/Entrecallesimg3.png';
import edificioImage4 from '../../img/Entrecallesimg4.png';
import edificioImage5 from '../../img/Entrecallesimg5.png';
import edificioImage6 from '../../img/Entrecallesimg6.png';
import edificioImage7 from '../../img/Entrecallesimg7.png';
// Contexto e Idioma
import { useLanguage } from "../../../i18n/LanguageContext";
// Estilos
import styles from "./Entrecalles.module.css";

const EntreCalles = () => {
  // ================= REFS =================
  // Referencias para manipular el DOM directamente (animaciones)
  const nameRef = useRef(null);
  const sectionsRef = useRef([]);
  const mainTitleRef = useRef(null);
  const statsRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // ================= STATE =================
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  const { t } = useLanguage();

  // ================= EFFECTS =================
  /**
   * Efecto para manejar las animaciones de entrada (fade-in/slide-up)
   * cuando los elementos entran en el viewport.
   */
  useEffect(() => {
    // Animación inicial con retardo para el título y estadísticas
    const timer = setTimeout(() => {
      if (mainTitleRef.current) {
        mainTitleRef.current.classList.add(styles.visible);
      }
      if (statsRef.current) {
        statsRef.current.classList.add(styles.visible);
      }
    }, 100);

    // Observer para detectar cuando las secciones son visibles al hacer scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // ================= DATA =================
  const projectImages = [
    {
      id: 1,
      title: t('entrecalles.gallery_images.img1_title'),
      description: t('entrecalles.gallery_images.img1_desc'),
      category: t('entrecalles.gallery_images.img1_cat'),
      image: edificioImage
    },
    {
      id: 2,
      title: t('entrecalles.gallery_images.img2_title'),
      description: t('entrecalles.gallery_images.img2_desc'),
      category: t('entrecalles.gallery_images.img2_cat'),
      image: edificioImage2
    },
    {
      id: 3,
      title: t('entrecalles.gallery_images.img3_title'),
      description: t('entrecalles.gallery_images.img3_desc'),
      category: t('entrecalles.gallery_images.img3_cat'),
      image: edificioImage3
    },
    {
      id: 4,
      title: t('entrecalles.gallery_images.img4_title'),
      description: t('entrecalles.gallery_images.img4_desc'),
      category: t('entrecalles.gallery_images.img4_cat'),
      image: edificioImage4
    },
    {
      id: 5,
      title: t('entrecalles.gallery_images.img5_title'),
      description: t('entrecalles.gallery_images.img5_desc'),
      category: t('entrecalles.gallery_images.img5_cat'),
      image: edificioImage5
    },
    {
      id: 6,
      title: t('entrecalles.gallery_images.img6_title'),
      description: t('entrecalles.gallery_images.img6_desc'),
      category: t('entrecalles.gallery_images.img6_cat'),
      image: edificioImage6
    },
    {
      id: 7,
      title: t('entrecalles.gallery_images.img7_title'),
      description: t('entrecalles.gallery_images.img7_desc'),
      category: t('entrecalles.gallery_images.img7_cat'),
      image: edificioImage7
    }
  ];

  const projectFeatures = [
    {
      icon: <Target size={24} />,
      title: t('entrecalles.features_list.f1_title'),
      description: t('entrecalles.features_list.f1_desc')
    },
    {
      icon: <Users size={24} />,
      title: t('entrecalles.features_list.f2_title'),
      description: t('entrecalles.features_list.f2_desc')
    },
    {
      icon: <Award size={24} />,
      title: t('entrecalles.features_list.f3_title'),
      description: t('entrecalles.features_list.f3_desc')
    },
    {
      icon: <Clock size={24} />,
      title: t('entrecalles.features_list.f4_title'),
      description: t('entrecalles.features_list.f4_desc')
    }
  ];

  // ================= HANDLERS (FUNCIONES) =================
  
  /** Abre el modal con la imagen seleccionada y bloquea el scroll del body */
  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    setModalImageLoaded(false);
    document.body.style.overflow = 'hidden';
  };

  /** Cierra el modal y restaura el scroll del body */
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageLoaded(false);
    document.body.style.overflow = 'auto';
  };

  /** Navega a la imagen anterior en el modal (cíclico) */
  const goToPrevious = () => {
    setModalImageLoaded(false);
    setSelectedImageIndex(prev =>
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };

  /** Navega a la siguiente imagen en el modal (cíclico) */
  const goToNext = () => {
    setModalImageLoaded(false);
    setSelectedImageIndex(prev =>
      prev === projectImages.length - 1 ? 0 : prev + 1
    );
  };

  /** Callback cuando la imagen del modal termina de cargar */
  const handleImageLoad = () => {
    setModalImageLoaded(true);
  };

  /** Manejador de eventos de teclado para accesibilidad (ESC, Flechas) */
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      }
      if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* HERO SECTION - CON MÁS ESPACIO ABAJO */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.companyLogo}>
            <Building2 size={64} className={styles.logoIcon} />
            <div className={styles.companyName}>
              <h1 className={styles.companyMainName}>{t('entrecalles.name')}</h1>
              <p className={styles.companySubtitle}>CONSTRUCTORA AMCO LTDA</p>
            </div>
          </div>
          <h2 ref={mainTitleRef} className={styles.heroTitle}>
            {t('entrecalles.hero_title')}
          </h2>
          <p className={styles.heroSubtitle}>
            {t('entrecalles.hero_subtitle')}
          </p>
        </div>
      </div>

      {/* STATS BAR */}
      <div ref={statsRef} className={styles.statsBar}>
        <div className={styles.messageBox}>
          <p className={styles.messageText}>
            {t('entrecalles.unique_msg')}
          </p>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className={styles.contentSection}>
        <div className={styles.container}>
          {/* HISTORIA DEL PROYECTO */}
          <div
            ref={el => sectionsRef.current[0] = el}
            className={styles.sectionWrapper}
          >
            <div className={styles['image-masterpiece']}>
              <div className={styles['image-wrapper']} ref={imageRef}>
                <img
                  src={edificioImage}
                  alt="Edificio con vida"
                  className={styles['living-image']}
                />
              </div>

              <div className={styles['title-container']}>
                <h1 className={styles['main-title']}>{t('entrecalles.img_main_title')}</h1>
                <div className={styles['title-subtle']}>{t('entrecalles.img_copyright')}</div>
              </div>
            </div>
            <br /> <br /> <br />
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('entrecalles.history_title')}</h2>
            </div>

            <div className={styles.historyContent}>
              <div className={styles.historyText}>
                <h3>{t('entrecalles.history_subtitle')}</h3>
                <p dangerouslySetInnerHTML={{ __html: t('entrecalles.history_p1') }} />
                <p>{t('entrecalles.history_p2')}</p>
              </div>

              <div className={styles.historyStats}>
                <div className={styles.statItem}>
                  <Calendar className={styles.statIcon} />
                  <div className={styles.statContent}>
                    <div className={styles.statNumber}>20+</div>
                    <div className={styles.statLabel}>{t('entrecalles.stats_years')}</div>
                  </div>
                </div>

                <div className={styles.statItem}>
                  <Target className={styles.statIcon} />
                  <div className={styles.statContent}>
                    <div className={styles.statNumber}>500m</div>
                    <div className={styles.statLabel}>{t('entrecalles.stats_height')}</div>
                  </div>
                </div>

                <div className={styles.statItem}>
                  <Building2 className={styles.statIcon} />
                  <div className={styles.statContent}>
                    <div className={styles.statNumber}>100</div>
                    <div className={styles.statLabel}>{t('entrecalles.stats_levels')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* IMPACTO URBANO */}
          <div
            ref={el => sectionsRef.current[1] = el}
            className={styles.sectionWrapper}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('entrecalles.impact_title')}</h2>
            </div>

            <div className={styles.impactContent}>
              <div className={styles.impactIntro}>
                <h3>{t('entrecalles.impact_intro')}</h3>
              </div>

              <div className={styles.impactGrid}>
                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>01</div>
                  <h4>{t('entrecalles.impact_1_title')}</h4>
                  <p>{t('entrecalles.impact_1_desc')}</p>
                </div>

                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>02</div>
                  <h4>{t('entrecalles.impact_2_title')}</h4>
                  <p>{t('entrecalles.impact_2_desc')}</p>
                </div>

                <div className={styles.impactCard}>
                  <div className={styles.impactNumber}>03</div>
                  <h4>{t('entrecalles.impact_3_title')}</h4>
                  <p>{t('entrecalles.impact_3_desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CARACTERÍSTICAS PRINCIPALES */}
          <div
            ref={el => sectionsRef.current[2] = el}
            className={styles.sectionWrapper}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('entrecalles.features_title')}</h2>
            </div>

            <div className={styles.featuresGrid}>
              {projectFeatures.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    {feature.icon}
                  </div>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* GALERÍA DE IMÁGENES */}
          <div
            ref={el => sectionsRef.current[3] = el}
            className={styles.sectionWrapper}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('entrecalles.gallery_title')}</h2>
              <p className={styles.sectionSubtitle}>
                {t('entrecalles.gallery_subtitle')}
              </p>
            </div>

            <div className={styles.galleryGrid}>
              {projectImages.map((image, index) => (
                <div
                  key={image.id}
                  className={styles.galleryItem}
                  onClick={() => openModal(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className={styles.galleryImage}
                    style={{
                      backgroundImage: `url(${image.image})`
                    }}
                  >
                    <div className={styles.imageCategory}>{image.category}</div>
                    <div className={styles.imageContent}>
                      <h4>{image.title}</h4>
                      <p>{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ESPECIFICACIONES TÉCNICAS */}
          <div
            ref={el => sectionsRef.current[4] = el}
            className={styles.sectionWrapper}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('entrecalles.specs_title')}</h2>
            </div>

            <div className={styles.specsContainer}>
              <div className={styles.specsColumn}>
                <h3>{t('entrecalles.specs_main')}</h3>
                <ul className={styles.specsList}>
                  {(t('entrecalles.specs_list_main', { returnObjects: true }) || []).map((item, i) => (
                    <li key={i}><CheckCircle size={16} /> <span dangerouslySetInnerHTML={{ __html: item }} /></li>
                  ))}
                </ul>
              </div>

              <div className={styles.specsColumn}>
                <h3>{t('entrecalles.specs_amenities')}</h3>
                <ul className={styles.specsList}>
                  {(t('entrecalles.specs_list_amenities', { returnObjects: true }) || []).map((item, i) => (
                    <li key={i}><ChevronRight size={16} /> {item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.specsColumn}>
                <h3>{t('entrecalles.specs_sustain')}</h3>
                <ul className={styles.specsList}>
                  {(t('entrecalles.specs_list_sustain', { returnObjects: true }) || []).map((item, i) => (
                    <li key={i}><CheckCircle size={16} /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* VIDEO */}
          <div
            ref={el => sectionsRef.current[5] = el}
            className={styles.sectionWrapper}
          >
            <div className={styles.videoSection}>
              <div className={styles.videoContent}>
                <h4 className={styles.videoTitle}>{t('entrecalles.video_section_title')}</h4>
                <p className={styles.videoSubtitle}>
                  {t('entrecalles.video_section_desc')}
                </p>

                <div className={styles.videoWrapper}>
                  <iframe
                    src="https://www.youtube.com/embed/k5RfEowqxgI"
                    title={t('entrecalles.iframe_title')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* NOTA INFORMATIVA */}
          <div
            ref={el => sectionsRef.current[6] = el}
            className={styles.sectionWrapper}
          >
            <div className={styles.infoNote}>
              <Info className={styles.infoIcon} size={48} />
              <h3>{t('entrecalles.info_title')}</h3>
              <p>{t('entrecalles.info_p1')}</p>
              <p style={{ marginTop: '1rem' }}>{t('entrecalles.info_p2')}</p>
              <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>{t('entrecalles.info_update')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE GALERÍA */}
      {isModalOpen && selectedImageIndex !== null && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 'calc(100% - 2rem)',
              maxHeight: 'calc(100% - 2rem)',
              margin: 'auto'
            }}
          >
            {/* Botón cerrar */}
            <button
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            <div className={styles.modalImageContainer}>
              {!modalImageLoaded && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '1rem'
                }}>
                  Cargando...
                </div>
              )}

              <img
                src={projectImages[selectedImageIndex].image}
                alt={projectImages[selectedImageIndex].title}
                className={styles.modalImage}
                onLoad={handleImageLoad}
                style={{
                  opacity: modalImageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              />

              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={goToPrevious}
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={goToNext}
                aria-label="Siguiente imagen"
              >
                <RightIcon size={24} />
              </button>

              <div className={styles.imageCounter}>
                <span className={styles.currentIndex}>{selectedImageIndex + 1}</span>
                <span className={styles.totalImages}> / {projectImages.length}</span>
              </div>
            </div>

            <div className={styles.imageInfo}>
              <h3 className={styles.imageTitle}>
                {projectImages[selectedImageIndex].title}
              </h3>
              <p className={styles.imageDescription}>
                {projectImages[selectedImageIndex].description}
              </p>
              <div className={styles.imageCategoryTag}>
                {projectImages[selectedImageIndex].category}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EntreCalles;