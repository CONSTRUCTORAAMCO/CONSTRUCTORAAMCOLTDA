import { useNavigate } from "react-router-dom";
import {
  Calendar, MapPin, Cpu, Home, ShieldCheck, Leaf, Lightbulb, Award,
  Building2, Compass, Sparkles, BadgeCheck, Quote, ArrowRight, Landmark
} from "lucide-react";
import Reveal from "../../components/animation/Reveal";
import { useLanguage } from "../../../i18n/LanguageContext";
import styles from "./LamcoUsa.module.css";

import imgHero from "../../img/lamco/lamco-hero.jpg";
import imgFachada from "../../img/lamco/rathburn-fachada.jpg";
import imgPiscina from "../../img/lamco/rathburn-piscina.jpg";
import imgCocina from "../../img/lamco/interior-cocina.jpg";
import imgSala from "../../img/lamco/interior-sala.jpg";
import imgAlcoba from "../../img/lamco/interior-alcoba.jpg";

const statIcons = [Calendar, MapPin, Cpu];
const valueIcons = [ShieldCheck, Leaf, Lightbulb, Award];
const featureIcons = [Compass, Sparkles, BadgeCheck];
const galleryImages = [imgCocina, imgSala, imgAlcoba];

export default function LamcoUsa() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const list = (key) => {
    const value = t(key);
    return Array.isArray(value) ? value : [];
  };

  const scrollToProject = () => {
    document.getElementById("lamco-proyecto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.lamco}>
      {/* ===== HERO ===== */}
      <div className={styles.hero}>
        <img src={imgHero} alt="" className={styles.heroImage} fetchPriority="high" />
        <div className={styles.heroShade} />
        <Reveal className={styles.heroContent}>
          <span className={styles.heroKicker}>{t("lamco.hero.kicker")}</span>
          <h1 className={styles.brandMark} aria-label="LAMCO USA">
            <span className={styles.brandL}>L</span>
            <span className={styles.brandAmco}>AMCO</span>
            <span className={styles.brandUsa}>USA</span>
          </h1>
          <p className={styles.heroSubtitle}>{t("lamco.hero.subtitle")}</p>
          <p className={styles.heroText}>{t("lamco.hero.text")}</p>
          <button type="button" className={styles.heroButton} onClick={scrollToProject}>
            {t("lamco.hero.cta")} <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>

      <div className={styles.container}>
        {/* ===== STATS ===== */}
        <Reveal className={styles.statsBar}>
          {list("lamco.stats").map((stat, i) => {
            const Icon = statIcons[i] || Calendar;
            return (
              <div key={stat.label} className={styles.statItem}>
                <Icon className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </Reveal>

        {/* ===== EXPANSIÓN ===== */}
        <div className={styles.split}>
          <Reveal className={styles.splitText}>
            <div className={styles.sectionHeader}>
              <Home className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>{t("lamco.expansion.title")}</h2>
            </div>
            <p className={styles.paragraph}>{t("lamco.expansion.p1")}</p>
            <p className={styles.paragraph}>{t("lamco.expansion.p2")}</p>
            <div className={styles.tags}>
              {list("lamco.expansion.locations").map((loc) => (
                <span key={loc} className={styles.tag}>
                  <MapPin size={14} /> {loc}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className={styles.splitMedia}>
            <img src={imgFachada} alt={t("lamco.expansion.imageAlt")} loading="lazy" />
          </Reveal>
        </div>

        {/* ===== MISIÓN (Brand Manual) ===== */}
        <Reveal className={styles.mission}>
          <span className={styles.kicker}>{t("lamco.mission.kicker")}</span>
          <p className={styles.missionText}>{t("lamco.mission.text")}</p>
        </Reveal>

        <div className={styles.valuesGrid}>
          {list("lamco.mission.values").map((value, i) => {
            const Icon = valueIcons[i] || Award;
            return (
              <Reveal key={value.title} delay={i * 0.08} interactive className={styles.valueCard}>
                <Icon className={styles.valueIcon} />
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ===== LEGADO, DISEÑO Y BIENESTAR (banda oscura) ===== */}
      <div className={styles.darkBand}>
        <div className={styles.container}>
          <Reveal className={styles.darkHeader}>
            <span className={styles.kickerLight}>{t("lamco.legacy.kicker")}</span>
            <h2 className={styles.darkTitle}>{t("lamco.legacy.title")}</h2>
            <p className={styles.darkText}>{t("lamco.legacy.text")}</p>
            <div className={styles.pillars}>
              {list("lamco.legacy.pillars").map((pillar) => (
                <span key={pillar} className={styles.pillar}>{pillar}</span>
              ))}
            </div>
          </Reveal>

          <div className={styles.gallery}>
            {list("lamco.legacy.gallery").map((label, i) => (
              <Reveal key={label} delay={i * 0.1} className={styles.galleryItem}>
                <img src={galleryImages[i]} alt={label} loading="lazy" />
                <span className={styles.galleryLabel}>{label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* ===== PROYECTO DESTACADO ===== */}
        <div id="lamco-proyecto" className={styles.project}>
          <Reveal className={styles.projectHeader}>
            <span className={styles.kicker}>{t("lamco.project.kicker")}</span>
            <h2 className={styles.projectTitle}>{t("lamco.project.title")}</h2>
            <p className={styles.projectAddress}>
              <MapPin size={18} />
              <strong>{t("lamco.project.address")}</strong>
              <span>— {t("lamco.project.city")}</span>
            </p>
          </Reveal>

          <div className={styles.projectGrid}>
            <Reveal className={styles.projectImageMain}>
              <img src={imgFachada} alt={t("lamco.project.imageAlt1")} loading="lazy" />
            </Reveal>
            <Reveal delay={0.1} className={styles.projectImageSide}>
              <img src={imgPiscina} alt={t("lamco.project.imageAlt2")} loading="lazy" />
            </Reveal>
          </div>

          <div className={styles.features}>
            {list("lamco.project.features").map((feature, i) => {
              const Icon = featureIcons[i] || BadgeCheck;
              return (
                <Reveal key={feature} delay={i * 0.08} className={styles.feature}>
                  <span className={styles.featureIconWrap}><Icon className={styles.featureIcon} /></span>
                  <span className={styles.featureLabel}>{feature}</span>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ===== INGENIERÍA + TRAYECTORIA ===== */}
        <div className={styles.cards}>
          <Reveal interactive className={styles.infoCard}>
            <div className={styles.infoHeader}>
              <div className={styles.infoLogo}><Cpu className={styles.infoIcon} /></div>
              <h3 className={styles.infoTitle}>{t("lamco.engineering.title")}</h3>
            </div>
            <p className={styles.infoText}>{t("lamco.engineering.text")}</p>
            <div className={styles.tags}>
              <span className={styles.tag}>BIM</span>
            </div>
          </Reveal>

          <Reveal delay={0.1} interactive className={styles.infoCard}>
            <div className={styles.infoHeader}>
              <div className={styles.infoLogo}><Building2 className={styles.infoIcon} /></div>
              <div>
                <span className={styles.infoBadge}>
                  <Calendar size={14} /> {t("lamco.trajectory.kicker")}
                </span>
                <h3 className={styles.infoTitle}>{t("lamco.trajectory.title")}</h3>
              </div>
            </div>
            <p className={styles.infoText}>{t("lamco.trajectory.text")}</p>
            <div className={styles.tags}>
              {list("lamco.trajectory.sectors").map((sector) => (
                <span key={sector} className={styles.tag}>{sector}</span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ===== PORTAFOLIO COLOMBIA ===== */}
        <div className={styles.portfolio}>
          <Reveal className={styles.sectionHeader}>
            <Landmark className={styles.sectionIcon} />
            <div>
              <span className={styles.kicker}>{t("lamco.portfolio.kicker")}</span>
              <h2 className={styles.sectionTitle}>{t("lamco.portfolio.title")}</h2>
            </div>
          </Reveal>

          <div className={styles.portfolioGrid}>
            {list("lamco.portfolio.items").map((item, i) => (
              <Reveal key={item.name} delay={(i % 4) * 0.06} interactive className={styles.portfolioCard}>
                <span className={styles.portfolioPlace}>
                  <MapPin size={14} /> {item.place}
                </span>
                <h3 className={styles.portfolioName}>{item.name}</h3>
                {item.status && <span className={styles.portfolioStatus}>{item.status}</span>}
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===== IDENTIDAD DE MARCA ===== */}
        <Reveal className={styles.brand}>
          <div className={styles.brandInner}>
            <Quote className={styles.brandQuoteIcon} />
            <span className={styles.kicker}>{t("lamco.brand.kicker")}</span>
            <p className={styles.brandQuote}>“{t("lamco.brand.quote")}”</p>
            <p className={styles.brandText}>{t("lamco.brand.text")}</p>
          </div>
        </Reveal>

        {/* ===== CTA ===== */}
        <Reveal className={styles.cta}>
          <h2 className={styles.ctaTitle}>{t("lamco.cta.title")}</h2>
          <button type="button" className={styles.ctaButton} onClick={() => navigate("/contacto")}>
            {t("lamco.cta.button")} <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
