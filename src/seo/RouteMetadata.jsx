import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getPageMetadata, SITE_ORIGIN } from './siteMetadata';
import { useLanguage } from '../i18n/LanguageContext';
import { localized, projectResearch } from '../assets/modules/proyectos/projectResearch';

const translationKeys = {
  '/': ['home.meta_title', 'home.meta_description'],
  '/nosotros': ['nosotros.meta.title', 'nosotros.meta.description'],
  '/entrecalles': ['entrecalles.meta.title', 'entrecalles.meta.description'],
  '/lamco-usa': ['lamco.meta.title', 'lamco.meta.description'],
  '/contacto': ['formulario.meta.title', 'formulario.meta.description'],
};

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const { language, t } = useLanguage();
  const path = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const page = getPageMetadata(path);
  const keys = translationKeys[path];
  const translated = (key, fallback) => key && t(key) !== key ? t(key) : fallback;
  const title = translated(keys?.[0], page.title);
  const description = page.projectId
    ? localized(projectResearch[page.projectId].summary, language)
    : translated(keys?.[1], page.description);
  return <Helmet>
    <html lang={language.toLowerCase()} />
    <title>{title}</title>
    <meta name="description" content={description.slice(0, 165)} />
    <meta name="robots" content={page.noindex ? 'noindex, follow' : 'index, follow'} />
    {!page.noindex && <link rel="canonical" href={SITE_ORIGIN + path} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description.slice(0, 165)} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={SITE_ORIGIN + path} />
  </Helmet>;
}
