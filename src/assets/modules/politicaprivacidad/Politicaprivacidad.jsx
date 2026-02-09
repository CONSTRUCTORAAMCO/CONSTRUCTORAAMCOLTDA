import React from "react";
import styles from "./Politicaprivacidad.module.css";
import { useLanguage } from "../../../i18n/LanguageContext";

const Politicaprivacidad = () => {
  const { t } = useLanguage();
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>{t('politicaprivacidad.title')}</h1>
        <h2>{t('politicaprivacidad.subtitle')}</h2>
      </header>

      <section className={styles.section}>
        <div dangerouslySetInnerHTML={{ __html: t('politicaprivacidad.intro_1') }} />
        <p>
          {t('politicaprivacidad.intro_2')}
        </p>
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.1.title')}</strong></h3>
        <p>{t('politicaprivacidad.sections.1.content')}</p>
        <ul>
          {t('politicaprivacidad.sections.1.list', { returnObjects: true })?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t('politicaprivacidad.sections.1.footer')}</p>
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.2.title')}</strong></h3>
        <ul>
          {t('politicaprivacidad.sections.2.list', { returnObjects: true })?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t('politicaprivacidad.sections.2.footer')}</p>
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.3.title')}</strong></h3>
        <ul>
          {t('politicaprivacidad.sections.3.list', { returnObjects: true })?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t('politicaprivacidad.sections.3.footer')}</p>
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.4.title')}</strong></h3>
        {t('politicaprivacidad.sections.4.content', { returnObjects: true })?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.5.title')}</strong></h3>
        <p>{t('politicaprivacidad.sections.5.content')}</p>
        <ul>
          {t('politicaprivacidad.sections.5.list', { returnObjects: true })?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t('politicaprivacidad.sections.5.footer')}</p>
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.6.title')}</strong></h3>
        <ul>
          {t('politicaprivacidad.sections.6.list', { returnObjects: true })?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.7.title')}</strong></h3>
        <p>{t('politicaprivacidad.sections.7.content')}</p>
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.8.title')}</strong></h3>
        <p>{t('politicaprivacidad.sections.8.content')}</p>
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.9.title')}</strong></h3>
        <p>{t('politicaprivacidad.sections.9.content')}</p>
      </section>

      <section className={styles.section}>
        <h3><strong>{t('politicaprivacidad.sections.10.title')}</strong></h3>
        <p>{t('politicaprivacidad.sections.10.content')}</p>
      </section>
    </main>
  );
};

export default Politicaprivacidad;
