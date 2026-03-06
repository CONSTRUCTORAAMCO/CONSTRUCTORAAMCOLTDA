import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";
import HeroVideo from "../assets/modules/home/home";
import Historialproyectos from "../assets/modules/historialproyectos/Historialproyectos";
import Services from "../assets/modules/services/Services";
import Entrecalleshome from "../assets/modules/entrecalleshome/Entrecalleshome";
import Objetivo from "../assets/modules/objetivo/Objetivo";
import Valores from "../assets/modules/valores/Valores";
 
const Home = () => {
  const { t } = useLanguage();
 
  return (
    <>
      <Helmet>
        <title>{t('home.meta_title')}</title>
        <meta name="description" content={t('home.meta_description')} />
        <link rel="canonical" href="https://www.amcoltda.com/" />
      </Helmet>

      <HeroVideo />
      <Historialproyectos />
      <Services />
      <Entrecalleshome />
      <Objetivo />
      <Valores />
    </>
  );
};

export default Home;
