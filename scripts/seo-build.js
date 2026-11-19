import { indexablePages, getPageMetadata, SITE_ORIGIN } from '../src/seo/siteMetadata.js';
import { projectResearch } from '../src/assets/modules/proyectos/projectResearch.js';

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Static entry documents share the same React bundle. Real files let the host
// return 404 for unknown URLs, and supply metadata before JavaScript executes.
export function seoBuild() {
  return {
    name: 'amco-static-seo',
    enforce: 'post',
    generateBundle(_, bundle) {
      const entry = bundle['index.html'];
      if (!entry || entry.type !== 'asset') throw new Error('Missing Vite HTML entry');
      const template = String(entry.source);
      const render = (path, page) => {
        let html = template
          .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
          .replace(/<meta\b[^>]*(?:name=["'](?:description|robots)["']|property=["']og:[^"']+["'])[^>]*>/gi, '')
          .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '');
        const url = SITE_ORIGIN + path;
        const metadata = `<title data-amco-seo>${escape(page.title)}</title>
<meta data-amco-seo name="description" content="${escape(page.description.slice(0, 165))}" />
<meta data-amco-seo name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow'}" />
${page.noindex ? '' : `<link data-amco-seo rel="canonical" href="${url}" />`}
<meta data-amco-seo property="og:title" content="${escape(page.title)}" />
<meta data-amco-seo property="og:description" content="${escape(page.description.slice(0, 165))}" />
<meta data-amco-seo property="og:type" content="website" />
<meta data-amco-seo property="og:url" content="${url}" />`;
        html = html.replace('</head>', metadata + '\n</head>');
        // A useful, visible initial document, replaced by the interactive React
        // page. Project copy comes from the same data as the interactive view.
        const research = projectResearch[page.projectId];
        const links = Object.entries(indexablePages).filter(([route]) => path === '/proyectos' || !route.startsWith('/proyecto/'));
        const initial = `<main style="max-width:1100px;margin:120px auto;padding:24px;color:#192125;background:white"><h1>${escape(page.heading)}</h1><p>${escape(page.description)}</p>${research?.scope ? `<ul>${research.scope.map(item => `<li>${escape(item.ES)}</li>`).join('')}</ul>` : ''}<nav aria-label="Páginas de AMCO"><ul>${links.map(([route, meta]) => `<li><a href="${route}">${escape(meta.heading)}</a></li>`).join('')}</ul></nav></main>`;
        return html.replace('<div id="root"></div>', `<div id="root">${initial}</div>`);
      };
      for (const [path, page] of Object.entries(indexablePages)) {
        const html = render(path, page);
        if (path === '/') entry.source = html;
        else this.emitFile({ type: 'asset', fileName: `${path.slice(1)}.html`, source: html });
      }
      // Keep historical footer URLs accessible with the lowercase canonical.
      // Separate files avoid redirects that differ only in letter case.
      for (const [alias, path] of Object.entries({ Nosotros: '/nosotros', Proyectos: '/proyectos', Tyc: '/tyc', Politicaprivacidad: '/politicaprivacidad' })) {
        this.emitFile({ type: 'asset', fileName: `${alias}.html`, source: render(path, indexablePages[path]) });
      }
      this.emitFile({ type: 'asset', fileName: '404.html', source: render('/404', getPageMetadata('/404')) });
      // Prototypes remain accessible, outside the search index and sitemap.
      this.emitFile({ type: 'asset', fileName: 'prototipos.html', source: render('/prototipos', { title: 'Prototipos | AMCO', heading: 'Prototipos', description: 'Prototipos de Constructora AMCO.', noindex: true }) });
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(indexablePages).map(path => `  <url><loc>${SITE_ORIGIN}${path}</loc></url>`).join('\n')}\n</urlset>\n`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n` });
    },
  };
}
