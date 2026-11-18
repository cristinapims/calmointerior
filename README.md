# Calmo Interior · calmointerior.com

Sitio estático (HTML + CSS + JS, sin build en el servidor). Las páginas se generan con `build.py`.

## Cambiar textos o agregar un proyecto

1. Fotos optimizadas en `assets/img/<slug>-1.jpg`, `-2.jpg`… (la 1 es la portada, ~2000 px de ancho).
2. Edita `build.py`: el proyecto va en `PROJECTS`, los destacados del inicio en `FEATURED`.
3. Corre `python3 build.py` y publica.

## Cotizador (`/cotizar`)

`assets/cotizar.js`: preguntas → cotización aproximada → botón "Pagar y agendar" a Cal.com
(con nombre, correo y notas ya llenos). Las tarifas están arriba del archivo (`R`).
Cada cotización llega a holacalmo@gmail.com por Web3Forms marcada "Pago pendiente".
La fecha solo se aparta cuando se paga en Cal.com.

## Publicar

El proyecto de Vercel que tiene el dominio debe estar conectado a este repo
(GitHub `cristinapims/calmointerior`, rama `main`). Cada `git push` publica.
