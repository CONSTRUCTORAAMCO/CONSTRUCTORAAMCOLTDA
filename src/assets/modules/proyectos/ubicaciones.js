import { projectResearch } from './projectResearch';
export const departamentoDe = {
 'Bogotá': 'Bogotá', 'Soacha': 'Cundinamarca', 'Cali': 'Valle del Cauca',
 'Valledupar': 'Cesar', 'Yopal': 'Casanare', 'Manizales': 'Caldas',
 'Armenia': 'Quindío', 'Leticia': 'Amazonas', 'Barranquilla': 'Atlántico',
 'Sabanas de San Ángel': 'Magdalena',
};
// No se publican coordenadas aproximadas.
export const ubicaciones = Object.fromEntries(
 Object.entries(projectResearch).filter(([, p]) => p.map).map(([id, p]) => [id, { direccion: p.map.address || null, referencia: p.map.reference || false }]),
);
