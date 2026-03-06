import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";
import NosotrosModule from "../assets/modules/nosotros/Nosotros";

const Nosotros = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('nosotros.meta.title')}</title>
        <meta name="description" content={t('nosotros.meta.description')} />
        <link rel="canonical" href="https://www.amcoltda.com/nosotros" />
      </Helmet>
      <NosotrosModule />
    </>
  );
};

export default Nosotros;
