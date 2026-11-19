import { projectResearch } from './projectResearch';

// Adaptador del catálogo: los datos documentados se mantienen en una sola fuente.
export const detalles = Object.fromEntries(
 Object.entries(projectResearch).map(([id, p]) => [id, { descripcion: p.summary.ES, entidad: p.facts?.client }]),
);
