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

Publicado en producción el 19/11/2026 mediante el commit c603a46 de la rama main. Vercel confirmó el despliegue listo en el dominio principal.

Verificaciones públicas: las 35 URLs del sitemap respondieron HTTP 200 y una única canónica coincidente. /proyectos/11 redirige con 308 a /proyecto/11; /about/ y /contact/ terminan en las páginas correctas; /blog/, /project/254/ y /proyecto/999 terminan con HTTP 404.

También se cambió en Vercel la redirección de amcoltda.com hacia www.amcoltda.com: de 307 temporal a 308 permanente. Se comprobó la respuesta pública 308.

Search Console confirmó el envío de sitemap.xml, el inicio de las validaciones de Soft 404 y duplicados sin canónica, y la aceptación de la solicitud de indexación de /proyectos en la cola prioritaria. La inspección de /proyecto/2 mostró que esa ficha ya estaba indexada; ese estado no se atribuye al despliegue recién realizado.

Los contadores históricos no cambian al instante. Queda pendiente el procesamiento por Google de las nuevas solicitudes. Google decide qué páginas indexa; corregir estos fallos no garantiza una posición ni un plazo. No es necesario reenviar la misma solicitud repetidamente.
