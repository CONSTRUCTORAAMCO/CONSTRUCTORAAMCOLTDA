// Departamento de cada ciudad (se usa para el filtro).
export const departamentoDe = {
  'Bogotá': 'Bogotá',
  'Soacha': 'Cundinamarca',
  'Cali': 'Valle del Cauca',
  'Valledupar': 'Cesar',
  'Yopal': 'Casanare',
  'Manizales': 'Caldas',
  'Armenia': 'Quindío',
  'Leticia': 'Amazonas',
  'Barranquilla': 'Atlántico' // Agregado para el proyecto 15 (Base FAC)
};

// Dirección y coordenadas exactas por id de proyecto. 
// Las coordenadas (lat, lng) aseguran que el pin caiga exactamente en el lote del proyecto.
export const ubicaciones = {
  1: { direccion: 'Corabastos, Avenida Carrera 80 # 2-51, Kennedy', lat: 4.636968, lng: -74.161821 },
  2: { direccion: 'Cárcel Distrital / Cárcel de San Ángel, Bogotá' }, // Mantenido genérico si es un proyecto privado específico
  3: { direccion: 'Barrio Cedritos, Usaquén, Bogotá', lat: 4.730330, lng: -74.032330 },
  4: { direccion: 'Bronx Distrito Creativo, Carrera 15 con Calle 9, Los Mártires', lat: 4.601910, lng: -74.082720 },
  5: { direccion: 'Nuevo Comando de Policía Metropolitana MEBOG, Carrera 56 # 22-04', lat: 4.633510, lng: -74.103040 },
  6: { direccion: 'Universidad Distrital Francisco José de Caldas, Sede Bosa, Calle 52 Sur # 93D-97', lat: 4.619850, lng: -74.183750 },
  7: { direccion: 'Escuela Militar de Aviación Marco Fidel Suárez (EMAVI), Carrera 8 # 58-67, Cali', lat: 3.460480, lng: -76.500210 },
  8: { direccion: 'Gobernación de Cundinamarca, Calle 26 # 51-53, Bogotá', lat: 4.643320, lng: -74.093410 },
  9: { direccion: 'Pontificia Universidad Javeriana, Carrera 7 # 40-62, Bogotá', lat: 4.628860, lng: -74.064510 },
  10: { direccion: 'Universidad Libre Sede Bosque Popular, Carrera 70 # 53-40, Bogotá', lat: 4.667230, lng: -74.094520 },
  11: { direccion: 'Personería de Bogotá, Carrera 7 # 21-24, Bogotá', lat: 4.608350, lng: -74.070680 },
  12: { direccion: 'SENA Sede Soacha, Calle 13 # 10-60, Soacha, Cundinamarca', lat: 4.580210, lng: -74.215540 },
  13: { direccion: 'Penitenciaría de Alta y Mediana Seguridad (La Tramacúa), Km 3 Vía al Batallón La Popa, Valledupar', lat: 10.457810, lng: -73.273010 },
  14: { direccion: 'Parque Metropolitano Gibraltar, Av. Ciudad de Cali con Calle 49 Sur, Bogotá', lat: 4.618640, lng: -74.184320 },
  15: { direccion: 'Comando Aéreo de Combate No. 3 (CACOM 3), Malambo, Atlántico', lat: 10.871140, lng: -74.776110 },
  16: { direccion: 'Yopal, Casanare, Colombia', lat: 5.337750, lng: -72.395860 },
  17: { direccion: 'Centro de Desarrollo Comunitario CDC Tibabuyes, Calle 139 # 127A - 48, Suba, Bogotá', lat: 4.743110, lng: -74.104230 },
  18: { direccion: 'Grupo Aéreo del Suroccidente (CACOM 7), Base Aérea, Cali', lat: 3.460480, lng: -76.500210 },
  19: { direccion: 'Contraloría General del Municipio de Manizales, Calle 21 # 23-22', lat: 5.068340, lng: -75.516420 },
  20: { direccion: 'Aeropuerto Internacional El Edén, Km 13 Vía a La Tebaida, Armenia', lat: 4.453320, lng: -75.766430 },
  21: { direccion: 'Barrio Altamira, San Cristóbal, Bogotá', lat: 4.551710, lng: -74.075840 },
  22: { direccion: 'Conjunto Residencial Acrópolis, Bogotá' }, 
  23: { direccion: 'Torres de Granada, Engativá, Bogotá', lat: 4.717520, lng: -74.116930 },
  24: { direccion: 'Proyecto Novum Ricaurte, Calle 10 # 27-51, Bogotá', lat: 4.607510, lng: -74.095520 },
  25: { direccion: 'Centro de Medicina Aeroespacial (CEMAE), Base Aérea CATAM, Aeropuerto El Dorado, Bogotá', lat: 4.697420, lng: -74.141540 },
  26: { direccion: 'Grupo Aéreo del Amazonas (GAAMA), Aeropuerto Internacional Alfredo Vásquez Cobo, Leticia', lat: -4.193130, lng: -69.943150 },
  27: { direccion: 'Parque Metropolitano El Tunal, Calle 48B Sur # 22-07, Bogotá', lat: 4.575010, lng: -74.135040 }
};