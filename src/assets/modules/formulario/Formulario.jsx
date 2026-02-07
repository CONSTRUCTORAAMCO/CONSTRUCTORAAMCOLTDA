import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Formulario.module.css";
import { Link } from "react-router-dom";
import {
  RiMailLine,
  RiPhoneLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri"
import { Building2 } from "lucide-react";
import { useLanguage } from "../../../i18n/LanguageContext";

const Formulario = () => {
  const formRef = useRef();
  const [estado, setEstado] = useState("");
  const [mostrarToast, setMostrarToast] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [messageError, setMessageError] = useState("");
  const mainTitleRef = useRef(null);
  const statsRef = useRef(null);

  const { t } = useLanguage();

  // Función de validación de email (adaptada para React)
  const validarEmailEstricto = (email) => {
    const emailTrimmed = email.trim().toLowerCase();

    if (!emailTrimmed) {
      return t('formulario.errors.email_required');
    }

    const partes = emailTrimmed.split('@');

    if (partes.length !== 2) {
      return t('formulario.errors.email_invalid');
    }

    const [usuario, dominio] = partes;

    if (!usuario || usuario.length === 0) return t('formulario.errors.email_invalid');

    const usuarioValido = /^[a-zA-Z0-9._%+-]+$/.test(usuario);
    if (!usuarioValido) return t('formulario.errors.email_invalid');

    if (usuario.startsWith('.') || usuario.endsWith('.')) return t('formulario.errors.email_invalid');
    if (usuario.includes('..')) return t('formulario.errors.email_invalid');

    if (!dominio || dominio.length === 0) return t('formulario.errors.email_invalid');
    if (!dominio.includes('.')) return t('formulario.errors.email_invalid');

    const partesDominio = dominio.split('.');

    if (partesDominio.length < 2) return t('formulario.errors.email_invalid');

    for (let i = 0; i < partesDominio.length; i++) {
      const parte = partesDominio[i];
      if (!parte || parte.length === 0) return t('formulario.errors.email_invalid');
      if (parte.startsWith('-') || parte.endsWith('-')) return t('formulario.errors.email_invalid');
      if (!/^[a-zA-Z0-9-]+$/.test(parte)) return t('formulario.errors.email_invalid');
    }

    const tld = partesDominio[partesDominio.length - 1];
    if (tld.length < 2) return t('formulario.errors.email_invalid');
    if (!/^[a-zA-Z]+$/.test(tld)) return t('formulario.errors.email_invalid');

    if (usuario.length > 64) return t('formulario.errors.email_invalid');
    if (dominio.length > 255) return t('formulario.errors.email_invalid');

    const emailRegex = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(emailTrimmed)) {
      return t('formulario.errors.email_invalid');
    }

    return "";
  };

  const handleEmailBlur = (e) => {
    const email = e.target.value;
    const error = validarEmailEstricto(email);
    setEmailError(error);
    if (!error) {
      e.target.value = email.trim().toLowerCase();
    }
  };

  const handleEmailChange = (e) => {
    if (emailError) {
      setEmailError("");
    }
    if (e.target.value.length > 320) {
      e.target.value = e.target.value.substring(0, 320);
    }
  };

  const enviarEmail = (e) => {
    e.preventDefault();

    const nameInput = formRef.current.querySelector('input[name="user_name"]');
    const nameValue = nameInput.value.trim();
    if (!nameValue) {
      setNameError(t('formulario.errors.name_required'));
      nameInput.focus();
      return;
    }

    const emailInput = formRef.current.querySelector('input[name="user_email"]');
    const emailErrorFound = validarEmailEstricto(emailInput.value);

    if (emailErrorFound) {
      setEmailError(emailErrorFound);
      emailInput.focus();
      return;
    }

    const messageInput = formRef.current.querySelector('textarea[name="message"]');
    const messageValue = messageInput.value.trim();
    if (!messageValue) {
      setMessageError(t('formulario.errors.message_required'));
      messageInput.focus();
      return;
    }

    setEstado("enviando");

    emailjs
      .sendForm(
        "service_n6t9pup",
        "template_u3cv9tb",
        formRef.current,
        "2u_-aq9Wcg1Kw68dn"
      )
      .then(
        () => {
          setEstado("enviado");
          setMostrarToast(true);
          formRef.current.reset();
          setEmailError("");
          setNameError("");
          setMessageError("");
        },
        () => {
          setEstado("error");
          setMostrarToast(true);
        }
      );
  };

  useEffect(() => {
    if (mostrarToast) {
      const timer = setTimeout(() => {
        setMostrarToast(false);
        setEstado("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [mostrarToast]);

  useEffect(() => {
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

    if (mainTitleRef.current) observer.observe(mainTitleRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => {
      if (mainTitleRef.current) observer.unobserve(mainTitleRef.current);
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.companyLogo}>
            <Building2 size={64} className={styles.logoIcon} />
            <div className={styles.companyName}>
              <h1 className={styles.companyMainName}>{t('formulario.hero_title')}</h1>
              <p className={styles.companySubtitle}>{t('formulario.company_subtitle')}</p>
            </div>
          </div>
          <h2 ref={mainTitleRef} className={styles.heroTitle}>
            {t('formulario.hero_slogan')}
          </h2>
          <p className={styles.heroSubtitle}>
            {t('formulario.hero_subslogan')}
          </p>
        </div>
      </div>

      {/* STATS BAR */}
      <div ref={statsRef} className={styles.statsBar}>
        <div className={styles.messageBox}>
          <p className={styles.legalText}>
            {t('formulario.legal')}{" "}
            <Link to="/politicaprivacidad" className={styles.legalLink}>
              {t('formulario.privacy')}
            </Link> {" "}
            {t('formulario.and')}{" "}
            <Link to="/tyc" className={styles.legalLink}>
              {t('formulario.tyc')}
            </Link>.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.container}>
          {/* IZQUIERDA - FORMULARIO */}
          <div className={styles.formBox}>
            <br />
            <h1 style={{ textAlign: "center" }}>
              <strong>{t('formulario.contact_us')}</strong>
            </h1>

            <p style={{ textAlign: "center" }}>
              {t('formulario.tell_us')}
            </p>

            <form ref={formRef} onSubmit={enviarEmail} noValidate>
              <div className={styles.emailContainer}>
                <input
                  type="text"
                  name="user_name"
                  placeholder={t('formulario.placeholders.name')}
                  maxLength={50}
                  pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                  title={t('formulario.errors.name_invalid')}
                  required
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
                    if (nameError) setNameError("");
                  }}
                  className={nameError ? styles.inputError : ""}
                />
                {nameError && (
                  <div className={styles.errorMessage}>
                    {nameError}
                  </div>
                )}
              </div>

              <div className={styles.emailContainer}>
                <input
                  type="email"
                  name="user_email"
                  placeholder={t('formulario.placeholders.email')}
                  required
                  title={t('formulario.errors.email_invalid')}
                  onBlur={handleEmailBlur}
                  onChange={handleEmailChange}
                  className={emailError ? styles.inputError : ""}
                />
                {emailError && (
                  <div className={styles.errorMessage}>
                    {emailError}
                  </div>
                )}
              </div>

              <div className={styles.emailContainer}>
                <textarea
                  name="message"
                  placeholder={t('formulario.placeholders.message')}
                  rows="5"
                  required
                  className={messageError ? styles.inputError : ""}
                  onChange={() => {
                    if (messageError) setMessageError("");
                  }}
                />
                {messageError && (
                  <div className={styles.errorMessage}>
                    {messageError}
                  </div>
                )}
              </div>

              <button type="submit">
                {estado === "enviando" ? t('formulario.buttons.sending') : t('formulario.buttons.send')}
              </button>
            </form>
          </div>

          {/* DERECHA - INFO */}
          <div className={styles.infoBox}>
            <div className={styles.contactoHorizontal}>
              <div className={styles.cardHorizontal}>
                <h3>
                  {t('formulario.info.email')} <RiMailLine size={18} />
                </h3>
                <p>constructoraamcoltda@gmail.com</p>
              </div>

              <div className={styles.cardHorizontal}>
                <h3>
                  {t('formulario.info.phone')} <RiPhoneLine size={18} />
                </h3>
                <p>+57 300 123 4567</p>
              </div>
            </div>

            <div className={styles.mapCard}>
              <iframe
                title="Ubicación Constructora AMCO"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d-74.0519526!3d4.6786749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a931ebe1a1d%3A0x1d267cdfe5b0e062!2sBusiness%20center%2093!5e0!3m2!1ses-419!2sco!4v1768488991782"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {mostrarToast && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in w-[90vw] max-w-[220px]">
            <div className="relative overflow-hidden rounded-lg bg-gray-200 text-black px-6 py-8 shadow-xl">
              <div className="flex items-start gap-4 text-base">
                <div className="text-xl mt-1">
                  {estado === "enviado" ? <RiCheckLine /> : <RiCloseLine />}
                </div>

                <div className="flex-1">
                  <span className="font-medium block">
                    {estado === "enviado" ? t('formulario.toast.sent') : t('formulario.toast.error')}
                  </span>
                  <p className="text-sm text-gray-600 mt-2">
                    {estado === "enviado"
                      ? t('formulario.toast.success_msg')
                      : t('formulario.toast.error_msg')}
                  </p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="absolute bottom-0 left-0 h-[4px] w-full bg-black/20">
                <div className={`h-full bg-black ${styles.toastProgress}`} />
              </div>
            </div>
          </div>
        )}

      </section>
    </>
  );
};

export default Formulario;