import { useEffect, useRef } from "react";
import {
  Building2, Target, Eye, Award, Clock, Leaf, MessageSquare,
  Lightbulb, Users, Calendar, CheckCircle, TrendingUp,
  Home, Briefcase, ShoppingBag, School, Factory,
  User, Quote
} from "lucide-react";
import styles from "./Nosotros.module.css";
import { useLanguage } from "../../../i18n/LanguageContext";

export default function Nosotros() {
  const { t } = useLanguage();

  const mainTitleRef = useRef(null);
  const heroNameRef = useRef(null);
  const fundadorRef = useRef(null);
  const organizacionRef = useRef(null);
  const misionRef = useRef(null);
  const visionRef = useRef(null);
  const valoresRef = useRef(null);
  const timelineRef = useRef(null);
  const statsRef = useRef(null);
  const sectoresRef = useRef(null);
  const paragraphRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = [
      mainTitleRef.current,
      heroNameRef.current,
      fundadorRef.current,
      organizacionRef.current,
      misionRef.current,
      visionRef.current,
      valoresRef.current,
      timelineRef.current,
      statsRef.current,
      sectoresRef.current,
      ...paragraphRefs.current.filter(Boolean)
    ];

    elements.forEach(el => el && observer.observe(el));

    return () => {
      elements.forEach(el => el && observer.unobserve(el));
    };
  }, []);

  return (
    <section className={styles.nosotros}>
      {/* HERO SECTION */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.companyLogo}>
            <Building2 size={64} className={styles.logoIcon} />
            <div className={styles.companyName}>
              <h1 ref={heroNameRef} className={styles.heroTitle}>
                {t('nosotros.hero.name')}
              </h1>
              <p className={styles.companySubtitle}>CONSTRUCTORA AMCO LTDA</p>
            </div>
          </div>
          <h2 ref={mainTitleRef} className={styles.heroTitle}>
            {t('nosotros.hero.title')}
          </h2>
          <p className={styles.heroSubtitle}>
            {t('nosotros.hero.subtitle')}
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* STATS BAR */}
        <div ref={statsRef} className={styles.statsBar}>
          <div className={styles.statItem}>
            <Calendar className={styles.statIcon} />
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>50+</h3>
              <p className={styles.statLabel}>{t('nosotros.stats.experience')}</p>
            </div>
          </div>

          <div className={styles.statDivider}></div>

          <div className={styles.statItem}>
            <TrendingUp className={styles.statIcon} />
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>60+</h3>
              <p className={styles.statLabel}>{t('nosotros.stats.executed')}</p>
            </div>
          </div>

          <div className={styles.statDivider}></div>

          <div className={styles.statItem}>
            <CheckCircle className={styles.statIcon} />
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>10M+</h3>
              <p className={styles.statLabel}>{t('nosotros.stats.built')}</p>
            </div>
          </div>
        </div>

        {/* NUEVA SECCIÓN: EL FUNDADOR */}
        <div ref={fundadorRef} className={styles.fundadorSection}>
          <div className={styles.sectionHeader}>
            <User className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{t('nosotros.founder.title')}</h2>
          </div>

          <div className={styles.fundadorContent}>
            {/* Tarjeta izquierda: Texto */}
            <div className={styles.fundadorTexto}>
              <div className={styles.fundadorHeader}>
                <h3 className={styles.fundadorNombre}>{t('nosotros.founder.name')}</h3>
                <div className={styles.fundadorCargo}>
                  <span>{t('nosotros.founder.role')} </span>
                  <div className={styles.fundadorExperiencia}>
                    <Calendar size={16} />
                    <span>{t('nosotros.founder.experience')}</span>
                  </div>
                </div>
              </div>

              <div className={styles.fundadorHistoria}>
                <p>{t('nosotros.founder.p1')}</p>
                <p>{t('nosotros.founder.p2')}</p>
                <p>{t('nosotros.founder.p3')}</p>
                <p>{t('nosotros.founder.p4')}</p>
              </div>
            </div>

            {/* Tarjeta derecha: Imagen */}
            <div className={styles.fundadorImagen}>
              <div className={styles.imagenContainer}>
                <div className={styles.imagenPlaceholder}>
                  <div className={styles.imagenContent}>
                    <User size={120} className={styles.imagenIcon} />
                    <p className={styles.imagenTexto}>{t('nosotros.founder.caption')}</p>
                  </div>
                </div>
                <div className={styles.imagenCaption}>
                  <span className={styles.captionText}>{t('nosotros.founder.caption_role')}</span>
                  <span className={styles.captionYear}>{t('nosotros.founder.caption_year')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Texto descriptivo abajo */}
          <div className={styles.fundadorFrase}>
            <div className={styles.fraseContainer}>
              <Quote className={styles.fraseIcon} />
              <p className={styles.fraseTexto}>
                "{t('nosotros.founder.quote')}"
              </p>
              <div className={styles.fraseAutor}>
                <span className={styles.autorLine}></span>
                <span className={styles.autorNombre}>— {t('nosotros.founder.name')}</span>
                <span className={styles.autorLine}></span>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN LA ORGANIZACIÓN */}
        <div ref={organizacionRef} className={styles.organizacion}>
          <div className={styles.sectionHeader}>
            <Building2 className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{t('nosotros.organization.title')}</h2>
          </div>

          <div className={styles.organizacionContent}>
            <div className={styles.empresaCard}>
              <div className={styles.empresaHeader}>
                <div className={styles.empresaLogo}>
                  <Building2 className={styles.empresaIcon} />
                </div>
                <div className={styles.empresaInfo}>
                  <h3 className={styles.empresaName}>Constructora AMCO Ltda.</h3>
                  <div className={styles.empresaBadge}>
                    <Calendar size={16} />
                    <span>{t('nosotros.organization.amco.founded')}</span>
                  </div>
                </div>
              </div>
              <p className={styles.empresaDescription}>
                {t('nosotros.organization.amco.desc')}
              </p>
              <div className={styles.empresaTags}>
                {t('nosotros.organization.amco.tags', { returnObjects: true })?.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.empresaCard}>
              <div className={styles.empresaHeader}>
                <div className={styles.empresaLogo}>
                  <Building2 className={styles.empresaIcon} />
                </div>
                <div className={styles.empresaInfo}>
                  <h3 className={styles.empresaName}>AMR Construcciones</h3>
                  <div className={styles.empresaBadge}>
                    <Calendar size={16} />
                    <span>{t('nosotros.organization.amr.founded')}</span>
                  </div>
                </div>
              </div>
              <p className={styles.empresaDescription}>
                {t('nosotros.organization.amr.desc')}
              </p>
              <div className={styles.empresaTags}>
                {t('nosotros.organization.amr.tags', { returnObjects: true })?.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <p
            ref={el => paragraphRefs.current[0] = el}
            className={`${styles.organizacionText} ${styles.animatedParagraph}`}
          >
            {t('nosotros.organization.p1')}
          </p>

          <p
            ref={el => paragraphRefs.current[1] = el}
            className={`${styles.organizacionText} ${styles.animatedParagraph}`}
            style={{ transitionDelay: "0.1s" }}
          >
            {t('nosotros.organization.p2')}
          </p>
        </div>

        {/* TIMELINE VISUAL */}
        <div ref={timelineRef} className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineYear}>1973</div>
            <div className={styles.timelineDot}>
              <div className={styles.timelineDotInner}></div>
            </div>
            <div className={styles.timelineContent}>
              <h4 className={styles.timelineTitle}>{t('nosotros.timeline.t1973.title')}</h4>
              <p className={styles.timelineDescription}>
                {t('nosotros.timeline.t1973.desc')}
              </p>
            </div>
          </div>

          <div className={styles.timelineConnector}></div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineYear}>2000</div>
            <div className={styles.timelineDot}>
              <div className={styles.timelineDotInner}></div>
            </div>
            <div className={styles.timelineContent}>
              <h4 className={styles.timelineTitle}>{t('nosotros.timeline.t2000.title')}</h4>
              <p className={styles.timelineDescription}>
                {t('nosotros.timeline.t2000.desc')}
              </p>
            </div>
          </div>

          <div className={styles.timelineConnector}></div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineYear}>{t('nosotros.timeline.present.year')}</div>
            <div className={styles.timelineDot}>
              <div className={styles.timelineDotInner}></div>
            </div>
            <div className={styles.timelineContent}>
              <h4 className={styles.timelineTitle}>{t('nosotros.timeline.present.title')}</h4>
              <p className={styles.timelineDescription}>
                {t('nosotros.timeline.present.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* SECTORES DE ESPECIALIZACIÓN */}
        <div ref={sectoresRef} className={styles.sectores}>
          <div className={styles.sectionHeader}>
            <Briefcase className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{t('nosotros.sectors.title')}</h2>
          </div>

          <div className={styles.sectoresGrid}>
            <div className={styles.sectorCard}>
              <Home className={styles.sectorIcon} />
              <h3 className={styles.sectorTitle}>{t('nosotros.sectors.housing.title')}</h3>
              <p className={styles.sectorDescription}>
                {t('nosotros.sectors.housing.desc')}
              </p>
            </div>

            <div className={styles.sectorCard}>
              <Briefcase className={styles.sectorIcon} />
              <h3 className={styles.sectorTitle}>{t('nosotros.sectors.offices.title')}</h3>
              <p className={styles.sectorDescription}>
                {t('nosotros.sectors.offices.desc')}
              </p>
            </div>

            <div className={styles.sectorCard}>
              <ShoppingBag className={styles.sectorIcon} />
              <h3 className={styles.sectorTitle}>{t('nosotros.sectors.commercial.title')}</h3>
              <p className={styles.sectorDescription}>
                {t('nosotros.sectors.commercial.desc')}
              </p>
            </div>

            <div className={styles.sectorCard}>
              <School className={styles.sectorIcon} />
              <h3 className={styles.sectorTitle}>{t('nosotros.sectors.institutional.title')}</h3>
              <p className={styles.sectorDescription}>
                {t('nosotros.sectors.institutional.desc')}
              </p>
            </div>

            <div className={styles.sectorCard}>
              <Factory className={styles.sectorIcon} />
              <h3 className={styles.sectorTitle}>{t('nosotros.sectors.industrial.title')}</h3>
              <p className={styles.sectorDescription}>
                {t('nosotros.sectors.industrial.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN MISIÓN Y VISIÓN */}
        <div className={styles.misionVision}>
          <div ref={misionRef} className={styles.misionCard}>
            <div className={styles.cardHeader}>
              <Target className={styles.cardHeaderIcon} />
              <h3 className={styles.cardTitle}>{t('nosotros.mission_vision.mission.title')}</h3>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                {t('nosotros.mission_vision.mission.text')}
              </p>
              <div className={styles.cardHighlight}>
                <CheckCircle className={styles.highlightIcon} />
                <span>{t('nosotros.mission_vision.mission.h1')}</span>
              </div>
              <div className={styles.cardHighlight}>
                <Users className={styles.highlightIcon} />
                <span>{t('nosotros.mission_vision.mission.h2')}</span>
              </div>
            </div>
          </div>

          <div ref={visionRef} className={styles.visionCard}>
            <div className={styles.cardHeader}>
              <Eye className={styles.cardHeaderIcon} />
              <h3 className={styles.cardTitle}>{t('nosotros.mission_vision.vision.title')}</h3>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                {t('nosotros.mission_vision.vision.text')}
              </p>
              <div className={styles.cardHighlight}>
                <TrendingUp className={styles.highlightIcon} />
                <span>{t('nosotros.mission_vision.vision.h1')}</span>
              </div>
              <div className={styles.cardHighlight}>
                <Users className={styles.highlightIcon} />
                <span>{t('nosotros.mission_vision.vision.h2')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* VALORES CORPORATIVOS */}
        <div ref={valoresRef} className={styles.valores}>
          <div className={styles.sectionHeader}>
            <Award className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{t('nosotros.values.title')}</h2>
          </div>

          <div className={styles.valoresGrid}>
            <div className={styles.valorCard}>
              <Award className={styles.valorIcon} />
              <h3 className={styles.valorTitle}>{t('nosotros.values.quality.title')}</h3>
              <p className={styles.valorDescription}>
                {t('nosotros.values.quality.desc')}
              </p>
            </div>

            <div className={styles.valorCard}>
              <Clock className={styles.valorIcon} />
              <h3 className={styles.valorTitle}>{t('nosotros.values.responsibility.title')}</h3>
              <p className={styles.valorDescription}>
                {t('nosotros.values.responsibility.desc')}
              </p>
            </div>

            <div className={styles.valorCard}>
              <Leaf className={styles.valorIcon} />
              <h3 className={styles.valorTitle}>{t('nosotros.values.sustainability.title')}</h3>
              <p className={styles.valorDescription}>
                {t('nosotros.values.sustainability.desc')}
              </p>
            </div>

            <div className={styles.valorCard}>
              <MessageSquare className={styles.valorIcon} />
              <h3 className={styles.valorTitle}>{t('nosotros.values.communication.title')}</h3>
              <p className={styles.valorDescription}>
                {t('nosotros.values.communication.desc')}
              </p>
            </div>

            <div className={styles.valorCard}>
              <Lightbulb className={styles.valorIcon} />
              <h3 className={styles.valorTitle}>{t('nosotros.values.innovation.title')}</h3>
              <p className={styles.valorDescription}>
                {t('nosotros.values.innovation.desc')}
              </p>
            </div>

            <div className={styles.valorCard}>
              <Users className={styles.valorIcon} />
              <h3 className={styles.valorTitle}>{t('nosotros.values.customer.title')}</h3>
              <p className={styles.valorDescription}>
                {t('nosotros.values.customer.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* OBJETO SOCIAL */}
        <div className={styles.objetoSocial}>
          <div className={styles.sectionHeader}>
            <Target className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>{t('nosotros.social.title')}</h2>
          </div>

          <div className={styles.objetoContent}>
            <p className={styles.objetoText}>
              {t('nosotros.social.text')}
            </p>

            <div className={styles.objetoHighlight}>
              <div className={styles.highlightIconWrapper}>
                <Award className={styles.highlightIconMain} />
              </div>
              <p className={styles.highlightText}>
                "{t('nosotros.social.highlight')}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
