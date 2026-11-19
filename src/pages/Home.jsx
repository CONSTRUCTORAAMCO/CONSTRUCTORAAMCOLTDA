import Reveal from "../assets/components/animation/Reveal";
import HeroVideo from "../assets/modules/home/home";
import Historialproyectos from "../assets/modules/historialproyectos/Historialproyectos";
import Services from "../assets/modules/services/Services";
import Entrecalleshome from "../assets/modules/entrecalleshome/Entrecalleshome";
import Objetivo from "../assets/modules/objetivo/Objetivo";
import Valores from "../assets/modules/valores/Valores";
 
const Home = () => {
 
  return (
    <>

      <HeroVideo />
      <Reveal><Historialproyectos /></Reveal>
      <Reveal><Services /></Reveal>
      <Reveal><Entrecalleshome /></Reveal>
      <Reveal><Objetivo /></Reveal>
      <Valores />
    </>
  );
};

export default Home;
