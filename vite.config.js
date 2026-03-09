import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import { generateSitemapRoutes } from './sitemap-generator.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://www.amcoltda.com', // ¡Importante! Asegúrate de que este sea tu dominio principal.
      dynamicRoutes: generateSitemapRoutes(),
      // Opcional pero recomendado: generar un archivo robots.txt
      robots: [
        {
          userAgent: '*',
          allow: '/',
          // Indica a los bots dónde encontrar tu sitemap
          sitemap: 'https://www.amcoltda.com/sitemap.xml',
        },
      ],
    }),
  ],
})
