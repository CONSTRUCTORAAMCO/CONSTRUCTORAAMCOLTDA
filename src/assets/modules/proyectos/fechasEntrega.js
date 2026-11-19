import { projectResearch } from './projectResearch';

// Solo hitos documentados; los proyectos sin fecha permanecen sin confirmar.
export const fechasEntrega = Object.fromEntries(
  Object.entries(projectResearch).map(([id, project]) => [id, project.date || null]),
);
