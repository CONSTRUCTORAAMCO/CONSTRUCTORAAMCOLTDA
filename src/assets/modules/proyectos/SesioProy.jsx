import FechaEntrega from "./FechaEntrega";
import Reveal from "../../components/animation/Reveal";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { proyectos } from './dataProyectos';
import { ubicaciones, departamentoDe } from './ubicaciones';
import { projectResearch, projectMapUrl, localized } from './projectResearch';
import { useLanguage } from '../../../i18n/LanguageContext';
import styles from './Proyectos.module.css';
import Select from 'react-select';
import { MapPin, ArrowUpRight, SearchX, Building2 } from 'lucide-react';

// Proyectos enriquecidos
const proyectosFull = proyectos.map((p) => ({
  ...p,
  nombre: projectResearch[p.id]?.title || p.nombre,
  ubicacion: projectResearch[p.id]?.city || p.ubicacion,
  departamento: departamentoDe[projectResearch[p.id]?.city || p.ubicacion] || null,
  direccion: ubicaciones[p.id]?.direccion || null,
  lat: ubicaciones[p.id]?.lat,
  lng: ubicaciones[p.id]?.lng,
  sinUbicacion: !p.ubicacion || p.ubicacion === 'Por definir',
}));

const mostrarEntidad = proyectosFull.every((p) => p.entidad);
const mostrarDato = proyectosFull.every((p) => p.dato);

const unicos = (arr) => [...new Set(arr.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
const normalizarNombre = (nombre) =>
  String(nombre || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+d\.?c\.?$/, '')
    .trim();
const unicosPorNombre = (nombres) => {
  const vistos = new Set();
  return nombres.filter((nombre) => {
    const clave = normalizarNombre(nombre);
    if (!clave || vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  }).sort((a, b) => a.localeCompare(b, 'es'));
};
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);

const todosLosDepartamentos = { value: 'todos', label: 'Todos los departamentos' };
const todasLasCiudades = { value: 'todas', label: 'Todas las ciudades' };
const departamentosLocales = unicos(proyectosFull.map((p) => p.departamento)).map((nombre) => ({
  value: nombre,
  label: nombre,
}));
const ciudadesLocales = unicosPorNombre(
  proyectosFull.filter((p) => !p.sinUbicacion).map((p) => p.ubicacion)
);
const categoriasBase = [
  { value: 'todas', label: 'Todas las categorías' },
  ...unicos(proyectosFull.map((p) => p.categoria)).map((c) => ({ value: c, label: cap(c) })),
];

// Estilos PREMIUM de react-select
const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 44,
    borderRadius: 12,
    borderColor: state.isFocused ? '#f59e0b' : 'transparent',
    boxShadow: state.isFocused ? '0 0 0 4px rgba(245,158,11,.15)' : 'none',
    backgroundColor: state.isFocused ? '#ffffff' : '#f8fafc',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': { backgroundColor: '#f1f5f9' },
  }),
  valueContainer: (base) => ({ ...base, padding: '2px 12px' }),
  singleValue: (base) => ({ ...base, color: '#0f172a', fontWeight: 600, fontSize: 14 }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, color: '#94a3b8', paddingRight: 12 }),
  menu: (base) => ({
    ...base,
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    boxShadow: '0 14px 28px -12px rgba(15,23,42,.28)',
    marginTop: 5,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 160,
    padding: 5,
  }),
  menuPortal: (base) => ({ ...base, zIndex: 1000 }),
  option: (base, state) => ({
    ...base,
    fontSize: 13,
    minHeight: 32,
    padding: '7px 10px',
    margin: '2px 0',
    borderRadius: 8,
    cursor: 'pointer',
    color: state.isSelected ? '#0f172a' : '#475569',
    fontWeight: state.isSelected ? 700 : 500,
    backgroundColor: state.isSelected ? '#fde68a' : state.isFocused ? '#fff7ed' : '#fff',
    transition: 'background-color 0.15s ease',
  }),
};

const dosLineas = { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' };

const urlMapa = (p) => projectMapUrl(p.id);

const Flecha = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
    <path d={dir === 'izq' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
  </svg>
);

const paginasVisibles = (actual, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const base = [...new Set([1, total, actual - 1, actual, actual + 1])]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const salida = [];
  base.forEach((n, i) => {
    if (i > 0 && n - base[i - 1] > 1) salida.push('…');
    salida.push(n);
  });
  return salida;
};

const SesioProy = () => {
  const { t, language } = useLanguage();
  const departamentoPredeterminado = useMemo(
    () => ({ ...todosLosDepartamentos, label: t('proyectos.directory.filters.all_departments') }),
    [t]
  );
  const ciudadPredeterminada = useMemo(
    () => ({ ...todasLasCiudades, label: t('proyectos.directory.filters.all_cities') }),
    [t]
  );
  const [paginaActual, setPaginaActual] = useState(1);
  const [departamentosApi, setDepartamentosApi] = useState([]);
  const [ciudadesApi, setCiudadesApi] = useState([]);
  const [cargandoUbicaciones, setCargandoUbicaciones] = useState(true);
  const [errorUbicaciones, setErrorUbicaciones] = useState('');
  const [departamento, setDepartamento] = useState(departamentoPredeterminado);
  const [ciudad, setCiudad] = useState(ciudadPredeterminada);
  const [categoria, setCategoria] = useState(categoriasBase[0]);
  const galeriaRef = useRef(null);
  const tarjetasRef = useRef(null);
  const proyectosPorPagina = 9;

  useEffect(() => {
    const controller = new AbortController();

    const cargarEndpoint = async (recurso) => {
      const response = await fetch(`https://api-colombia.com/api/v1/${recurso}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`La API respondió con estado ${response.status} al cargar ${recurso}.`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error(`La respuesta de ${recurso} no tiene el formato esperado.`);
      return data;
    };

    const cargarUbicaciones = async () => {
      try {
        const [departamentos, ciudades] = await Promise.all([
          cargarEndpoint('Department'),
          cargarEndpoint('City'),
        ]);
        setDepartamentosApi(departamentos.filter((item) => item?.id && item?.name));
        setCiudadesApi(ciudades.filter((item) => item?.name && item?.departmentId));
      } catch (error) {
        if (error.name === 'AbortError') return;
        setErrorUbicaciones(
          true
        );
      } finally {
        if (!controller.signal.aborted) setCargandoUbicaciones(false);
      }
    };

    cargarUbicaciones();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const reiniciarVista = () => {
      setPaginaActual(1);
      window.scrollTo(0, 0);
    };

    window.addEventListener('pageshow', reiniciarVista);
    window.addEventListener('popstate', reiniciarVista);
    return () => {
      window.removeEventListener('pageshow', reiniciarVista);
      window.removeEventListener('popstate', reiniciarVista);
    };
  }, []);

  const opcionesDepartamentos = useMemo(
    () => [
      departamentoPredeterminado,
      ...(departamentosApi.length
        ? departamentosApi.map((item) => ({ value: item.name, label: item.name, id: item.id }))
        : departamentosLocales),
    ],
    [departamentosApi, departamentoPredeterminado]
  );

  const opcionesCategorias = useMemo(
    () =>
      categoriasBase.map((opcion) => ({
        ...opcion,
        label:
          opcion.value === 'todas'
            ? t('proyectos.directory.filters.all_categories')
            : t(`proyectos.directory.category.${opcion.value}`),
      })),
    [t]
  );

  const opcionesCiudades = useMemo(() => {
    const ciudadesDelDepartamento = ciudadesApi
      .filter((item) => departamento.value === 'todos' || String(item.departmentId) === String(departamento.id))
      .map((item) => item.name);
    const ciudadesDeProyectos = proyectosFull
      .filter((proyecto) => !proyecto.sinUbicacion && (departamento.value === 'todos' || proyecto.departamento === departamento.label))
      .map((proyecto) => proyecto.ubicacion);
    const ciudades = unicosPorNombre([...ciudadesDeProyectos, ...ciudadesDelDepartamento, ...(!ciudadesApi.length ? ciudadesLocales : [])])
      .map((nombre) => ({ value: nombre, label: nombre }));

    return [{ ...todasLasCiudades, label: t('proyectos.directory.filters.all_cities') }, ...ciudades];
  }, [ciudadesApi, departamento, t]);

  const filtrados = useMemo(
    () =>
      proyectosFull.filter((p) => {
        if (departamento.value !== 'todos' && p.departamento !== departamento.label) return false;
        if (ciudad.value !== 'todas' && normalizarNombre(p.ubicacion) !== normalizarNombre(ciudad.value)) return false;
        if (categoria.value !== 'todas' && p.categoria !== categoria.value) return false;
        return true;
      }),
    [departamento, ciudad, categoria]
  );

  const totalPaginas = Math.ceil(filtrados.length / proyectosPorPagina);
  const inicio = (paginaActual - 1) * proyectosPorPagina;
  const proyectosActuales = filtrados.slice(inicio, inicio + proyectosPorPagina);
  const idsProyectosActuales = proyectosActuales.map((proyecto) => proyecto.id).join(',');
  const hayFiltros = departamento.value !== 'todos' || ciudad.value !== 'todas' || categoria.value !== 'todas';

  const totalUbicaciones = ciudadesLocales.length;
  const totalCategorias = categoriasBase.length - 1;

  useEffect(() => {
    const tarjetas = tarjetasRef.current?.querySelectorAll('[data-project-card]');
    if (!tarjetas?.length) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      tarjetas.forEach((tarjeta) => tarjeta.classList.remove('project-card-pending'));
      return undefined;
    }

    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      (entradas, observador) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.remove('project-card-pending');
          if (!reducirMovimiento) {
            entrada.target.classList.add('project-card-enter');
            entrada.target.addEventListener('animationend', () => entrada.target.classList.remove('project-card-enter'), { once: true });
          }
          observador.unobserve(entrada.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    tarjetas.forEach((tarjeta) => {
      tarjeta.classList.remove('project-card-enter');
      tarjeta.classList.add('project-card-pending');
      observer.observe(tarjeta);
    });

    return () => observer.disconnect();
  }, [idsProyectosActuales]);

  const irAPagina = (n) => {
    setPaginaActual(n);
    galeriaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cambiar = (setter, opcionPredeterminada) => (op) => {
    setter(op || opcionPredeterminada);
    setPaginaActual(1);
  };

  const cambiarDepartamento = (opcion) => {
    setDepartamento(opcion || departamentoPredeterminado);
    setCiudad(ciudadPredeterminada);
    setPaginaActual(1);
  };

  const limpiar = () => {
    setDepartamento(departamentoPredeterminado);
    setCiudad(ciudadPredeterminada);
    setCategoria(categoriasBase[0]);
    setPaginaActual(1);
  };

  const stats = [
    { n: proyectos.length, key: 'projects' },
    { n: totalUbicaciones, key: 'cities' },
    { n: totalCategorias, key: 'business_lines' },
  ].filter((s) => s.n > 0);

  return (
    <div className="!w-full !min-h-screen !bg-slate-50 !pb-24 !flex !flex-col !font-sans !overflow-x-hidden">
      <section className={styles.heroSection} aria-labelledby="projects-title">
        <div className={styles.heroOverlay} aria-hidden="true" />
        <Reveal className={styles.heroContent}>
          <div className={styles.companyLogo}>
            <Building2 size={64} className={styles.logoIcon} aria-hidden="true" />
            <div className={styles.companyName}>
              <h1 id="projects-title" className={styles.companyMainName}>{t('nav.projects')}</h1>
              <p className={styles.companySubtitle}>CONSTRUCTORA AMCO LTDA</p>
            </div>
          </div>
          <h2 className={`${styles.heroTitle} ${styles.visible || ""}`}>{t('nosotros.hero.title')}</h2>
          <p className={styles.heroSubtitle}>{t('nosotros.hero.subtitle')}</p>
        </Reveal>
      </section>

      <main className="!w-full !max-w-[1360px] !mx-auto !px-4 sm:!px-6 lg:!px-8 !relative !z-20">
        {stats.length > 0 && (
          <Reveal as="dl" className={styles.statsBar} delay={0.15}>
            {stats.map((s) => (
              <div key={s.key} className={styles.statItem}>
                <dd className={styles.statNumber}>{s.n}</dd>
                <dt className={styles.statLabel}>{t('proyectos.directory.stats.' + s.key)}</dt>
              </div>
            ))}
          </Reveal>
        )}
        {/* FILTROS FLOTANTES RESPONSIVOS */}
        <div className="!w-full !bg-white/90 !backdrop-blur-2xl !rounded-[2rem] !shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] !p-5 sm:!p-6 md:!p-8 !mb-12 md:!mb-16 !border !border-white !ring-1 !ring-slate-100">
          <div className="!flex !flex-col md:!flex-row !gap-4 md:!gap-6">
            {[
              ['department', opcionesDepartamentos, departamento, cambiarDepartamento, departamentoPredeterminado],
              ['city', opcionesCiudades, ciudad, setCiudad, ciudadPredeterminada],
              ['category', opcionesCategorias, categoria, setCategoria, categoriasBase[0]],
            ].map(([label, opciones, valor, setter, opcionPredeterminada]) => (
              <div key={label} className="!flex-1 !min-w-0">
                <label className="!block !text-sm !font-bold !text-slate-700 !mb-2.5 !ml-1">{t(`proyectos.directory.filters.${label}`)}</label>
                <Select
                  options={opciones}
                  value={opciones.find((opcion) => opcion.value === valor.value) || valor}
                  onChange={cambiar(setter, opcionPredeterminada)}
                  isSearchable
                  isLoading={cargandoUbicaciones}
                  menuPlacement="bottom"
                  menuPosition="fixed"
                  menuPortalTarget={document.body}
                  maxMenuHeight={160}
                  menuShouldScrollIntoView={false}
                  styles={selectStyles}
                  placeholder={t('proyectos.directory.filters.select')}
                />
              </div>
            ))}
          </div>
          
          <div className="!flex !flex-col sm:!flex-row !items-center !justify-between !mt-6 !gap-4">
            <div className="!w-full sm:!w-auto !flex-1">
              {errorUbicaciones && (
                <p role="status" className="!text-xs sm:!text-sm !font-medium !text-red-500 !bg-red-50 !px-4 !py-2 !rounded-xl !block sm:!inline-block">
                  {t('proyectos.directory.locations_error')}
                </p>
              )}
            </div>
            {hayFiltros && (
              <button
                onClick={limpiar}
                className="!w-full sm:!w-auto !text-sm !font-bold !text-slate-600 hover:!text-slate-900 !bg-slate-100 hover:!bg-slate-200 !px-6 !py-3 !rounded-full !cursor-pointer !transition-colors !border-0"
              >
                {t('proyectos.directory.filters.clear')}
              </button>
            )}
          </div>
        </div>

        {/* TÍTULO DE SECCIÓN */}
        <div ref={galeriaRef} className="!w-full !flex !flex-col md:!flex-row !items-start md:!items-end !justify-between !mb-8 md:!mb-10 !scroll-mt-32 !gap-3">
          <div>
            <h2 className="!text-2xl sm:!text-3xl md:!text-4xl !font-extrabold !text-slate-900 !tracking-tight !mb-1 md:!mb-2">
              {t('proyectos.directory.gallery_title')}
            </h2>
            <p className="!text-slate-500 !text-base sm:!text-lg !font-medium">
              {t('proyectos.directory.showing')} <span className="!text-amber-600 !font-bold">{proyectosActuales.length}</span> {t('proyectos.directory.of')} {filtrados.length} {t('proyectos.directory.results')}
            </p>
          </div>
          <div className="!hidden md:!block !h-1.5 !w-16 !bg-amber-400 !rounded-full !mb-2" />
        </div>

        {/* GRILLA DE TARJETAS TIPO APP */}
        {proyectosActuales.length === 0 ? (
          <div className="!w-full !flex !flex-col !items-center !justify-center !bg-white !rounded-[2rem] !border !border-slate-100 !py-20 md:!py-32 !px-4 !text-center !shadow-sm">
            <div className="!w-16 !h-16 md:!w-20 md:!h-20 !bg-slate-50 !rounded-full !flex !items-center !justify-center !mb-6">
              <SearchX className="!w-8 !h-8 md:!w-10 md:!h-10 !text-slate-300" />
            </div>
            <p className="!text-xl md:!text-2xl !font-bold !text-slate-800 !mb-2">{t('proyectos.directory.empty_title')}</p>
            <p className="!text-sm md:!text-base !font-medium !text-slate-500">{t('proyectos.directory.empty_description')}</p>
          </div>
        ) : (
          <div ref={tarjetasRef} className="!w-full !grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-6 md:!gap-8">
            {proyectosActuales.map((proyecto) => {
              const categoriaKey = proyecto.categoria || 'featured';
              const categoriaTraducida = t(`proyectos.directory.category.${categoriaKey}`);
              const categoriaLabel =
                categoriaTraducida === `proyectos.directory.category.${categoriaKey}`
                  ? categoriaKey === 'featured'
                    ? t('proyectos.directory.featured')
                    : cap(categoriaKey)
                  : categoriaTraducida;
              const descripcionTraducida = localized(projectResearch[proyecto.id]?.summary, language);
              const etiquetaDato =
                proyecto.id === 4
                  ? t('proyectos.directory.data.daily_students')
                  : proyecto.dato?.etiqueta;
              return (
                <article
                  key={proyecto.id}
                  data-project-card
                  className="group !bg-white !rounded-[2rem] !p-2 !border !border-slate-100 !shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:!shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:!-translate-y-2 !transition-all !duration-500 motion-reduce:!transition-none !flex !flex-col !h-full"
                >
                  <div className="!relative !h-56 sm:!h-64 !rounded-[1.5rem] !overflow-hidden !bg-slate-100 !transform !translate-z-0">
                    <img
                      src={proyecto.image}
                      alt={proyecto.nombre}
                      loading="lazy"
                      decoding="async"
                      className="!w-full !h-full !object-cover group-hover:!scale-105 !transition-transform !duration-700 !ease-out motion-reduce:!transition-none"
                    />
                    <div className="!absolute !inset-0 !bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent !opacity-80" />

                    <span className="!absolute !top-4 !left-4 !bg-white/95 !backdrop-blur-md !text-slate-800 !text-[11px] sm:!text-xs !font-bold !px-3 sm:!px-4 !py-1.5 sm:!py-2 !rounded-full !shadow-sm">
                      {categoriaLabel}
                    </span>

                    {projectMapUrl(proyecto.id) && (
                      <a
                        href={urlMapa(proyecto)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('proyectos.directory.map_aria').replace('{name}', proyecto.nombre)}
                        title={t('proyectos.directory.map_title')}
                        className="!absolute !top-4 !right-4 !w-10 !h-10 sm:!w-12 sm:!h-12 !rounded-full !bg-white/20 hover:!bg-amber-400 !backdrop-blur-md !text-white hover:!text-slate-900 !flex !items-center !justify-center !transition-all !duration-300 motion-reduce:!transition-none focus-visible:!outline-none !border !border-white/30 hover:!border-amber-400"
                      >
                        <MapPin className="!w-4 !h-4 sm:!w-5 sm:!h-5" />
                      </a>
                    )}
                  </div>

                  <div className="!px-4 sm:!px-5 !pt-5 sm:!pt-6 !pb-4 sm:!pb-5 !flex !flex-col !flex-grow">
                    <div className="!mb-3"><FechaEntrega id={proyecto.id} /></div>
                    <h3 className="!text-lg sm:!text-xl !font-extrabold !text-slate-900 !leading-tight !mb-2 sm:!mb-3 !min-h-[3.5rem]" style={dosLineas}>
                      {proyecto.nombre}
                    </h3>

                    <p className="!text-xs sm:!text-sm !font-medium !text-slate-500 !leading-relaxed !mb-4 sm:!mb-5 !min-h-[2.75rem]" style={dosLineas}>
                      {descripcionTraducida}
                    </p>

                    {mostrarDato && proyecto.dato && (
                      <div className="!flex !items-center !gap-3 !bg-slate-50 !rounded-2xl !px-4 sm:!px-5 !py-2.5 sm:!py-3 !mb-4 sm:!mb-5">
                        <span className="!text-xl sm:!text-2xl !font-black !text-slate-900 !tabular-nums !tracking-tight">{proyecto.dato.valor}</span>
                        <span className="!text-[10px] sm:!text-xs !font-bold !text-slate-500 !uppercase !tracking-wide !leading-tight">
                          {etiquetaDato}
                        </span>
                      </div>
                    )}

                    {mostrarEntidad && proyecto.entidad && (
                      <div className="!flex !items-center !gap-2.5 !text-xs sm:!text-sm !font-semibold !text-slate-600 !mb-3 sm:!mb-4">
                        <Building2 className="!w-4 !h-4 !text-slate-400" />
                        {proyecto.entidad}
                      </div>
                    )}

                    {!projectMapUrl(proyecto.id) ? (
                      <span className="!inline-flex !items-center !gap-2 !text-slate-400 !mb-5 sm:!mb-6 !mt-auto !text-xs sm:!text-sm !font-semibold">
                        <MapPin className="!w-4 !h-4" /> {proyecto.ubicacion || t('proyectos.directory.location_undefined')}
                      </span>
                    ) : (
                      <a
                        href={urlMapa(proyecto)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!inline-flex !items-start !gap-2 !text-slate-600 hover:!text-amber-600 !transition-colors !mb-5 sm:!mb-6 !mt-auto !group/map"
                      >
                        <MapPin className="!w-4 !h-4 !mt-0.5 !text-amber-500 group-hover/map:!scale-110 !transition-transform" />
                        <span className="!text-xs sm:!text-sm !font-bold">{proyecto.ubicacion}</span>
                      </a>
                    )}

                    <Link
                      to={`/proyecto/${proyecto.id}`}
                      className="!w-full !flex !items-center !justify-between !p-3 sm:!p-4 !bg-slate-50 hover:!bg-amber-400 !rounded-2xl !text-slate-900 !font-bold !text-xs sm:!text-sm !cursor-pointer !transition-colors !duration-300 !border-0"
                    >
                      {t('proyectos.directory.explore')}
                      <span className="!w-7 !h-7 sm:!w-8 sm:!h-8 !rounded-full !bg-white !flex !items-center !justify-center !shadow-sm !overflow-hidden">
                        <ArrowUpRight className="!w-3 !h-3 sm:!w-4 sm:!h-4 !transition-transform !duration-300 group-hover:!translate-x-0.5 group-hover:!-translate-y-0.5" />
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* PAGINACIÓN MODERNA Y RESPONSIVA */}
        {totalPaginas > 1 && (
          <div className="!w-full !mt-12 sm:!mt-20 !pb-10 !flex !flex-col !items-center !gap-4">
            <nav aria-label="Paginación" className="!inline-flex !items-center !gap-1 sm:!gap-2 !p-1.5 sm:!p-2 !bg-white !rounded-full !shadow-[0_8px_30px_rgb(0,0,0,0.06)] !border !border-slate-100">
              <button
                onClick={() => irAPagina(Math.max(1, paginaActual - 1))}
                disabled={paginaActual === 1}
                aria-label={t('proyectos.directory.previous')}
                className="!h-9 sm:!h-11 !flex !items-center !gap-1 sm:!gap-2 !pl-3 sm:!pl-4 !pr-3 sm:!pr-5 !rounded-full !border-0 !bg-transparent !text-xs sm:!text-sm !font-bold !text-slate-600 hover:!bg-slate-50 hover:!text-slate-900 disabled:!opacity-30 disabled:!cursor-not-allowed !cursor-pointer !transition-colors"
              >
                <Flecha dir="izq" />
                <span className="!hidden md:!inline">{t('proyectos.directory.previous')}</span>
              </button>

              <div className="!flex !items-center !gap-1 !px-1 sm:!px-2 !border-x !border-slate-100">
                {paginasVisibles(paginaActual, totalPaginas).map((n, i) =>
                  n === '…' ? (
                    <span key={`p${i}`} className="!w-6 sm:!w-8 !text-center !text-slate-400 !font-bold !select-none">…</span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => irAPagina(n)}
                      aria-current={paginaActual === n ? 'page' : undefined}
                      className={`!w-9 !h-9 sm:!w-11 sm:!h-11 !rounded-full !border-0 !text-xs sm:!text-sm !font-bold !cursor-pointer !transition-all !duration-300 ${
                        paginaActual === n
                          ? '!bg-amber-400 !text-slate-900 !shadow-md !scale-105'
                          : '!bg-transparent !text-slate-600 hover:!bg-slate-100'
                      }`}
                    >
                      {n}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => irAPagina(Math.min(totalPaginas, paginaActual + 1))}
                disabled={paginaActual === totalPaginas}
                aria-label={t('proyectos.directory.next')}
                className="!h-9 sm:!h-11 !flex !items-center !gap-1 sm:!gap-2 !pl-3 sm:!pl-5 !pr-3 sm:!pr-4 !rounded-full !border-0 !bg-transparent !text-xs sm:!text-sm !font-bold !text-slate-600 hover:!bg-slate-50 hover:!text-slate-900 disabled:!opacity-30 disabled:!cursor-not-allowed !cursor-pointer !transition-colors"
              >
                <span className="!hidden md:!inline">{t('proyectos.directory.next')}</span>
                <Flecha dir="der" />
              </button>
            </nav>
            <p className="!text-xs sm:!text-sm !font-medium !text-slate-500">
              {t('proyectos.directory.page')} <span className="!text-slate-900 !font-bold">{paginaActual}</span> {t('proyectos.directory.of')} {totalPaginas}
            </p>
          </div>
        )}

        <details className="!mt-10 !border-t !border-slate-200 !pt-6"><summary className="!cursor-pointer !text-sm !font-semibold !text-slate-700">{language === 'EN' ? 'All project pages' : language === 'PT' ? 'Todas as páginas de projetos' : 'Todas las fichas de proyectos'}</summary><ul className="!mt-4 !grid sm:!grid-cols-2 lg:!grid-cols-3 !gap-3">{proyectosFull.map(project => <li key={project.id}><Link className="!text-sm !text-slate-600 hover:!underline" to={`/proyecto/${project.id}`}>{project.nombre}</Link></li>)}</ul></details>
      </main>
    </div>
  );
};

export default SesioProy;
