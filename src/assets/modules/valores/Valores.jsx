import Reveal from "../../components/animation/Reveal";
import styles from "./Valores.module.css";
import { useLanguage } from "../../../i18n/LanguageContext";

const Valores = () => {
  const { t } = useLanguage();
  const valores = t('valores_home.items', { returnObjects: true }) || [];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <Reveal as="header" className={styles.header}>
          <span className={styles.kicker}>{t('valores_home.kicker')}</span>
          <h2>
            {t('valores_home.title')}
          </h2>
          <p>
            {t('valores_home.subtitle')}
          </p>
        </Reveal>

        {/* Grid */}
        <div className={styles.grid}>
          {valores.map((item, index) => (
            <Reveal as="article" key={index} className={styles.card} delay={index * 0.08} interactive>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Valores;
