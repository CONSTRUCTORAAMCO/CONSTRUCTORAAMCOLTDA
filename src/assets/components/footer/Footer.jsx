import styles from "./Footer.module.css";
import { RiMailLine, RiMapPinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageContext";
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>

      {/* Parte superior */}
      <div className={styles.top}>

        {/* Branding */}
        <div className={styles.brand}>
          <h2 className={styles.logo}>AMCO</h2>

          <p className={styles.item}>
            <RiMapPinLine size={18} />
            <span>
              Edificio Business Center 93 - Oficina 403 - Cra 16 #93a - 36, Bogotá D.C
            </span>
          </p>

          <p className={styles.item}>
            <RiMailLine size={18} />
            <span>constructoraamcoltda@gmail.com</span>
          </p>
        </div>
        <br />

        {/* Redes / navegación */}
        <div className={styles.socials}>
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/Nosotros">{t("nav.about")}</Link>
          <Link to="/Proyectos">{t("nav.projects")}</Link>
          <Link to="/entrecalles">{t("nav.entrecalles")}</Link>
          <Link to="/contacto">{t("nav.contact")}</Link>
        </div>
      </div>

      <hr className={styles.line} />

      {/* Parte inferior */}
      <div className={styles.bottom}>
        <span>© 2026 CONSTRUCTORA AMCO LTDA. {t("footer.rights")}</span>

        <div className={styles.legal}>
          <Link to="/Tyc">{t("footer.terms")}</Link>
          <Link to="/Politicaprivacidad">{t("footer.privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
