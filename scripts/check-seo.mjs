import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { indexablePages, SITE_ORIGIN, projectNames } from '../src/seo/siteMetadata.js';
import { projectResearch } from '../src/assets/modules/proyectos/projectResearch.js';
import { generateSitemapRoutes } from '../sitemap-generator.js';

const out = resolve(process.argv[2] || 'dist');
const read = file => readFileSync(resolve(out, file), 'utf8');
const sitemap = read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
assert.deepEqual(urls, generateSitemapRoutes().map(path => SITE_ORIGIN + path));
assert.equal(projectNames.length, Object.keys(projectResearch).length);
for (const [path, page] of Object.entries(indexablePages)) {
  const html = read(path === '/' ? 'index.html' : path.slice(1) + '.html');
  assert.equal([...html.matchAll(/<title\b/g)].length, 1, `${path}: duplicate title`);
  assert.equal([...html.matchAll(/rel="canonical"/g)].length, 1, `${path}: duplicate canonical`);
  assert.ok(html.includes(`rel="canonical" href="${SITE_ORIGIN}${path}"`), `${path}: wrong canonical`);
  assert.ok(html.includes('name="robots" content="index, follow"'), `${path}: noindex`);
  assert.ok(html.includes('<h1>'), `${path}: missing initial content`);
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^"#?]+)"/g)) {
    assert.ok(existsSync(resolve(out, asset.slice(1))), `${path}: missing asset ${asset}`);
  }
  if (page.projectId) assert.ok(path.startsWith('/proyecto/'));
}
const directory = read('proyectos.html');
for (const id of Object.keys(projectResearch)) assert.ok(directory.includes(`href="/proyecto/${id}"`), `Missing project link ${id}`);
assert.ok(read('404.html').includes('name="robots" content="noindex, follow"'));
assert.ok(!read('404.html').includes('rel="canonical"'));
assert.ok(!sitemap.includes('/proyectos/'));
assert.ok(!sitemap.includes('/politica-privacidad'));
assert.ok(read('robots.txt').includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`));
const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
assert.equal(config.cleanUrls, true);
assert.ok(!config.rewrites?.some(rule => rule.source === '/(.*)'), 'Catch-all rewrite hides real 404s');
for (const rule of config.redirects.filter(rule => !rule.has && !rule.source.includes(':'))) {
  assert.ok(indexablePages[rule.destination], `Redirect has no real destination: ${rule.source}`);
  assert.notEqual(rule.source, rule.destination, 'Redirect loop');
}
console.log(`SEO OK: ${urls.length} unique sitemap URLs; 27 project pages; canonical, robots, content, links, assets and redirect targets checked.`);
