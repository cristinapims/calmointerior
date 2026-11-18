#!/usr/bin/env python3
"""Genera las páginas HTML del sitio de Calmo Interior.

Uso:  python3 build.py

Para agregar un proyecto:
  1. Pon sus fotos optimizadas en assets/img/<slug>-1.jpg, <slug>-2.jpg, …
     (la 1 es la portada).
  2. Agrega un bloque en PROJECTS (abajo) con el mismo slug.
  3. Corre `python3 build.py` y publica.
El orden de PROJECTS es el orden en que aparecen en el sitio.
"""
from html import escape
from pathlib import Path
import json

ROOT = Path(__file__).parent
SITE = "https://www.calmointerior.com"
EMAIL = "holacalmo@gmail.com"
IG = "https://www.instagram.com/calmointerior/"
MAPS = "https://www.google.com/maps/place/Calmo+Interior/@20.7016733,-103.3767621,17z/data=!4m6!3m5!1s0x8428af0015b88b2f:0xc77712169f2fc4e8!8m2!3d20.7016733!4d-103.3767621!16s%2Fg%2F11zypnw7vf"

# ---------------------------------------------------------------- proyectos
# gallery: lista de (número de foto, "wide" o "") en el orden de la galería
PROJECTS = [
    dict(
        slug="depto-an", name="DEPTO A+N",
        loc=("México", "Mexico"),
        meta=("2026 · Residencial", "2026 · Residential"),
        copy=(
            ["Un departamento familiar con vista abierta a la ciudad. Lo pensamos alrededor de la madera de nogal, que envuelve muros, puertas y libreros, y de una paleta de terracotas, verdes y crema que lo vuelve cálido a cualquier hora del día.",
             "La sala y el comedor comparten una sola luz, con piezas de piedra y mármol rojizo como contrapunto. La recámara principal, el estudio y la sala de TV siguen la misma línea; el baño de visitas se atreve un poco más, en vino y travertino."],
            ["A family apartment with an open view over the city. We built it around walnut, which wraps walls, doors and bookcases, and a palette of terracotta, green and cream that keeps it warm at any time of day.",
             "Living and dining share one light, with stone and red marble pieces as a counterpoint. The primary bedroom, study and TV room follow the same line; the powder room goes a little further, in wine and travertine."]),
        scope=("Alcance: interiorismo completo, carpinterías, mobiliario e iluminación.", "Scope: full interiors, millwork, furniture and lighting."),
        gallery=[(1, "wide"), (2, ""), (3, ""), (4, "wide"), (5, ""), (6, ""), (7, "wide"), (8, ""), (9, ""), (10, ""), (11, "")],
    ),
    dict(
        slug="kopko", name="KOPKO",
        loc=("St. Petersburg, Florida", "St. Petersburg, Florida"),
        meta=("Residencial · Obra nueva", "Residential · New build"),
        copy=(
            ["Interiorismo para una casa de obra nueva en St. Petersburg, Florida.",
             "Definimos todos los espacios interiores: materiales y acabados, carpinterías, iluminación, mobiliario, textiles y accesorios, con una misma identidad en toda la casa.",
             "Una paleta sobria, piezas a medida y obra de arte con carácter. Una casa elegante, hecha para el día a día."],
            ["Interiors for a new-build home in St. Petersburg, Florida.",
             "We defined every interior space: materials and finishes, millwork, lighting, furniture, textiles and accessories, with one identity throughout the house.",
             "A restrained palette, custom pieces and art with character. An elegant home made for everyday life."]),
        scope=("Alcance: documentos de construcción completos y FF&E.", "Scope: full construction documents and FF&E."),
        gallery=[(1, "wide"), (2, ""), (3, ""), (4, "wide")],
    ),
    dict(
        slug="casacabo", name="CASACABO",
        loc=("San José del Cabo, BCS", "San José del Cabo, BCS"),
        meta=("2025 · Residencial · Con SAND Arquitectos", "2025 · Residential · With SAND Arquitectos"),
        copy=(
            ["Una colaboración con SAND Arquitectos en San José del Cabo, donde arquitectura e interiorismo se resolvieron juntos desde el inicio.",
             "Buscamos una casa que se sintiera natural y conectada con el desierto y el mar: piezas artesanales en materiales locales, mármol, madera oscura e interiores luminosos que salen hacia la terraza y la alberca."],
            ["A collaboration with SAND Arquitectos in San José del Cabo, where architecture and interiors were worked out together from day one.",
             "We wanted a house that felt natural and tied to the desert and the sea: handcrafted pieces in local materials, marble, dark wood and bright interiors that open onto the terrace and pool."]),
        scope=("En colaboración con SAND Arquitectos.", "In collaboration with SAND Arquitectos."),
        gallery=[(1, "wide"), (2, ""), (3, ""), (4, "wide"), (5, ""), (6, ""), (7, "wide"), (8, "")],
    ),
    dict(
        slug="d11", name="D11",
        loc=("Ciudad de Guatemala", "Guatemala City"),
        meta=("2026 · Remodelación", "2026 · Remodel"),
        copy=(
            ["La remodelación de un departamento en Guatemala. La madera y los tonos cálidos le dan carácter a una sala y un comedor abiertos a la ciudad.",
             "La luz natural convive con lámparas colgantes y luz indirecta. Madera, textiles y mobiliario se equilibran para un interior cálido, con lugar para conversar y reunirse alrededor de la mesa."],
            ["The remodel of an apartment in Guatemala. Wood and warm tones give character to a living and dining room open to the city.",
             "Daylight sits alongside pendant lamps and indirect light. Wood, textiles and furniture balance each other in a warm interior, with room to talk and gather around the table."]),
        scope=("2026 · Remodelación", "2026 · Remodel"),
        gallery=[(1, "wide"), (2, ""), (3, ""), (4, "wide"), (5, "wide"), (6, ""), (8, ""), (7, "wide")],
    ),
    dict(
        slug="hacienda-agavos", name="HACIENDA AGAVOS",
        loc=("Guanajuato", "Guanajuato, Mexico"),
        meta=("2024 · Hospitalidad", "2024 · Hospitality"),
        copy=(
            ["Un proyecto de hospitalidad para una hacienda familiar rodeada de campos de agave, dedicada a la producción de tequila en Guanajuato.",
             "Materiales locales, texturas hechas a mano y una paleta cálida reinterpretan la arquitectura de hacienda sin volverla museo.",
             "Cada espacio está pensado para recibir y para hacer una pausa entre los agaves; un lugar donde la historia de la familia y el paisaje se viven de cerca."],
            ["A hospitality project for a family hacienda surrounded by agave fields, devoted to tequila production in Guanajuato.",
             "Local materials, handmade textures and a warm palette reinterpret hacienda architecture without turning it into a museum.",
             "Every space is meant to welcome guests and to pause among the agaves; a place where the family's history and the landscape are felt up close."]),
        scope=("2024 · Hospitalidad", "2024 · Hospitality"),
        gallery=[(1, "wide"), (2, ""), (4, ""), (3, "wide"), (5, "wide")],
    ),
    dict(
        slug="bcn00", name="BCN00",
        loc=("Barcelona", "Barcelona, Spain"),
        meta=("2025 · Residencial", "2025 · Residential"),
        copy=(
            ["Un departamento en Barcelona donde el material, la luz y la composición marcan cómo se vive cada espacio.",
             "Acabados naturales, texturas discretas y mobiliario de líneas limpias, con una distribución que da continuidad entre áreas.",
             "Acabados, iluminación, mobiliario y decoración se especificaron como una sola decisión de diseño."],
            ["An apartment in Barcelona where material, light and composition shape how each space is lived in.",
             "Natural finishes, quiet textures and clean-lined furniture, with a layout that gives continuity between areas.",
             "Finishes, lighting, furniture and decor were specified as one design decision."]),
        scope=("Alcance: acabados, iluminación, mobiliario y decoración.", "Scope: finishes, lighting, furniture and decor."),
        gallery=[(1, "wide"), (2, ""), (3, "")],
    ),
]
FEATURED = ["depto-an", "casacabo", "kopko", "d11"]


# ---------------------------------------------------------------- utilidades
def bi(es, en, tag="span", cls=""):
    """Texto en ambos idiomas; el CSS muestra solo uno."""
    c = f' class="{cls}"' if cls else ""
    return f'<{tag} lang="es"{c}>{es}</{tag}><{tag} lang="en"{c}>{en}</{tag}>'


def img(src, alt, cls="", eager=False, w=None, h=None):
    dims = f' width="{w}" height="{h}"' if w else ""
    return f'<img src="{src}" alt="{escape(alt)}"{dims}{" class=" + chr(34) + cls + chr(34) if cls else ""} loading="{"eager" if eager else "lazy"}" decoding="async">'


NAV = [("proyectos", "Proyectos", "Projects"), ("servicios", "Servicios", "Services"),
       ("nosotros", "Estudio", "Studio"), ("guias", "Guías", "Guides"), ("contacto", "Contacto", "Contact")]


def nav(active):
    links = "".join(
        f'<a href="/{k}"{" aria-current=page" if k == active else ""}>{bi(es, en)}</a>' for k, es, en in NAV)
    mobile = "".join(f'<a href="/{k}">{bi(es, en)}</a>' for k, es, en in NAV) + f'<a href="/cotizar">{bi("Cotizar", "Get a quote")}</a>'
    return f'''<header class="nav"><div class="wrap nav-in">
<nav class="nav-links" aria-label="Principal">{links}</nav>
<a class="brand" href="/" aria-label="Calmo Interior, inicio"><b>CALMO</b><span>Interior</span></a>
<div class="nav-right"><div class="lang" role="group" aria-label="Idioma / Language"><button type="button" data-l="es">ES</button><button type="button" data-l="en">EN</button></div>
<a class="link" href="/cotizar" style="border:0">{bi("Cotizar", "Get a quote")}</a>
<button type="button" class="menu-btn" aria-expanded="false" aria-controls="mm">{bi("Menú", "Menu")}</button></div>
</div></header>
<nav class="mobile-menu" id="mm" aria-label="Menú">{mobile}</nav>'''


FOOT = f'''<footer class="foot"><div class="wrap foot-in">
<div><a class="brand" href="/"><b>CALMO</b><span>Interior</span></a>
<p>{bi("Estudio de interiorismo en Guadalajara. Proyectos residenciales y de hospitalidad en México y el extranjero.", "Interior design studio in Guadalajara. Residential and hospitality projects in Mexico and abroad.")}</p></div>
<div><h4>{bi("Sitio", "Site")}</h4><ul>
<li><a href="/proyectos">{bi("Proyectos", "Projects")}</a></li><li><a href="/servicios">{bi("Servicios", "Services")}</a></li>
<li><a href="/nosotros">{bi("Estudio", "Studio")}</a></li><li><a href="/guias">{bi("Guías", "Guides")}</a></li></ul></div>
<div><h4>{bi("Empezar", "Start")}</h4><ul>
<li><a href="/cotizar">{bi("Cotiza tu proyecto", "Get a quote")}</a></li><li><a href="/contacto">{bi("Contacto", "Contact")}</a></li></ul></div>
<div><h4>{bi("Estudio", "Studio")}</h4><ul>
<li><a href="mailto:{EMAIL}">{EMAIL}</a></li><li><a href="{IG}" target="_blank" rel="noopener">Instagram</a></li>
<li><a href="{MAPS}" target="_blank" rel="noopener">Colomos Providencia, GDL</a></li></ul></div>
<div class="legal"><span>© <span id="yr">2026</span> Calmo Interior</span><span>Guadalajara, Jalisco</span></div>
</div></footer>'''

JSONLD = {
    "@context": "https://schema.org", "@type": "InteriorDesignService", "name": "Calmo Interior",
    "url": SITE + "/", "logo": SITE + "/favicon.png", "image": SITE + "/assets/img/hero.jpg", "email": EMAIL,
    "description": "Estudio de interiorismo residencial y de hospitalidad en Guadalajara, México. Proyectos remotos y presenciales en México y el extranjero.",
    "founder": {"@type": "Person", "name": "Cristina Pimentel", "jobTitle": "Arquitecta y diseñadora de interiores"},
    "address": {"@type": "PostalAddress", "addressLocality": "Guadalajara", "addressRegion": "Jalisco", "addressCountry": "MX", "streetAddress": "Colomos Providencia"},
    "areaServed": ["Guadalajara", "México", "Estados Unidos", "Guatemala", "España"],
    "hasMap": MAPS, "sameAs": [IG, MAPS],
    "makesOffer": [
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Asesoría de diseño por espacio"}, "price": "8000", "priceCurrency": "MXN"},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Proyecto integral de interiorismo"}}],
}


def page(path, title, desc, body, active="", og_img="/assets/img/hero.jpg", scripts="", jsonld=False):
    t_es, t_en = title
    d_es, d_en = desc
    url = SITE + ("/" if path == "index" else "/" + path)
    ld = f'<script type="application/ld+json">{json.dumps(JSONLD, ensure_ascii=False)}</script>' if jsonld else ""
    return f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{escape(t_es)}</title>
<meta name="description" content="{escape(d_es)}">
<meta name="title-es" content="{escape(t_es)}"><meta name="title-en" content="{escape(t_en)}">
<meta name="desc-es" content="{escape(d_es)}"><meta name="desc-en" content="{escape(d_en)}">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="es" href="{url}"><link rel="alternate" hreflang="en" href="{url}?lang=en"><link rel="alternate" hreflang="x-default" href="{url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Calmo Interior">
<meta property="og:title" content="{escape(t_es)}"><meta property="og:description" content="{escape(d_es)}">
<meta property="og:url" content="{url}"><meta property="og:image" content="{SITE}{og_img}">
<meta property="og:locale" content="es_MX"><meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/favicon.png">
<script>(function(){{var l;try{{l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('calmo-lang')}}catch(e){{}}if(!l)l=(navigator.language||'es').toLowerCase().indexOf('es')===0?'es':'en';if(l==='en'){{document.documentElement.classList.add('en');document.documentElement.lang='en'}}}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400&family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital@1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
{ld}
</head>
<body>
{nav(active)}
<main>
{body}
</main>
{FOOT}
<script src="/assets/site.js" defer></script>
{scripts}
</body>
</html>
'''


def cta_block():
    return f'''<section class="sec paper cta"><div class="wrap reveal">
{bi("¿Empezamos con tu espacio?", "Shall we start with your space?", "h2")}
{bi("Responde seis preguntas y ve al momento una cotización aproximada. Si te late, pagas y agendas ahí mismo.", "Answer six questions and see an approximate quote right away. If it feels right, you pay and book on the spot.", "p")}
<a class="btn" href="/cotizar">{bi("Cotiza tu proyecto", "Get a quote")}</a>
</div></section>'''


def work_card(p, eager=False):
    src = "/assets/img/%s-1.jpg" % p["slug"]
    pic = img(src, p["name"] + " · Calmo Interior", eager=eager)
    return f'''<a class="work reveal" href="/{p["slug"]}"><figure>{pic}</figure>
<div class="cap"><h3>{p["name"]}</h3>{bi(p["loc"][0], p["loc"][1])}</div></a>'''


# ---------------------------------------------------------------- páginas
def home():
    feat = [next(p for p in PROJECTS if p["slug"] == s) for s in FEATURED]
    body = f'''<section class="hero">{img("/assets/img/hero.jpg", "Bloque de piedra frente a cortinas de lino, estudio Calmo Interior", eager=True)}
<div class="hero-txt">{bi("Interiores para vivirse con calma.", "Interiors made to be lived in calmly.", "h1")}
<a class="link" href="/proyectos">{bi("Ver proyectos", "See projects")}</a></div></section>

<section class="sec"><div class="wrap intro reveal">
{bi("Un estudio pequeño en Guadalajara.", "A small studio in Guadalajara.", "h2")}
<div class="txt">{bi("Calmo es el estudio de la arquitecta Cristina Pimentel. Diseñamos casas, departamentos y espacios de hospitalidad en México, Estados Unidos, Guatemala y España, a distancia o en persona.", "Calmo is the studio of architect Cristina Pimentel. We design houses, apartments and hospitality spaces in Mexico, the United States, Guatemala and Spain, remotely or in person.", "p")}
{bi("Nos importan los materiales honestos, la luz y que cada cuarto funcione para quien lo vive. Lo demás es ruido.", "We care about honest materials, light, and every room working for the people who live in it. The rest is noise.", "p")}
<a class="link" href="/nosotros">{bi("Conoce el estudio", "About the studio")}</a></div></div></section>

<section class="sec tight"><div class="wrap">
<div class="head">{bi("Proyectos", "Projects", "h2")}<a class="link" href="/proyectos">{bi("Todos los proyectos", "All projects")}</a></div>
<div class="works">{"".join(work_card(p) for p in feat)}</div></div></section>

<section class="sec"><div class="wrap">
<div class="head">{bi("Dos formas de trabajar", "Two ways to work together", "h2")}</div>
<div class="svc-teaser reveal">
<div><p class="small muted">{bi("Remota", "Remote")}</p>{bi("Asesoría por espacio", "Per-space consultation", "h3")}
{bi("Diseñamos una recámara, la sala o el comedor y tú lo ejecutas a tu ritmo, con paleta, distribución, lista de compras y renders.", "We design one room and you carry it out at your own pace, with a palette, layout, shopping list and renderings.", "p")}
<p class="price">{bi("Desde MX$8,000", "From US$450")}</p><a class="link" href="/servicios">{bi("Qué incluye", "What’s included")}</a></div>
<div><p class="small muted">{bi("Remota o presencial", "Remote or in person")}</p>{bi("Proyecto integral", "Full interior design", "h3")}
{bi("Diseñamos tu casa o tu proyecto completo de principio a fin: concepto, materiales, mobiliario, iluminación y especificaciones para construirlo.", "We design your home or full project from start to finish: concept, materials, furniture, lighting and specifications to build it.", "p")}
<p class="price">{bi("Desde MX$15,000", "From US$840")}</p><a class="link" href="/servicios">{bi("Qué incluye", "What’s included")}</a></div>
</div></div></section>
{cta_block()}'''
    return page("index", ("Calmo Interior · Estudio de interiorismo en Guadalajara", "Calmo Interior · Interior design studio in Guadalajara"),
                ("Estudio de interiorismo residencial y de hospitalidad en Guadalajara. Proyectos en México y el extranjero, remotos y presenciales. Cotiza tu proyecto en línea.",
                 "Residential and hospitality interior design studio in Guadalajara, Mexico. Projects in Mexico and abroad, remote and in person. Get a quote online."),
                body, jsonld=True)


def projects():
    body = f'''<section class="wrap page-head">{bi("Proyectos", "Projects", "h1", "page-title")}
{bi("Casas, departamentos y hospitalidad en México, Estados Unidos, Guatemala y España.", "Homes, apartments and hospitality in Mexico, the United States, Guatemala and Spain.", "p")}</section>
<section class="sec tight" style="padding-top:0"><div class="wrap"><div class="works">{"".join(work_card(p, i < 2) for i, p in enumerate(PROJECTS))}</div></div></section>
{cta_block()}'''
    return page("proyectos", ("Proyectos · Calmo Interior", "Projects · Calmo Interior"),
                ("Portafolio de interiorismo residencial y de hospitalidad: " + ", ".join(p["name"] for p in PROJECTS) + ".",
                 "Residential and hospitality interior design portfolio: " + ", ".join(p["name"] for p in PROJECTS) + "."),
                body, active="proyectos")


def project(p, nxt):
    gal = "".join('<figure class="%s">%s</figure>' % (w, img("/assets/img/%s-%d.jpg" % (p["slug"], n), "%s, %s · foto %d" % (p["name"], p["loc"][0], i + 1), eager=i == 0))
                  for i, (n, w) in enumerate(p["gallery"]))
    back = '<a class="link" href="/proyectos" style="margin-bottom:28px">← ' + bi("Proyectos", "Projects") + '</a>'
    og = "/assets/img/%s-1.jpg" % p["slug"]
    copy = bi("".join(f"<p>{x}</p>" for x in p["copy"][0]), "".join(f"<p>{x}</p>" for x in p["copy"][1]), "div")
    body = f'''<div class="wrap">
<section class="pj-head"><div>{back}
<h1>{p["name"]}</h1>
<div class="pj-meta"><span class="small">{bi(p["loc"][0], p["loc"][1])}</span><span class="small muted">{bi(p["meta"][0], p["meta"][1])}</span></div></div>
<div class="pj-body">{copy}<p class="scope">{bi(p["scope"][0], p["scope"][1])}</p></div></section>
<div class="gal">{gal}</div>
<a class="pj-next" href="/{nxt["slug"]}"><span><span class="small muted">{bi("Siguiente proyecto", "Next project")}</span><b>{nxt["name"]}</b></span><span class="small muted">{bi(nxt["loc"][0], nxt["loc"][1])}</span></a>
</div><div style="height:clamp(72px,10vw,140px)"></div>
{cta_block()}'''
    return page(p["slug"], ("%s, %s · Calmo Interior" % (p["name"], p["loc"][0]), "%s, %s · Calmo Interior" % (p["name"], p["loc"][1])),
                (p["copy"][0][0][:155], p["copy"][1][0][:155]), body, active="proyectos", og_img=og)


def services():
    def li(xs): return "<ul>" + "".join(f"<li>{x}</li>" for x in xs) + "</ul>"
    body = f'''<section class="wrap page-head">{bi("Servicios", "Services", "h1", "page-title")}
{bi("Dos formas de trabajar con el estudio. Si no sabes cuál es la tuya, el cotizador te lo dice en un par de minutos.", "Two ways to work with the studio. If you’re not sure which one fits, the quote form will tell you in a couple of minutes.", "p")}</section>
<div class="wrap"><div class="svc">
<section><p class="small muted">{bi("Remota", "Remote")}</p>{bi("Asesoría de diseño por espacio", "Design consultation per space", "h2")}
{bi("Tú lo ejecutas.", "You carry it out.", "p", "tag")}
<dl><dt>{bi("Para quién", "Who it’s for")}</dt><dd>{bi("Para transformar un solo espacio (una recámara, la sala, el comedor) y hacerlo por tu cuenta, con una guía clara del estudio.", "For transforming a single space (a bedroom, the living or dining room) on your own, with a clear guide from the studio.")}</dd>
<dt>{bi("Qué recibes", "What you get")}</dt><dd>{bi(li(["Videollamada de 60 minutos", "Moodboard y paleta de color con códigos", "Distribución sugerida", "Muebles e iluminación con links de compra", "3 renders del espacio"]), li(["60-minute video call", "Moodboard and color palette with exact codes", "Suggested layout", "Furniture and lighting with shopping links", "3 renderings of the space"]), "div")}</dd>
<dt>{bi("No incluye", "Not included")}</dt><dd>{bi("Planos técnicos, visitas al espacio ni compras por ti.", "Technical drawings, site visits or purchasing for you.")}</dd>
<dt>{bi("Tamaño y entrega", "Size and delivery")}</dt><dd>{bi("Un espacio de hasta 30 m²; si es mayor cuenta como dos. Entrega en 10 días hábiles después de la sesión.", "One space up to 30 m²; larger spaces count as two. Delivered within 10 business days after the session.")}</dd>
<dt>{bi("Inversión", "Investment")}</dt><dd><span class="price">{bi("MX$8,000", "US$450")}</span><br><span class="muted" style="font-size:14px">{bi("MX$300/m² · mínimo MX$8,000 por espacio", "US$17/m² · minimum US$450 per space")}</span></dd></dl>
<div class="actions"><a class="btn" href="/cotizar">{bi("Cotizar y agendar", "Get a quote and book")}</a></div></section>
<section><p class="small muted">{bi("Remota o presencial", "Remote or in person")}</p>{bi("Proyecto integral", "Full interior design", "h2")}
{bi("Nosotros nos encargamos.", "We take care of it.", "p", "tag")}
<dl><dt>{bi("Para quién", "Who it’s for")}</dt><dd>{bi("Para diseñar tu casa, tu local o varios espacios de principio a fin, sin tener que coordinar nada.", "For designing your home, venue or several spaces from start to finish, without coordinating anything.")}</dd>
<dt>{bi("Qué recibes", "What you get")}</dt><dd>{bi(li(["Concepto y distribución", "Materiales, colores, mobiliario e iluminación", "Renders del proyecto", "Especificaciones completas para ejecutarlo"]), li(["Concept and layout", "Materials, colors, furniture and lighting", "Project renderings", "Full specifications to build it"]), "div")}</dd>
<dt>{bi("No incluye", "Not included")}</dt><dd>{bi("La obra ni los muebles. Si quieres, supervisamos la obra y compramos el mobiliario (se cotiza aparte).", "Construction or furniture. If you like, we supervise the work and buy the furniture (quoted separately).")}</dd>
<dt>{bi("Tiempo", "Timing")}</dt><dd>{bi("De 4 a 8 semanas según el tamaño; lo confirmamos en tu cotización.", "4 to 8 weeks depending on size; confirmed in your quote.")}</dd>
<dt>{bi("Inversión", "Investment")}</dt><dd><span class="price">{bi("Desde MX$15,000", "From US$840")}</span><br><span class="muted" style="font-size:14px">{bi("MX$450/m² · empieza con una llamada de descubrimiento de MX$1,200", "US$25/m² · starts with a US$70 discovery call")}</span></dd></dl>
<div class="actions"><a class="btn" href="/cotizar">{bi("Cotizar y agendar", "Get a quote and book")}</a></div></section>
</div></div>

<section class="sec"><div class="wrap">
<div class="head">{bi("Cómo funciona", "How it works", "h2")}</div>
<div class="process reveal">
<div><span class="small">{bi("Primero", "First")}</span>{bi("Cotizas en línea", "Get a quote online", "h3")}{bi("Seis preguntas sobre tu espacio. Al terminar ves tu cotización aproximada y qué servicio te conviene.", "Six questions about your space. At the end you see your approximate quote and which service fits.", "p")}</div>
<div><span class="small">{bi("Después", "Then")}</span>{bi("Pagas y agendas", "Pay and book", "h3")}{bi("Eliges fecha y hora en el calendario y pagas con tarjeta. Tu lugar queda apartado en cuanto se completa el pago.", "You pick a date and time and pay by card. Your slot is held as soon as the payment goes through.", "p")}</div>
<div><span class="small">{bi("Y luego", "And then")}</span>{bi("Diseñamos", "We design", "h3")}{bi("Nos vemos por videollamada (o en tu espacio), y recibes tu proyecto en los tiempos acordados.", "We meet on video (or at your space), and you receive your project within the agreed timeline.", "p")}</div>
</div></div></section>

<section class="sec paper"><div class="wrap">
<div class="head">{bi("Extras", "Extras", "h2")}</div>
<div class="extras">
<div>{bi("Ejecución y supervisión en obra", "On-site execution and supervision", "h3")}{bi("El complemento presencial de tu proyecto, en cualquier parte de México. Se cotiza según ubicación y alcance.", "The in-person complement to your project, anywhere in Mexico. Quoted by location and scope.", "p")}</div>
<div>{bi("Compra de mobiliario a distancia", "Remote furniture purchasing", "h3")}{bi("Compramos por ti el mobiliario seleccionado; 15% sobre su valor.", "We buy the selected furniture for you; 15% of its value.", "p")}</div>
<div>{bi("Revisión extra · MX$3,500", "Extra revision · US$195", "h3")}{bi("Una ronda más de cambios sobre tu entrega.", "One more round of changes to your delivery.", "p")}</div>
<div>{bi("Render extra · MX$1,500", "Extra rendering · US$85", "h3")}{bi("Una vista adicional de tu espacio.", "One additional view of your space.", "p")}</div>
</div></div></section>
{cta_block()}'''
    return page("servicios", ("Servicios · Calmo Interior", "Services · Calmo Interior"),
                ("Asesoría remota de diseño por espacio desde MX$8,000 y proyecto integral de interiorismo desde MX$15,000. Cotiza en línea y agenda.",
                 "Remote per-space design consultation from US$450 and full interior design from US$840. Get a quote online and book."),
                body, active="servicios")


def about():
    body = f'''<section class="wrap page-head">{bi("El estudio", "The studio", "h1", "page-title")}</section>
<section class="sec tight" style="padding-top:0"><div class="wrap about">
<div class="txt">
{bi("Calmo Interior es un estudio de interiorismo en Guadalajara, dirigido por la arquitecta Cristina Pimentel, egresada del Tecnológico de Monterrey.", "Calmo Interior is an interior design studio in Guadalajara, led by architect Cristina Pimentel, a Tecnológico de Monterrey graduate.", "p")}
{bi("Diseñamos casas, departamentos y espacios de hospitalidad para clientes en México y en el extranjero, a distancia o en persona. Trabajamos con una red de renderistas, carpinteros, proveedores y contratistas que conocemos bien.", "We design houses, apartments and hospitality spaces for clients in Mexico and abroad, remotely or in person. We work with a network of render artists, carpenters, suppliers and contractors we know well.", "p")}
{bi("Lo que buscamos en cada proyecto es sencillo de decir y difícil de lograr: espacios serenos, que funcionen y que se sigan sintiendo bien con los años.", "What we look for in every project is simple to say and hard to do: calm spaces that work and still feel right years later.", "p")}
<div class="facts">
<div><b>2023</b><span>{bi("Fundación", "Founded")}</span></div>
<div><b>MX · EUA · GT · ES</b><span>{bi("Proyectos", "Projects")}</span></div>
<div><b>{bi("Remota y presencial", "Remote and in person")}</b><span>{bi("Modalidad", "Format")}</span></div>
<div><b>Guadalajara</b><span>{bi("Estudio", "Studio")}</span></div></div>
<p style="margin-top:36px"><a class="btn line" href="/contacto">{bi("Escríbenos", "Write to us")}</a></p></div>
<figure>{img("/assets/img/cristina.jpg", "Cristina Pimentel, fundadora de Calmo Interior")}<figcaption>{bi("Cristina Pimentel · Fundadora y directora creativa", "Cristina Pimentel · Founder and creative director")}</figcaption></figure>
</div></section>
{cta_block()}'''
    return page("nosotros", ("Estudio · Calmo Interior", "Studio · Calmo Interior"),
                ("Calmo Interior es el estudio de interiorismo de la arquitecta Cristina Pimentel en Guadalajara. Proyectos remotos y presenciales.",
                 "Calmo Interior is the interior design studio of architect Cristina Pimentel in Guadalajara, Mexico. Remote and in-person projects."),
                body, active="nosotros", og_img="/assets/img/cristina.jpg")


def guides():
    items = [("Color con calma", "Calm color", "Paletas para interiores serenos, con combinaciones listas para usar.", "Palettes for serene interiors, with ready-to-use combinations."),
             ("Espacios pequeños", "Small spaces", "Cómo distribuir y aprovechar cada metro sin obra mayor.", "How to lay out and use every meter without major work."),
             ("Luz en capas", "Layered light", "Luz general, de trabajo y de acento para cambiar cualquier cuarto.", "Ambient, task and accent light to change any room."),
             ("Lo esencial", "The essentials", "Las piezas clave para amueblar tu primer espacio sin errores.", "The key pieces to furnish your first space without mistakes.")]
    cards = "".join(f'<article>{bi(a, b, "h3")}{bi(c, d, "p")}<span class="small muted">{bi("Próximamente", "Coming soon")}</span></article>' for a, b, c, d in items)
    body = f'''<section class="wrap page-head">{bi("Guías", "Guides", "h1", "page-title")}
{bi("Guías descargables para diseñar tu espacio a tu ritmo, con el criterio del estudio paso a paso. Estamos terminando las primeras.", "Downloadable guides to design your space at your own pace, with the studio’s approach step by step. We’re finishing the first ones.", "p")}</section>
<section class="sec tight" style="padding-top:0"><div class="wrap">
{img("/assets/img/guias.jpg", "Propuesta de mobiliario del estudio: piezas, materiales y referencias")}
<div class="guides">{cards}</div>
<form class="notify" id="guides-form"><input type="email" name="email" required autocomplete="email" data-ph-es="Tu correo" data-ph-en="Your email" placeholder="Tu correo"><button class="btn" type="submit">{bi("Avísame", "Notify me")}</button></form>
<p id="guides-msg" style="margin-top:14px"><span class="ok">{bi("Listo. Te escribimos cuando salgan.", "Done. We’ll write when they’re out.")}</span><span class="ko">{bi("No se pudo enviar. Escríbenos a " + EMAIL, "Couldn’t send. Write to us at " + EMAIL)}</span></p>
<p class="muted" style="margin-top:28px">{bi("¿No quieres esperar? La asesoría por espacio incluye una guía hecha para tu cuarto.", "Rather not wait? The per-space consultation includes a guide made for your room.")} <a class="link" href="/servicios">{bi("Ver asesoría", "See consultation")}</a></p>
</div></section>
<style>#guides-msg .ok,#guides-msg .ko{{display:none}}#guides-msg[data-state=ok] .ok,#guides-msg[data-state=err] .ko{{display:inline}}</style>'''
    return page("guias", ("Guías de diseño · Calmo Interior", "Design guides · Calmo Interior"),
                ("Guías descargables de interiorismo para diseñar tu espacio a tu ritmo, con el criterio de Calmo Interior. Próximamente.",
                 "Downloadable interior design guides to design your space at your own pace, with Calmo Interior’s approach. Coming soon."),
                body, active="guias", og_img="/assets/img/guias.jpg")


def contact():
    body = f'''<section class="wrap page-head">{bi("Contacto", "Contact", "h1", "page-title")}
{bi("Si ya sabes lo que quieres, la forma más rápida de empezar es el cotizador. Para todo lo demás, escríbenos.", "If you already know what you want, the quickest way to start is the quote form. For anything else, write to us.", "p")}</section>
<section class="sec tight" style="padding-top:0"><div class="wrap contact">
<div class="rows">
<a href="mailto:{EMAIL}"><span class="small muted">Email</span><span>{EMAIL}</span></a>
<a href="{IG}" target="_blank" rel="noopener"><span class="small muted">Instagram</span><span>@calmointerior</span></a>
<a href="{MAPS}" target="_blank" rel="noopener"><span class="small muted">{bi("Estudio", "Studio")}</span><span>Colomos Providencia, Guadalajara</span></a>
<div><span class="small muted">{bi("Cotizar", "Quote")}</span><span><a href="/cotizar" style="border-bottom:1px solid">{bi("Cotiza tu proyecto en línea", "Get a quote online")}</a></span></div>
</div>
<iframe class="map" src="https://www.google.com/maps?q=Colomos%20Providencia%2C%20Guadalajara%2C%20Jalisco&z=14&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mapa de Colomos Providencia, Guadalajara"></iframe>
</div></section>'''
    return page("contacto", ("Contacto · Calmo Interior", "Contact · Calmo Interior"),
                ("Escríbenos a holacalmo@gmail.com o cotiza tu proyecto en línea. Estudio en Colomos Providencia, Guadalajara.",
                 "Write to holacalmo@gmail.com or get a quote online. Studio in Colomos Providencia, Guadalajara, Mexico."),
                body, active="contacto")


def quote():
    body = f'''<section class="sec tight" id="quote-top"><div class="wrap quote">
<aside>{bi("Cotiza tu proyecto", "Get a quote", "h1")}
{bi("Seis preguntas, unos dos minutos. Al final ves tu cotización aproximada y, si te late, pagas y agendas tu sesión ahí mismo.", "Six questions, about two minutes. At the end you see your approximate quote and, if it feels right, pay and book your session right there.", "p")}
<ol class="qsteps" id="quote-steps"></ol></aside>
<div id="quote-app"><noscript>{bi("Para cotizar necesitas JavaScript activado, o escríbenos a " + EMAIL, "To get a quote please enable JavaScript, or write to " + EMAIL)}</noscript></div>
</div></section>'''
    return page("cotizar", ("Cotiza tu proyecto · Calmo Interior", "Get a quote · Calmo Interior"),
                ("Cotiza tu proyecto de interiorismo en dos minutos y agenda tu asesoría o llamada de descubrimiento con Calmo Interior.",
                 "Get an interior design quote in two minutes and book your consultation or discovery call with Calmo Interior."),
                body, scripts='<script src="/assets/cotizar.js" defer></script>')


def sitemap(paths):
    urls = "".join(f"<url><loc>{SITE}{'/' if p == 'index' else '/' + p}</loc></url>" for p in paths)
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>\n'


def main():
    out = {"index": home(), "proyectos": projects(), "servicios": services(), "nosotros": about(),
           "guias": guides(), "contacto": contact(), "cotizar": quote()}
    for i, p in enumerate(PROJECTS):
        missing = [n for n, _ in p["gallery"] if not (ROOT / ("assets/img/%s-%d.jpg" % (p["slug"], n))).exists()]
        if missing:
            raise SystemExit("Faltan fotos de %s: %s" % (p["slug"], missing))
        out[p["slug"]] = project(p, PROJECTS[(i + 1) % len(PROJECTS)])
    for name, html in out.items():
        (ROOT / f"{name}.html").write_text(html, encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(sitemap(out.keys()), encoding="utf-8")
    print(f"Listo: {len(out)} páginas")


if __name__ == "__main__":
    main()
