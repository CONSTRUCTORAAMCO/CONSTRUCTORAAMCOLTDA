// No podemos importar `proyectos` directamente desde `vistaproyectos.data.js`
// porque ese archivo importa imágenes (.jpg, .png), y Node.js no puede procesar
// esos archivos cuando lee la configuración de Vite (`vite.config.js`).
// Esto causa el error "No loader is configured for...".
//
// La solución es definir aquí solo los datos que el sitemap necesita (los IDs de los proyectos).
//
// ¡IMPORTANTE! Si agregas o eliminas un proyecto en `vistaproyectos.data.js`,
// debes actualizar también esta lista para que el sitemap se genere correctamente.
const proyectos = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 },
  { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 },
  { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 },
  { id: 26 }, { id: 27 }
];

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