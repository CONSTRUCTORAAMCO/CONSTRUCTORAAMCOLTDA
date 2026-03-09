import { proyectos } from './src/assets/modules/vistasproyectos/vistaproyectos.data.js';

/**
 * Genera una lista de todas las rutas del sitio para el sitemap.
 * @returns {string[]} Un array de rutas.
 */
export function generateSitemapRoutes() {
  // Rutas estáticas principales de la aplicación
  const staticRoutes = [
    '/',
    '/nosotros',
    '/proyectos',
    '/entrecalles',
    '/contacto',
    '/politica-privacidad', // Ruta inferida para la política de privacidad
    '/terminos-y-condiciones', // Ruta inferida para los términos y condiciones
  ];

  // Genera rutas dinámicas para cada proyecto a partir de tus datos
  const dynamicProjectRoutes = proyectos.map(proyecto => `/proyectos/${proyecto.id}`);

  // Combina y devuelve todas las rutas
  return [...staticRoutes, ...dynamicProjectRoutes];
}