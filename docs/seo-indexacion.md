# Revisión de indexación · 19 de noviembre de 2026

Estado observado en Search Console (informe actualizado el 15/11/2026): 6 páginas indexadas, 39 sin indexar.

| Motivo | Cantidad | Diagnóstico |
| --- | ---: | --- |
| Soft 404 | 5 | /proyectos/11 no coincide con /proyecto/11; rutas antiguas /about/, /contact/ y /project/universidad-javeriana-edificio-gabriel-girlado/ sin redirección. /blog/ ya no tiene una página equivalente. |
| Duplicada sin canónica | 2 | /tyc y /politicaprivacidad no tenían una canónica propia. El sitemap enviaba otras rutas legales que no existen. |
| Descubierta, sin indexar | 31 | Incluye rutas reales y muchas /proyectos/ID incorrectas. Conocer una URL no significa que Google la haya rastreado. |
| Rastreada, sin indexar | 1 | /project/254/ es una ruta histórica sin equivalencia confirmada; no se le asigna un proyecto por suposición. |

## Correcciones preparadas

- Sitemap con 35 URLs únicas: 8 páginas principales/legales y 27 fichas /proyecto/ID.
- Rutas y metadatos comparten src/seo/siteMetadata.js.
- Se elimina la duplicación de la portada y lastmod ficticios que cambiaban en cada compilación.
- Cada ruta genera un documento HTML con título, descripción, canónica y contenido inicial visible, a partir de los mismos datos utilizados en React.
- El directorio enlaza las 27 fichas con enlaces HTML; explorar proyecto deja de depender de un botón JavaScript.
- Canónicas y Open Graph se actualizan también al navegar dentro de la aplicación.
- El pie de página usa rutas en minúscula. Los cuatro enlaces históricos con mayúscula conservan documentos con canónica en minúscula.
- Vercel sirve archivos reales con cleanUrls; desaparece la reescritura global que respondía éxito incluso en rutas inexistentes. Se genera 404.html con noindex.
- Redirecciones permanentes de /proyectos/:id a /proyecto/:id, /about a /nosotros, /contact a /contacto, rutas legales antiguas y el enlace histórico del edificio Gabriel Giraldo.
- El dominio sin www se consolida en https://www.amcoltda.com, coherente con las canónicas y la propiedad de Search Console.
- /blog/ y /project/254/ deben devolver 404; no se redirigen a páginas irrelevantes.

## Verificación

npm run build
npm run check:seo

La comprobación valida rutas, URLs únicas, canónicas, etiquetas robots, contenido inicial, enlaces a las 27 fichas, existencia de recursos y destinos de redirección.

## Publicación y seguimiento

Los cambios locales solo surten efecto en Google después de publicarse. Al terminar la revisión no había una sesión abierta de Vercel en el navegador. No se debe pulsar VALIDAR CORRECCIÓN ni reenviar el sitemap mientras la versión pública siga sirviendo el sitemap anterior.

Tras publicar: comprobar /sitemap.xml, /proyecto/11, la redirección de /proyectos/11 y el estado 404 de una URL inexistente. Reenviar sitemap.xml en Search Console, validar los errores corregidos y solicitar indexación de las páginas prioritarias. Los contadores históricos no cambian al instante. Google decide qué páginas indexa; corregir estos fallos no garantiza una posición ni un plazo.
