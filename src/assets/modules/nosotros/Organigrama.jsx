import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Network, X, ArrowRight, ExternalLink } from "lucide-react";
import Reveal from "../../components/animation/Reveal";
import { useLanguage } from "../../../i18n/LanguageContext";
import styles from "./Organigrama.module.css";

import logoAmco from "../../img/AMCO.png";
import logoAmr from "../../img/organigrama/logo-amr.jpg";
import logoEntrecalles from "../../img/organigrama/logo-entrecalles.png";
import logoIsPowering from "../../img/organigrama/logo-ispowering.jpg";

import alfredoRoaThumb from "../../img/organigrama/alfredo-munoz-roa-thumb.jpg";
import alfredoRoaPhoto from "../../img/organigrama/alfredo-munoz-roa.jpg";
import alfredoRodThumb from "../../img/organigrama/alfredo-munoz-rodriguez-thumb.jpg";
import alfredoRodPhoto from "../../img/organigrama/alfredo-munoz-rodriguez.jpg";
import juanEstebanThumb from "../../img/organigrama/juan-esteban-munoz-thumb.jpg";
import juanEstebanPhoto from "../../img/organigrama/juan-esteban-munoz.jpg";
import helenaThumb from "../../img/organigrama/helena-munoz-thumb.jpg";
import helenaPhoto from "../../img/organigrama/helena-munoz.jpg";
import juanCarlosThumb from "../../img/organigrama/juan-carlos-salmon-thumb.jpg";
import juanCarlosPhoto from "../../img/organigrama/juan-carlos-salmon.jpg";
import omarThumb from "../../img/organigrama/omar-patino-thumb.jpg";
import omarPhoto from "../../img/organigrama/omar-patino.jpg";
import lawrenceThumb from "../../img/organigrama/lawrence-selevan-thumb.jpg";
import lawrencePhoto from "../../img/organigrama/lawrence-selevan.jpg";
import behrThumb from "../../img/organigrama/behr-champana-thumb.jpg";
import behrPhoto from "../../img/organigrama/behr-champana.jpg";

const AMR_URL = "https://amr.com.co";
const MotionDiv = motion.div;

const PEOPLE = {
  alfredoRoa: { thumb: alfredoRoaThumb, photo: alfredoRoaPhoto, company: "amco" },
  alfredoRodriguez: { thumb: alfredoRodThumb, photo: alfredoRodPhoto, company: "amr" },
  juanEsteban: { thumb: juanEstebanThumb, photo: juanEstebanPhoto, company: "amr" },
  helena: { thumb: helenaThumb, photo: helenaPhoto, company: "lamco" },
  juanCarlos: { thumb: juanCarlosThumb, photo: juanCarlosPhoto, company: "lamco" },
  omar: { thumb: omarThumb, photo: omarPhoto, company: "ispowering" },
  lawrence: { thumb: lawrenceThumb, photo: lawrencePhoto, company: "chesterfield" },
  behr: { thumb: behrThumb, photo: behrPhoto, company: "quantum" }
};

/* ---------- Nodos ---------- */

function CompanyNode({ id, logo, text, dim }) {
  const { t } = useLanguage();
  const label = t(`organigrama.companies.${id}`);
  return (
    <div className={styles.company}>
      <div className={styles.companyCircle}>
        {logo ? (
          <img src={logo} alt={label} className={`${styles.companyLogo} ${dim ? styles.dim : ""}`} loading="lazy" />
        ) : (
          <span className={styles.companyText}>{text || label}</span>
        )}
      </div>
      <span className={styles.companyLabel}>{label}</span>
    </div>
  );
}

function PersonNode({ id, onOpen, featured }) {
  const { t } = useLanguage();
  const person = PEOPLE[id];
  return (
    <button
      type="button"
      className={`${styles.person} ${featured ? styles.personFeatured : ""}`}
      onClick={() => onOpen(id)}
      aria-label={`${t(`organigrama.people.${id}.name`)} — ${t("organigrama.hint")}`}
    >
      <span className={styles.avatar}>
        <img src={person.thumb} alt="" loading="lazy" />
        <span className={styles.avatarHint}>{t("organigrama.hint")}</span>
      </span>
      <span className={styles.personName}>{t(`organigrama.people.${id}.name`)}</span>
      <span className={styles.personRole}>{t(`organigrama.people.${id}.role`)}</span>
    </button>
  );
}

const Line = () => <span className={styles.vline} aria-hidden="true" />;

/* ---------- Modal ---------- */

function PersonModal({ id, onClose }) {
  const { t } = useLanguage();
  const person = id ? PEOPLE[id] : null;

  useEffect(() => {
    if (!id) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [id, onClose]);

  return (
    <AnimatePresence>
      {person && (
        <MotionDiv
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <MotionDiv
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="org-person-name"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className={styles.modalClose} onClick={onClose} aria-label={t("organigrama.close")}>
              <X size={20} />
            </button>
            <div className={styles.modalPhoto}>
              <img src={person.photo} alt={t(`organigrama.people.${id}.name`)} />
            </div>
            <div className={styles.modalBody}>
              <span className={styles.modalCompany}>{t(`organigrama.companies.${person.company}`)}</span>
              <h3 id="org-person-name" className={styles.modalName}>{t(`organigrama.people.${id}.name`)}</h3>
              <span className={styles.modalRole}>{t(`organigrama.people.${id}.role`)}</span>
              <p className={styles.modalTitle}>{t(`organigrama.people.${id}.title`)}</p>
              <p className={styles.modalDesc}>{t(`organigrama.people.${id}.desc`)}</p>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}

/* ---------- Organigrama ---------- */

export default function Organigrama() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <div className={styles.section}>
      <Reveal className={styles.header}>
        <div className={styles.titleRow}>
          <Network className={styles.titleIcon} />
          <h2 className={styles.title}>{t("organigrama.title")}</h2>
        </div>
        <p className={styles.subtitle}>{t("organigrama.subtitle")}</p>
      </Reveal>

      <Reveal className={styles.tree}>
        {/* Nivel 0: empresas matriz */}
        <div className={styles.row}>
          <CompanyNode id="amco" logo={logoAmco} />
          <CompanyNode id="ventures" logo={logoAmco} dim />
        </div>
        <Line />

        {/* Nivel 1: Presidente */}
        <PersonNode id="alfredoRoa" onOpen={setSelected} featured />

        {/* Nivel 2–3: AMR y LAMCO */}
        <div className={`${styles.branch} ${styles.branchMain}`}>
          <div className={styles.col}>
            <CompanyNode id="amr" logo={logoAmr} />
            <div className={styles.branch}>
              <div className={styles.col}><PersonNode id="alfredoRodriguez" onOpen={setSelected} /></div>
              <div className={styles.col}><PersonNode id="juanEsteban" onOpen={setSelected} /></div>
            </div>
          </div>
          <div className={styles.col}>
            <CompanyNode id="lamco" logo={logoAmco} />
            <div className={styles.branch}>
              <div className={styles.col}><PersonNode id="helena" onOpen={setSelected} /></div>
              <div className={styles.col}><PersonNode id="juanCarlos" onOpen={setSelected} /></div>
            </div>
          </div>
        </div>

        {/* Nivel 4: Torre Entrecalles */}
        <Line />
        <CompanyNode id="entrecalles" logo={logoEntrecalles} />

        {/* Nivel 5–6: aliados */}
        <div className={`${styles.branch} ${styles.branchThree}`}>
          <div className={styles.col}>
            <CompanyNode id="ispowering" logo={logoIsPowering} />
            <Line />
            <PersonNode id="omar" onOpen={setSelected} />
          </div>
          <div className={styles.col}>
            <CompanyNode id="chesterfield" text="CHESTERFIELD FARING LTDA" />
            <Line />
            <PersonNode id="lawrence" onOpen={setSelected} />
          </div>
          <div className={styles.col}>
            <CompanyNode id="quantum" text="Quantum-AIP" />
            <Line />
            <PersonNode id="behr" onOpen={setSelected} />
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.actions}>
        <button type="button" className={styles.btnPrimary} onClick={() => navigate("/lamco-usa")}>
          {t("organigrama.goLamco")} <ArrowRight size={18} />
        </button>
        <a className={styles.btnSecondary} href={AMR_URL} target="_blank" rel="noopener noreferrer">
          {t("organigrama.goAmr")} <ExternalLink size={18} />
        </a>
      </Reveal>

      <PersonModal id={selected} onClose={closeModal} />
    </div>
  );
}
