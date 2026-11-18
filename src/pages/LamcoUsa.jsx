import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";
import LamcoUsaModule from "../assets/modules/lamcousa/LamcoUsa";

const LamcoUsa = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("lamco.meta.title")}</title>
        <meta name="description" content={t("lamco.meta.description")} />
        <link rel="canonical" href="https://www.amcoltda.com/lamco-usa" />
      </Helmet>
      <LamcoUsaModule />
    </>
  );
};

export default LamcoUsa;
