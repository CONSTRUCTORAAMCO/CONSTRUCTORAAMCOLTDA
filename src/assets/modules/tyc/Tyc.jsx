import React from "react";
import styles from "./Tyc.module.css";
import { useLanguage } from "../../../i18n/LanguageContext";

const TerminosCondiciones = () => {
  const { t } = useLanguage();

  const renderSection = (sectionKey) => {
    const section = t(`tyc.sections.${sectionKey}`, { returnObjects: true });

    // Si la traducción no es un objeto, no renderizar nada para evitar errores.
    if (typeof section !== 'object' || section === null) {
      return null;
    }

    return (
      <section key={sectionKey} className={styles.section}>
        {section.title && <h3 dangerouslySetInnerHTML={{ __html: section.title }} />}
        
        {/* Renderiza contenido principal (párrafo único o array de párrafos) */}
        {section.content && (
          Array.isArray(section.content)
            ? section.content.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)
            : <p dangerouslySetInnerHTML={{ __html: section.content }} />
        )}

        {/* Renderiza la lista si existe */}
        {section.list && (
          <ul>
            {Array.isArray(section.list) && section.list.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        )}

        {/* Renderiza el footer de la sección si existe */}
        {section.footer && <p dangerouslySetInnerHTML={{ __html: section.footer }} />}
      </section>
    );
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>{t('tyc.title')}</h1>
        <h2>{t('tyc.subtitle')}</h2>
      </header>
      {Object.keys(t('tyc.sections', { returnObjects: true }) || {}).sort((a, b) => a - b).map(key => renderSection(key))}
    </main>
  );
};

export default TerminosCondiciones;
