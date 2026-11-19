import { projectResearch } from '../assets/modules/proyectos/projectResearch.js';

export const SITE_ORIGIN = 'https://www.amcoltda.com';
export const projectNames = [
  'Bodega Popular Corabastos', 'Cárcel de San Ángel', 'Centro Comercial Cedritos 151',
  'SENA Bronx', 'Nuevo Comando Policía Metropolitana', 'Universidad Distrital Bogotá',
  'Escuela de Aviación FAC Cali', 'Gobernación de Cundinamarca', 'Universidad Javeriana Gabriel Giraldo',
  'Universidad Libre Bogotá', 'Personería de Bogotá', 'SENA de Soacha',
  'Penitenciaría de Valledupar', 'Centro de Alto Rendimiento Gibraltar', 'Plataforma Base FAC',
  'Base aérea de Yopal', 'CDC Tibabuyes Suba', 'Dotación FAC Fase III',
  'Contraloría Manizales', 'Aeropuerto El Edén', 'Altamira', 'Acrópolis',
  'Torres de Granada', 'Novum', 'Medicina Aeroespacial CEMAE', 'Base Aérea Leticia', 'Centro Felicidad El Tunal',
];

export const staticPages = {
  '/': { title: 'Constructora AMCO | Más de 50 años construyendo en Colombia', heading: 'Constructora AMCO LTDA', description: 'Conoce la trayectoria de Constructora AMCO LTDA y su portafolio de proyectos de infraestructura, construcción institucional, comercial y residencial en Colombia.' },
  '/nosotros': { title: 'Nosotros | Constructora AMCO LTDA', heading: 'Nuestra trayectoria', description: 'Conoce la historia, el equipo y la experiencia de Constructora AMCO LTDA en el desarrollo de proyectos de construcción en Colombia.' },
  '/proyectos': { title: 'Proyectos de construcción | Constructora AMCO LTDA', heading: 'Nuestros proyectos', description: 'Explora el portafolio de AMCO: infraestructura educativa, institucional, aeroportuaria, comercial y residencial. Consulta fotografías, información y fuentes de cada proyecto.' },
  '/entrecalles': { title: 'Torre Esmeralda | Constructora AMCO LTDA', heading: 'Torre Esmeralda', description: 'Conoce Torre Esmeralda, proyecto de Constructora AMCO. Consulta su presentación, imágenes y canales de contacto para recibir información.' },
  '/lamco-usa': { title: 'LAMCO USA | Expansión residencial de AMCO', heading: 'LAMCO USA', description: 'Conoce LAMCO USA, la expansión residencial de AMCO en Estados Unidos. Explora sus proyectos de vivienda en Florida y nuestra identidad de marca.' },
  '/contacto': { title: 'Contacto | Constructora AMCO LTDA', heading: 'Contáctanos', description: 'Comunícate con Constructora AMCO LTDA: +57 3114672067 y administracion@amcoltda.com. Cuéntanos sobre tu proyecto o solicita información.' },
  '/politicaprivacidad': { title: 'Política de privacidad | Constructora AMCO LTDA', heading: 'Política de privacidad', description: 'Consulta la política de privacidad de Constructora AMCO LTDA, el tratamiento de datos personales y los canales para ejercer tus derechos.' },
  '/tyc': { title: 'Términos y condiciones | Constructora AMCO LTDA', heading: 'Términos y condiciones', description: 'Consulta los términos y condiciones de uso del sitio web de Constructora AMCO LTDA y la información sobre sus contenidos y servicios.' },
};

export const projectPages = Object.fromEntries(Object.entries(projectResearch).map(([id, project]) => {
  const name = project.title || projectNames[Number(id) - 1];
  return [`/proyecto/${id}`, { title: `${name} | Constructora AMCO`, heading: name, description: project.summary.ES, projectId: id }];
}));
export const indexablePages = { ...staticPages, ...projectPages };
export const getPageMetadata = (path) => indexablePages[path] || {
  title: 'Página no encontrada | Constructora AMCO', heading: 'Página no encontrada',
  description: 'La página solicitada no existe. Consulta el portafolio y los canales de contacto de Constructora AMCO.', noindex: true,
};
