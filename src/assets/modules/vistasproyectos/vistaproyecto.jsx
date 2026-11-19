import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, MapPin, X, Expand } from 'lucide-react';
import FechaEntrega from '../proyectos/FechaEntrega';
import { proyectos } from './vistaproyectos.data';
import { proyectos as directory } from '../proyectos/dataProyectos';
import { projectResearch, projectMapUrl, detailLabels, localized } from '../proyectos/projectResearch';
import { useLanguage } from '../../../i18n/LanguageContext';
import styles from './VistaProyecto.module.css';

export default function VistaProyecto() {
  const { id } = useParams();
  const { language } = useLanguage();
  const labels = detailLabels[language] || detailLabels.ES;
  const dialog = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const proyecto = proyectos.find(p => String(p.id) === id);
  const listing = directory.find(p => String(p.id) === id);
  const research = projectResearch[id];

  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  useEffect(() => {
    if (!selectedImg || !dialog.current) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [selectedImg]);

  if (!proyecto || !research) return <main className={styles.page}><div className={styles.container}><h1>{labels.notFound}</h1><Link to="/proyectos">{labels.back}</Link></div></main>;
  const title = research.title || listing?.nombre || proyecto.title;
  const summary = localized(research.summary, language);
  const mapUrl = projectMapUrl(id);
  const photos = [...new Set([proyecto.image, ...(proyecto.content || []).map(item => item.image)].filter(Boolean))];
  const facts = { location: research.city || listing?.ubicacion, ...research.facts, ...(research.map?.address ? { address: research.map.address } : {}) };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link to="/proyectos" className={styles.back}><ArrowLeft size={17} />{labels.back}</Link>
        <header className={styles.header}>
          <div><p className={styles.eyebrow}>{labels.eyebrow} / {String(id).padStart(2, '0')}</p><h1>{title}</h1></div>
          <FechaEntrega id={id} />
        </header>
        <div className={styles.hero}>
          <button className={styles.cover} onClick={() => setSelectedImg(proyecto.image)} aria-label={`${labels.enlarge}: ${title}`}>
            <img src={proyecto.image} alt={title} fetchPriority="high" />
            <span className={styles.zoom}><Expand size={19} aria-hidden="true" /></span>
          </button>
          <aside className={styles.facts} aria-labelledby="project-facts">
            <p className={styles.eyebrow}>AMCO / {String(id).padStart(2, '0')}</p>
            <h2 id="project-facts">{labels.facts}</h2>
            <dl>{Object.entries(facts).filter(([, value]) => value).map(([key, value]) => <div key={key}><dt>{labels[key]}</dt><dd>{localized(value, language)}</dd></div>)}</dl>
            {mapUrl && <><a className={styles.map} href={mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={18} />{labels.map}<ArrowUpRight size={17} /></a>{research.map.reference && <p className={styles.note}>{labels.reference}</p>}</>}
          </aside>
        </div>
        <div className={styles.editorial}>
          <section><p className={styles.eyebrow}>01 / {labels.overview}</p><h2>{title}</h2><p className={styles.summary}>{summary}</p>
            {research.scope?.length > 0 && <><h3>{labels.scope}</h3><ul className={styles.scope}>{research.scope.map((item, index) => <li key={index}>{localized(item, language)}</li>)}</ul></>}
          </section>
          <aside className={styles.milestone}><h3>{labels.milestone}</h3><FechaEntrega id={id} />{research.date ? <a href={research.date.url} target="_blank" rel="noopener noreferrer">{labels.sources}<ArrowUpRight size={15} /></a> : <p>{labels.unknown}</p>}</aside>
        </div>
        {photos.length > 1 && <section className={styles.gallerySection}><div className={styles.sectionHeading}><p className={styles.eyebrow}>02 / {labels.gallery}</p><span>{String(photos.length).padStart(2, '0')}</span></div><div className={styles.gallery}>{photos.map((src, index) => <button key={src} onClick={() => setSelectedImg(src)} aria-label={`${labels.enlarge} ${index + 1}: ${title}`}><img src={src} alt={`${title} · ${index + 1}`} loading="lazy" /><span className={styles.zoom}><Expand size={18} /></span></button>)}</div></section>}
        {proyecto.video && <section className={styles.video}><h2>{labels.video}</h2><iframe src={proyecto.video} title={`${labels.video}: ${title}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></section>}
        {research.sources.length > 0 && <section className={styles.sources}><h2>{labels.sources}</h2><ul>{research.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ArrowUpRight size={16} /></a></li>)}</ul></section>}
      </div>
      {selectedImg && <dialog ref={dialog} className={styles.lightbox} aria-label={title} onClose={() => setSelectedImg(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}><button className={styles.close} aria-label={labels.close} onClick={() => dialog.current.close()} autoFocus><X size={24} /></button><img src={selectedImg} alt={title} /></dialog>}
    </main>
  );
}
