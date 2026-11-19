// Revisión documental: 19 de noviembre de 2026.
// Las fechas describen el hito publicado: nunca se convierte un contrato,
// una apertura o un período de obra en una fecha de entrega por inferencia.
const tr = (ES, EN, PT) => ({ ES, EN, PT });
export const localized = (value, language = 'ES') => typeof value === 'object' && value !== null ? value[language] || value.ES : value;
const source = (title, url) => ({ title, url });
const amr = source('AMR · Portafolio de proyectos', 'https://amr.com.co/proyectos/');
const fac = source('Fuerza Aeroespacial Colombiana · Directorio institucional', 'https://cdn979857.fac.mil.co/sites/default/files/2023-07/dir_atencion_jul_2023.pdf');
const date = (kind, year, url, end) => ({ kind, year, end, url });
const map = (query, address = '', reference = false) => ({ query, address, reference });
const pending = tr('Fecha de obra por confirmar', 'Construction date unconfirmed', 'Data da obra a confirmar');

export const detailLabels = {
  ES: { back: 'Todos los proyectos', eyebrow: 'PORTAFOLIO AMCO', overview: 'El proyecto', facts: 'Ficha del proyecto', location: 'Ubicación', address: 'Dirección', client: 'Entidad', use: 'Uso', area: 'Área publicada', capacity: 'Capacidad publicada', milestone: 'Hito documentado', scope: 'Características documentadas', sources: 'Fuentes y documentación', gallery: 'Registro fotográfico', map: 'Ver ubicación en Google Maps', reference: 'Ubicación de referencia de la institución', enlarge: 'Ampliar fotografía', close: 'Cerrar fotografía', video: 'Recorrido del proyecto', unknown: 'La fecha de esta intervención no se ha confirmado en las fuentes consultadas.', review: 'Estamos completando la ficha técnica con documentación que permita identificar esta intervención con precisión.', notFound: 'Proyecto no encontrado', start: 'Inicio de obra', period: 'Período de obra', opening: 'Apertura', delivery: 'Entrega', contract: 'Contrato suscrito', contractEnd: 'Terminación contractual', partial: 'Entregas parciales', inProgress: 'En ejecución', pending },
  EN: { back: 'All projects', eyebrow: 'AMCO PORTFOLIO', overview: 'The project', facts: 'Project facts', location: 'Location', address: 'Address', client: 'Institution', use: 'Use', area: 'Published area', capacity: 'Published capacity', milestone: 'Documented milestone', scope: 'Documented features', sources: 'Sources and documentation', gallery: 'Photo gallery', map: 'View location in Google Maps', reference: 'Institution location shown for reference', enlarge: 'Enlarge photo', close: 'Close photo', video: 'Project tour', unknown: 'The date of this intervention has not been confirmed in the sources consulted.', review: 'We are completing this profile with documentation that precisely identifies the intervention.', notFound: 'Project not found', start: 'Construction start', period: 'Construction period', opening: 'Opening', delivery: 'Handover', contract: 'Contract signed', contractEnd: 'Contract completion', partial: 'Partial handovers', inProgress: 'Under construction', pending },
  PT: { back: 'Todos os projetos', eyebrow: 'PORTFÓLIO AMCO', overview: 'O projeto', facts: 'Dados do projeto', location: 'Localização', address: 'Endereço', client: 'Instituição', use: 'Uso', area: 'Área publicada', capacity: 'Capacidade publicada', milestone: 'Marco documentado', scope: 'Características documentadas', sources: 'Fontes e documentação', gallery: 'Registro fotográfico', map: 'Ver localização no Google Maps', reference: 'Localização de referência da instituição', enlarge: 'Ampliar fotografia', close: 'Fechar fotografia', video: 'Vídeo do projeto', unknown: 'A data desta intervenção não foi confirmada nas fontes consultadas.', review: 'Estamos completando esta ficha com documentação que permita identificar a intervenção com precisão.', notFound: 'Projeto não encontrado', start: 'Início da obra', period: 'Período da obra', opening: 'Abertura', delivery: 'Entrega', contract: 'Contrato assinado', contractEnd: 'Conclusão contratual', partial: 'Entregas parciais', inProgress: 'Em execução', pending },
};

export const projectResearch = {
  1: {
    summary: tr('La Bodega Popular forma parte de la infraestructura comercial de Corabastos, en Bogotá. La documentación judicial identifica el contrato 047 de 1997 para su diseño, construcción, dotación y operación.', 'The Bodega Popular is part of Bogotá’s Corabastos market infrastructure. Judicial records identify contract 047 of 1997 for its design, construction, equipment and operation.', 'A Bodega Popular integra a infraestrutura comercial de Corabastos, em Bogotá. Documentos judiciais identificam o contrato 047 de 1997 para seu projeto, construção, equipamentos e operação.'),
    facts: { client: 'Corabastos' },
    date: date('contract', 1997, 'https://lector.ramajudicial.gov.co/SIBD/VIDEOTECA/Publicaciones/00000000/providencia/Providencias_Tomo_I/11001-03-26-000-2021-00215-00%2867645%29.pdf'),
    sources: [source('Rama Judicial · Contrato 047 de 1997', 'https://lector.ramajudicial.gov.co/SIBD/VIDEOTECA/Publicaciones/00000000/providencia/Providencias_Tomo_I/11001-03-26-000-2021-00215-00%2867645%29.pdf')],
    map: map('Bodega Popular Corabastos Bogotá'),
  },
  2: {
    summary: tr('Establecimiento de reclusión de mediana seguridad en Sabanas de San Ángel, Magdalena. La intervención incluye construcción y dotación de la primera etapa. USPEC informó en septiembre de 2026 que continuaban las gestiones para finalizar la obra y ponerla en funcionamiento.', 'Medium-security correctional facility in Sabanas de San Ángel, Magdalena. The intervention covers construction and equipment for the first phase. In September 2026, USPEC reported continuing work towards completion and commissioning.', 'Estabelecimento prisional de segurança média em Sabanas de San Ángel, Magdalena. A intervenção inclui construção e equipamentos da primeira etapa. Em setembro de 2026, a USPEC informou que continuavam os trabalhos para conclusão e entrada em operação.'),
    facts: { client: 'USPEC', capacity: tr('1.974 cupos', '1,974 places', '1.974 vagas') },
    scope: [tr('Pabellones, áreas administrativas, visitas y servicios complementarios.', 'Accommodation blocks, administration, visiting areas and supporting services.', 'Pavilhões, administração, visitas e serviços complementares.'), tr('Dotación y redes de servicios para el funcionamiento del establecimiento.', 'Equipment and utility networks to support the facility’s operation.', 'Equipamentos e redes de serviços para o funcionamento da unidade.')],
    date: date('inProgress', null, 'https://www.uspec.gov.co/noticias/articulacion-institucional-para-avanzar-en-el-eron-sabanas-de-san-angel'),
    sources: [source('USPEC · Avance institucional, 30/09/2026', 'https://www.uspec.gov.co/noticias/articulacion-institucional-para-avanzar-en-el-eron-sabanas-de-san-angel'), source('AMR · ERON Sabanas de San Ángel', 'https://amr.com.co/project/eron-sabanas-de-san-angel-2/')],
  },
  3: {
    summary: tr('Centro comercial ubicado en el sector de Cedritos, al norte de Bogotá. Su directorio oficial reúne comercio, gastronomía y servicios, además de espacios para actividades familiares.', 'Shopping centre in Cedritos, northern Bogotá. Its official directory lists retail, dining and services, together with spaces for family activities.', 'Centro comercial no setor de Cedritos, ao norte de Bogotá. O diretório oficial reúne comércio, gastronomia e serviços, além de espaços para atividades familiares.'),
    map: map('Centro Comercial Cedritos 151 Calle 150 16-56 Bogotá', 'Calle 150 # 16-56'),
    sources: [source('Cedritos 151 · Sitio oficial y directorio', 'https://www.cedritos151oficial.com/')],
  },
  4: {
    summary: tr('El Centro de Talento Creativo Multicampus Bronx integra formación y espacios de encuentro en el centro de Bogotá. La ficha del proyecto documenta un edificio de siete pisos y áreas de espacio público asociadas.', 'The Bronx Creative Talent Multicampus Centre combines training and gathering spaces in central Bogotá. The project profile documents a seven-storey building and associated public spaces.', 'O Centro de Talento Criativo Multicampus Bronx reúne formação e espaços de encontro no centro de Bogotá. A ficha documenta um edifício de sete andares e áreas de espaço público.'),
    facts: { client: 'Alcaldía Mayor de Bogotá', area: '11.272 m²' },
    scope: [tr('Espacios de formación del SENA y auditorio para 270 personas.', 'SENA training spaces and a 270-seat auditorium.', 'Espaços de formação do SENA e auditório para 270 pessoas.')],
    date: date('period', 2020, 'https://amr.com.co/project/centro-de-talento-creativo-multicampus-bronx/', 2025),
    map: { url: 'https://www.google.com/maps?cid=3258011454354454928', query: 'Bronx Distrito Creativo Bogotá', address: 'Bronx Distrito Creativo · Los Mártires' },
    sources: [source('AMR · Centro de Talento Creativo Multicampus Bronx', 'https://amr.com.co/project/centro-de-talento-creativo-multicampus-bronx/')],
  },
  5: {
    summary: tr('Nueva sede del Comando de la Policía Metropolitana de Bogotá. La documentación distrital registra su entrega institucional en diciembre de 2022; este hito se diferencia del período de obra publicado en el portafolio del constructor.', 'New headquarters of Bogotá’s Metropolitan Police Command. District records document the institutional handover in December 2022, a milestone distinct from the construction period in the contractor’s portfolio.', 'Nova sede do Comando da Polícia Metropolitana de Bogotá. A documentação distrital registra a entrega institucional em dezembro de 2022, distinta do período de obra publicado no portfólio do construtor.'),
    facts: { client: 'Policía Metropolitana de Bogotá' },
    date: date('delivery', 2022, 'https://www.contraloriabogota.gov.co/sites/default/files/2023-06/Concejo_Control_56-dic2022.pdf'),
    map: map('Comando Policía Metropolitana Bogotá Carrera 56 22-96', 'Carrera 56 # 22-96'),
    sources: [source('Contraloría de Bogotá · Entrega de la sede', 'https://www.contraloriabogota.gov.co/sites/default/files/2023-06/Concejo_Control_56-dic2022.pdf'), source('Planeación Distrital · Dirección de la sede', 'https://www.sdp.gov.co/sites/default/files/gacetas/gaceta_969_2023.pdf')],
  },
  6: {
    summary: tr('Edificio de Laboratorios de Investigación de la Facultad de Ingeniería de la Universidad Distrital. La universidad anunció en mayo de 2022 la contratación de su construcción y dotación con el Consorcio San Javier, integrado por Conacero y AMCO.', 'Research Laboratories building for Universidad Distrital’s Faculty of Engineering. In May 2022, the university announced its construction and equipment contract with Consorcio San Javier, formed by Conacero and AMCO.', 'Edifício de Laboratórios de Pesquisa da Faculdade de Engenharia da Universidad Distrital. Em maio de 2022, a universidade anunciou a contratação da construção e dos equipamentos com o Consorcio San Javier, integrado por Conacero e AMCO.'),
    facts: { client: 'Universidad Distrital Francisco José de Caldas' },
    date: date('contract', 2022, 'https://agencia.udistrital.edu.co/noticia/suscritos-contratos-para-obras-en-la-facultad-de-ingenieria-de-la-ud'),
    sources: [source('Universidad Distrital · Contratos de la Facultad de Ingeniería', 'https://agencia.udistrital.edu.co/noticia/suscritos-contratos-para-obras-en-la-facultad-de-ingenieria-de-la-ud')],
  },
  7: {
    summary: tr('La Escuela Militar de Aviación Marco Fidel Suárez tiene su sede en Cali. Es una institución de formación de oficiales de la Fuerza Aeroespacial Colombiana. La dirección corresponde al campus; no acredita la fecha de entrega de la intervención del portafolio.', 'The Marco Fidel Suárez Military Aviation School is based in Cali and trains officers for the Colombian Aerospace Force. The address identifies the campus; it does not establish the handover date of this portfolio intervention.', 'A Escola Militar de Aviação Marco Fidel Suárez tem sede em Cali e forma oficiais da Força Aeroespacial Colombiana. O endereço identifica o campus, sem comprovar a data de entrega desta intervenção.'),
    facts: { client: 'Fuerza Aeroespacial Colombiana' },
    map: map('Escuela Militar Aviación Marco Fidel Suárez Cali', 'Carrera 8 # 58-67 · La Base', true), sources: [fac],
  },
  8: {
    summary: tr('Sede administrativa de la Gobernación de Cundinamarca, situada sobre la avenida El Dorado en Bogotá. El conjunto concentra dependencias de la administración departamental.', 'Administrative headquarters of the Government of Cundinamarca, on Avenida El Dorado in Bogotá. The complex brings together departmental government offices.', 'Sede administrativa do Governo de Cundinamarca, na avenida El Dorado, em Bogotá. O conjunto reúne dependências da administração departamental.'),
    map: map('Gobernación Cundinamarca Calle 26 51-53 Bogotá', 'Calle 26 # 51-53'),
    sources: [source('Gobernación de Cundinamarca · Información institucional', 'https://www.cundinamarca.gov.co/')],
  },
  9: {
    summary: tr('El edificio Gabriel Giraldo, S. J., identificado como edificio 3 de la Pontificia Universidad Javeriana, alberga dependencias de Ciencias Jurídicas. El catálogo de la universidad documenta espacios y obras de su patrimonio en esta sede.', 'The Gabriel Giraldo, S. J. building, numbered 3 on the Pontificia Universidad Javeriana campus, houses Legal Sciences facilities. The university catalogue documents spaces and heritage works in this building.', 'O edifício Gabriel Giraldo, S. J., número 3 no campus da Pontificia Universidad Javeriana, abriga dependências de Ciências Jurídicas. O catálogo universitário documenta espaços e obras do patrimônio nesta sede.'),
    facts: { client: 'Pontificia Universidad Javeriana' },
    map: map('Edificio Gabriel Giraldo Universidad Javeriana Bogotá', '', true),
    sources: [source('Javeriana · Catálogo patrimonial, edificio Gabriel Giraldo', 'https://catalogodeobras.javeriana.edu.co/items/show/204')],
  },
  10: {
    summary: tr('Proyecto del portafolio identificado como Universidad Libre, Bogotá. La institución cuenta con varias sedes en la ciudad; está pendiente confirmar el edificio específico antes de publicar una dirección o una fecha de esta intervención.', 'Portfolio project identified as Universidad Libre, Bogotá. The university has several campuses in the city; the specific building remains to be confirmed before an address or intervention date can be published.', 'Projeto do portfólio identificado como Universidad Libre, Bogotá. A instituição possui várias sedes na cidade; é necessário confirmar o edifício antes de publicar endereço ou data da intervenção.'),
    sources: [source('Universidad Libre · Información de sedes', 'https://www.unilibre.edu.co/proveedores-2025/')],
  },
  11: {
    summary: tr('La Personería de Bogotá ejerce funciones de Ministerio Público y protección de derechos en el Distrito. Su documentación distingue edificios antiguos y nuevos; la ubicación publicada es una referencia institucional, sin atribuir una fase de obra no confirmada.', 'The Bogotá Personería performs public oversight and rights-protection functions. Its records distinguish older and newer buildings; the published location is an institutional reference without attributing an unconfirmed construction phase.', 'A Personería de Bogotá exerce funções de controle público e proteção de direitos. Seus documentos distinguem edifícios antigos e novos; a localização é uma referência institucional, sem atribuir uma fase de obra não confirmada.'),
    map: map('Personería Bogotá Carrera 7 21-24', 'Carrera 7 # 21-24', true),
    sources: [source('Personería de Bogotá · Plan institucional y sedes', 'https://www.personeriabogota.gov.co/acuerdos/send/22-plan-institucional-de-gestion-ambiental-piga/65-plan-institucional-de-gestion-ambiental-piga-2016-2020')],
  },
  12: {
    summary: tr('Megacentro del SENA para formación en tecnologías de la construcción y la madera en Soacha, inaugurado en noviembre de 2014. La publicación de apertura describe ambientes de aprendizaje y talleres especializados.', 'SENA training centre for construction and wood technologies in Soacha, inaugurated in November 2014. The opening report describes learning environments and specialist workshops.', 'Centro do SENA para formação em tecnologias da construção e da madeira, em Soacha, inaugurado em novembro de 2014. A publicação de abertura descreve ambientes de aprendizagem e oficinas especializadas.'),
    facts: { client: 'SENA', area: '19.700 m²' },
    scope: [tr('18 ambientes de formación y ocho talleres.', '18 training environments and eight workshops.', '18 ambientes de formação e oito oficinas.'), tr('Auditorio, biblioteca y espacios de bienestar para aprendices.', 'Auditorium, library and student welfare spaces.', 'Auditório, biblioteca e espaços de bem-estar estudantil.')],
    date: date('opening', 2014, 'https://periodismopublico.com/sena-inauguro-megacentro-de-formacion-en-construccion-en-soacha'),
    map: map('SENA Centro Tecnologías Construcción Madera Cazucá Soacha', 'Zona industrial de Cazucá'),
    sources: [source('Periodismo Público · Inauguración del megacentro SENA', 'https://periodismopublico.com/sena-inauguro-megacentro-de-formacion-en-construccion-en-soacha'), amr],
  },
  13: {
    summary: tr('Establecimiento penitenciario de Valledupar conocido como La Tramacúa. Las fuentes institucionales sitúan su apertura en 2000. INPEC publica la ubicación sobre la vía a La Mesa.', 'Valledupar correctional facility, known as La Tramacúa. Institutional sources date its opening to 2000. INPEC identifies its location on the road to La Mesa.', 'Estabelecimento prisional de Valledupar conhecido como La Tramacúa. Fontes institucionais situam sua abertura em 2000. O INPEC publica a localização na via a La Mesa.'),
    facts: { client: 'INPEC' },
    date: date('opening', 2000, 'https://derechoshumanos.gov.co/Observatorio/SNIDH/SiteAssets/2002/Proyecto_05/Pages_20/Cifras_20.html'),
    map: map('Penitenciaría Valledupar La Tramacúa vía La Mesa', 'Km 3,5 · Vía a La Mesa'),
    sources: [source('INPEC · Establecimiento de Valledupar', 'https://www.inpec.gov.co/web/guest/establecimientos-penitenciarios/regional-norte/carcel-penitenciaria-de-valledupar'), source('Observatorio de Derechos Humanos · Apertura en 2000', 'https://derechoshumanos.gov.co/Observatorio/SNIDH/SiteAssets/2002/Proyecto_05/Pages_20/Cifras_20.html')],
  },
  14: {
    summary: tr('Centro de Alto Rendimiento Gibraltar, en Kennedy, Bogotá. La ficha del proyecto documenta infraestructura deportiva, recreativa y cultural para el IDRD, con inicio registrado en 2023. La fuente no acredita una entrega definitiva.', 'Gibraltar High Performance Centre in Kennedy, Bogotá. The project profile documents sports, recreation and cultural infrastructure for IDRD, with a recorded start in 2023. The source does not establish final handover.', 'Centro de Alto Rendimento Gibraltar, em Kennedy, Bogotá. A ficha documenta infraestrutura esportiva, recreativa e cultural para o IDRD, com início registrado em 2023. A fonte não comprova entrega definitiva.'),
    facts: { client: 'IDRD' },
    scope: [tr('Piscinas, polideportivo y espacios culturales.', 'Swimming pools, sports hall and cultural spaces.', 'Piscinas, ginásio poliesportivo e espaços culturais.')],
    date: date('start', 2023, 'https://amr.com.co/project/centro-de-alto-rendimiento-gibraltar/'),
    sources: [source('AMR · Centro de Alto Rendimiento Gibraltar', 'https://amr.com.co/project/centro-de-alto-rendimiento-gibraltar/')],
  },
  15: {
    summary: tr('Plataforma de la base FAC en Barranquilla, registrada en el portafolio de AMR en 2016.', 'FAC base platform in Barranquilla, listed in AMR’s 2016 portfolio.', 'Plataforma da base FAC em Barranquilla, registrada no portfólio da AMR em 2016.'),
    date: date('period', 2016, amr.url), sources: [amr],
  },
  16: {
    title: 'Base aérea de Yopal',
    summary: tr('Proyecto de base aérea en Yopal. El Grupo Aéreo del Casanare forma parte de la presencia institucional de la Fuerza Aeroespacial Colombiana en la región.', 'Air base project in Yopal. The Casanare Air Group is part of the Colombian Aerospace Force’s regional presence.', 'Projeto de base aérea em Yopal. O Grupo Aéreo de Casanare integra a presença regional da Força Aeroespacial Colombiana.'),
    date: date('period', 2007, amr.url, 2009),
    map: map('Grupo Aéreo Casanare Base Aérea Yopal', 'Calle 40 # 20-19', true), sources: [amr, fac],
  },
  17: {
    summary: tr('Centro de Desarrollo Comunitario Tibabuyes, en el barrio Bilbao de Suba. Inaugurado el 27 de octubre de 2025, reúne atención social, formación y espacios de encuentro para la comunidad.', 'Tibabuyes Community Development Centre in Bilbao, Suba. Inaugurated on 27 October 2025, it brings together social services, training and community gathering spaces.', 'Centro de Desenvolvimento Comunitário Tibabuyes, no bairro Bilbao de Suba. Inaugurado em 27 de outubro de 2025, reúne atendimento social, formação e espaços de encontro comunitário.'),
    facts: { client: 'Secretaría Distrital de Integración Social', area: '7.879 m²' },
    scope: [tr('Teatro para 500 personas y jardín infantil para 200 niñas y niños.', '500-seat theatre and nursery for 200 children.', 'Teatro para 500 pessoas e jardim infantil para 200 crianças.'), tr('Servicios de inclusión, comedor y atención local en tres niveles.', 'Inclusion services, dining facilities and local services across three levels.', 'Serviços de inclusão, refeitório e atendimento local em três níveis.')],
    date: date('opening', 2025, 'https://www.integracionsocial.gov.co/index.php/noticias/170-territorio/7588-nuevo-centro-de-desarrollo-comunitario-en-suba-transformara-la-vida-de-mas-de-1-900-personas'),
    map: map('Centro Desarrollo Comunitario Tibabuyes Calle 144 136A-65 Bogotá', 'Calle 144 # 136A-65 · Bilbao, Suba'),
    sources: [source('Integración Social · Inauguración y dirección del CDC', 'https://www.integracionsocial.gov.co/index.php/noticias/170-territorio/7588-nuevo-centro-de-desarrollo-comunitario-en-suba-transformara-la-vida-de-mas-de-1-900-personas')],
  },
  18: {
    summary: tr('Construcción y dotación de la fase III del Grupo Aéreo en Yopal.', 'Construction and equipment for phase III of the Air Group in Yopal.', 'Construção e equipamentos da fase III do Grupo Aéreo em Yopal.'),
    city: 'Yopal', date: date('period', 2016, amr.url, 2017),
    map: map('Grupo Aéreo Casanare Base Aérea Yopal', 'Calle 40 # 20-19', true), sources: [amr, fac],
  },
  19: {
    summary: tr('Nueva sede de la Gerencia Departamental Colegiada de Caldas de la Contraloría General de la República. ANIM entregó el edificio en enero de 2025, en el barrio Belén de Manizales.', 'New headquarters for the Caldas Departmental Office of the Office of the Comptroller General of the Republic. ANIM handed over the building in January 2025 in Belén, Manizales.', 'Nova sede da Gerência Departamental de Caldas da Controladoria Geral da República. A ANIM entregou o edifício em janeiro de 2025, no bairro Belén de Manizales.'),
    facts: { client: 'Contraloría General de la República · ANIM', area: '2.000 m²' },
    scope: [tr('Cinco pisos y semisótano, con 135 puestos de trabajo.', 'Five floors and a semi-basement, with 135 workstations.', 'Cinco andares e semissubsolo, com 135 postos de trabalho.'), tr('Auditorio, archivo, salas de reuniones y atención ciudadana.', 'Auditorium, archive, meeting rooms and citizen services.', 'Auditório, arquivo, salas de reunião e atendimento ao cidadão.')],
    date: date('delivery', 2025, 'https://www.bcnoticias.com.co/contraloria-general-de-la-republica-ya-cuenta-con-nueva-sede-en-manizales/'),
    map: map('Contraloría General República Gerencia Caldas Belén Manizales'),
    sources: [source('BC Noticias · Entrega por ANIM, 30/01/2025', 'https://www.bcnoticias.com.co/contraloria-general-de-la-republica-ya-cuenta-con-nueva-sede-en-manizales/')],
  },
  20: {
    summary: tr('Intervención en el Aeropuerto Internacional El Edén. El Ministerio de Transporte documentó obras de torre de control y plataforma, además del mantenimiento de pista y calles de rodaje. El período publicado corresponde a esta intervención, no a todas las ampliaciones del aeropuerto.', 'Intervention at El Edén International Airport. The Ministry of Transport documented control tower and apron works, along with runway and taxiway maintenance. The published period concerns this intervention, rather than every airport expansion.', 'Intervenção no Aeroporto Internacional El Edén. O Ministério dos Transportes documentou obras na torre de controle e no pátio, além da manutenção de pista e vias de táxi. O período publicado corresponde a esta intervenção, não a todas as ampliações.'),
    date: date('period', 2018, amr.url, 2019), map: map('Aeropuerto Internacional El Edén Quindío'),
    sources: [source('Ministerio de Transporte · Obras de El Edén, 2019', 'https://mintransporte.gov.co/publicaciones/7870/a-buen-ritmo-avanzan-obras-del-aeropuerto-internacional-el-eden/'), amr],
  },
  21: { summary: tr('Altamira forma parte del portafolio residencial. Está pendiente identificar documentalmente la dirección y la etapa de esta obra para evitar confundirla con proyectos homónimos.', 'Altamira is part of the residential portfolio. Documentary identification of its address and phase remains pending to avoid confusion with similarly named developments.', 'Altamira integra o portfólio residencial. A identificação documental do endereço e da etapa permanece pendente para evitar confusão com empreendimentos homônimos.'), sources: [], needsIdentification: true },
  22: { summary: tr('Acrópolis forma parte del portafolio residencial. La información técnica y su fecha se publicarán una vez que la documentación permita identificar este proyecto sin confundirlo con conjuntos del mismo nombre.', 'Acrópolis is part of the residential portfolio. Technical information and dates will be published once documentation identifies this project without confusion with similarly named developments.', 'Acrópolis integra o portfólio residencial. Os dados técnicos e as datas serão publicados quando a documentação permitir identificar o projeto sem confusão com empreendimentos homônimos.'), sources: [], needsIdentification: true },
  23: {
    summary: tr('Conjunto residencial Torres de Granada, en Suba, Bogotá. Un documento de la Secretaría del Hábitat identifica el proyecto de 420 apartamentos y registra 291 viviendas entregadas a octubre de 2016. Este dato corresponde a entregas parciales, no al cierre de todas las etapas.', 'Torres de Granada residential development in Suba, Bogotá. A Housing Secretariat document identifies 420 apartments and records 291 homes handed over by October 2016. This describes partial handovers, rather than completion of every phase.', 'Conjunto residencial Torres de Granada, em Suba, Bogotá. Documento da Secretaria de Habitação identifica 420 apartamentos e registra 291 unidades entregues até outubro de 2016. O dado corresponde a entregas parciais, não à conclusão de todas as etapas.'),
    facts: { capacity: tr('420 apartamentos en el proyecto', '420 apartments in the development', '420 apartamentos no empreendimento') },
    date: date('partial', 2016, 'https://habitatbogota.gov.co/sites/default/files/notifications/2018-04/2-2018-11303.pdf'),
    map: map('Torres de Granada Calle 146F 73A-20 Bogotá', 'Calle 146F # 73A-20'),
    sources: [source('Secretaría del Hábitat · Identificación y entregas parciales', 'https://habitatbogota.gov.co/sites/default/files/notifications/2018-04/2-2018-11303.pdf')],
  },
  24: {
    summary: tr('Edificio NOVUM, Bogotá. La dirección exacta de esta intervención está pendiente de confirmación documental.', 'NOVUM building, Bogotá. The exact address of this intervention awaits documentary confirmation.', 'Edifício NOVUM, Bogotá. O endereço exato desta intervenção aguarda confirmação documental.'),
    date: date('period', 2011, amr.url, 2013), sources: [amr],
  },
  25: {
    summary: tr('Proyecto del Centro de Medicina Aeroespacial, CEMAE, vinculado a la Fuerza Aeroespacial Colombiana. El centro se ubica en CATAM, Bogotá; la localización se presenta como referencia institucional.', 'Aerospace Medicine Centre project, CEMAE, associated with the Colombian Aerospace Force. The centre is at CATAM, Bogotá; the location is provided as an institutional reference.', 'Projeto do Centro de Medicina Aeroespacial, CEMAE, vinculado à Força Aeroespacial Colombiana. O centro fica em CATAM, Bogotá; a localização é apresentada como referência institucional.'),
    date: date('period', 2007, amr.url, 2008), map: map('Centro Medicina Aeroespacial CEMAE CATAM Bogotá', '', true),
    sources: [amr, source('SECOP · Dirección de Medicina Aeroespacial, CATAM', 'https://community.secop.gov.co/Public/Archive/RetrieveFile/Index?DocUniqueIdentifier=&DocumentId=891244121&InCommunity=False&InPaymentGateway=False')],
  },
  26: {
    summary: tr('Base aérea de Leticia, asociada al Grupo Aéreo del Amazonas. La documentación contractual registra estudios, diseños y construcción, con terminación contractual en marzo de 2011. La unidad se ubica en la antigua vía Leticia–Tarapacá.', 'Leticia air base, associated with the Amazonas Air Group. Contract records document studies, design and construction, with contractual completion in March 2011. The unit is on the old Leticia–Tarapacá road.', 'Base aérea de Leticia, associada ao Grupo Aéreo do Amazonas. A documentação contratual registra estudos, projetos e construção, com conclusão contratual em março de 2011. A unidade fica na antiga via Leticia–Tarapacá.'),
    date: date('contractEnd', 2011, 'https://procesoscontractuales.udistrital.edu.co/local/storage/app/DOCUMENTOS/2021/marzo/19081.pdf'),
    map: map('Grupo Aéreo Amazonas Base Aérea Coronel Herbert Boy Leticia', 'Km 3 · Antigua vía Leticia–Tarapacá', true),
    sources: [source('Universidad Distrital · Documentación contractual de Leticia', 'https://procesoscontractuales.udistrital.edu.co/local/storage/app/DOCUMENTOS/2021/marzo/19081.pdf'), fac],
  },
  27: {
    title: 'Centro Felicidad El Tunal',
    summary: tr('El Centro Felicidad El Tunal es un equipamiento deportivo y cultural del IDRD, en Tunjuelito, Bogotá. Inició operaciones el 22 de noviembre de 2020 y amplía la oferta recreativa del parque El Tunal.', 'El Tunal Happiness Centre is an IDRD sports and cultural facility in Tunjuelito, Bogotá. It began operating on 22 November 2020, expanding the recreational offer of El Tunal park.', 'O Centro Felicidade El Tunal é um equipamento esportivo e cultural do IDRD, em Tunjuelito, Bogotá. Entrou em operação em 22 de novembro de 2020, ampliando a oferta recreativa do parque El Tunal.'),
    facts: { client: 'IDRD' },
    scope: [tr('Piscinas, gimnasio y salones de uso múltiple.', 'Swimming pools, gym and multipurpose rooms.', 'Piscinas, academia e salas de uso múltiplo.'), tr('Espacios para música, danza, cine y actividades lúdicas.', 'Spaces for music, dance, cinema and play activities.', 'Espaços para música, dança, cinema e atividades lúdicas.')],
    date: date('opening', 2020, 'https://www.idrd.gov.co/parques-y-escenarios/cefe-tunal'),
    map: map('Centro Felicidad CEFE Tunal Calle 58A sur 19C-66 Bogotá', 'Calle 58A Sur # 19C-66'),
    sources: [source('IDRD · CEFE Tunal, operación y ubicación', 'https://www.idrd.gov.co/parques-y-escenarios/cefe-tunal')],
  },
};

export const projectMapUrl = (id) => {
  const location = projectResearch[id]?.map;
  if (!location) return null;
  return location.url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`;
};
