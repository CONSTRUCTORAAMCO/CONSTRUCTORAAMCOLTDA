import { indexablePages } from './src/seo/siteMetadata.js';

// Las rutas del sitemap y sus metadatos comparten una única configuración.
export function generateSitemapRoutes() { return Object.keys(indexablePages); }
