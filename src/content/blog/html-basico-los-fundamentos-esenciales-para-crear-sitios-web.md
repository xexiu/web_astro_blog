---
title: "HTML Básico: Los fundamentos esenciales para crear sitios Web"
excerpt: "Domina HTML: Crea sitios web de forma sencilla y efectiva. Aprende a
  estructurar contenido y crear enlaces desde cero."
author: Sergiu Mironescu
tags:
  - html
  - hyperlinks
  - html tablas
  - embedding
  - iframes
category: HTML
date: 2023-11-06T13:03:41.642Z
featured_image:
  src: /src/images/html.png
  alt: html
---
Para construir sitios web, es importante comprender HTML, la tecnología esencial para definir la estructura de una página web. HTML se emplea para indicar si el contenido web debe considerarse como un párrafo, lista, encabezado, enlace, imagen, reproductor multimedia, formulario u otro de los muchos elementos disponibles, incluso uno que definas tú mismo.

## Requisitos previos

Antes de comenzar con este tema, deberías tener al menos un conocimiento básico sobre cómo utilizar ordenadores y navegar por la web de forma pasiva, es decir, consumir contenido. Deberías contar con un entorno de trabajo básico configurado según se detalla en la [instalación de software básico](internal-seo--basic-setup) y entender cómo crear y gestionar archivos.

Después de aprender HTML, puedes avanzar y explorar temas más avanzados, como:

* **[CSS Roadmap](internal-seo--css)**, y cómo utilizarlo para dar estilo a tu HTML (por ejemplo, cambiar el tamaño del texto y las fuentes utilizadas, agregar bordes y sombras, diseñar tu página con múltiples columnas, añadir animaciones y otros efectos visuales).
* **[JavaScript Roadmap](internal-seo--javascript)**, y cómo usarlo para agregar funcionalidad dinámica a las páginas web (por ejemplo, encontrar tu ubicación y mostrarla en un mapa, hacer que los elementos de la interfaz de usuario aparezcan/desaparezcan al alternar un botón, guardar los datos de los usuarios localmente en sus computadoras y mucho más).

## HTML: Lenguaje de Marcado de Hipertexto

HTML (Lenguaje de Marcado de Hipertexto) es el bloque de construcción más básico de la web. Define el significado y la estructura del contenido web. Generalmente, se utilizan otras tecnologías además de HTML para describir la apariencia/presentación (CSS) o la funcionalidad/comportamiento (JavaScript) de una página web.

"Hipertexto" se refiere a los enlaces que conectan las páginas web entre sí, ya sea dentro de un mismo sitio web o entre sitios web diferentes. Los enlaces son un aspecto fundamental de la web. Al cargar contenido en Internet y vincularlo a páginas creadas por otras personas, te conviertes en un participante activo en la World Wide Web.

HTML utiliza "marcado" para anotar texto, imágenes y otros contenidos para su visualización en un navegador web. El marcado HTML incluye "elementos" especiales como:

```html
<head>,
<title>,
<body>,
<header>,
<footer>,
<article>,
<section>,
<p>,
<div>,
<span>,
<img>,
<aside>,
<audio>,
<canvas>,
<datalist>,
<details>,
<embed>,
<nav>,
<search>,
<output>,
<progress>,
<video>,
<ul>,
<ol>,
<li>
```

y muchos otros.

Puedes consultar más en [MDN Mozilla](https://developer.mozilla.org/es/docs/Web/HTML/Element/a)

Un elemento HTML se separa del resto del texto en un documento mediante "etiquetas", que consisten en el nombre del elemento rodeado por "<" y ">". El nombre de un elemento dentro de una etiqueta no distingue entre mayúsculas y minúsculas, es decir, se puede escribir en mayúsculas, minúsculas o en una combinación de ambas. Por ejemplo, la etiqueta `<title>` se puede escribir como `<Title>`, `<TITLE>` o de cualquier otra manera. Sin embargo, la convención y la práctica recomendada es escribir las etiquetas en minúsculas.

## ¿Entonces, qué es HTML?

HTML es un lenguaje de marcado que define la organización de tu contenido. HTML se compone de una serie de etiquetas que utilizas para envolver diferentes partes del contenido y así darles una apariencia específica o hacer que funcionen de una manera concreta. Estas etiquetas envolventes pueden convertir una palabra o imagen en un enlace a otro lugar, pueden poner en cursiva palabras, aumentar o disminuir el tamaño de la fuente, y mucho más. Por ejemplo, toma la siguiente línea de contenido:

`Mi gato está de muy mal humor.`

Si quisiéramos que la línea se mantuviera por sí misma, podríamos especificar que es un párrafo encerrándola en etiquetas de párrafo:

```html
<p>Mi gato está de muy mal humor.</p>
```

## Anatomía de un elemento HTML

Ahora exploremos un poco más este elemento de párrafo.

Las partes principales de nuestro elemento son las siguientes:

* **La etiqueta de apertura:** `<p>` Esta consiste en el nombre del elemento (en este caso, p), rodeado por corchetes angulares de apertura y cierre. Esto indica dónde comienza o empieza a surtir efecto el elemento, en este caso, donde comienza el párrafo.
* **La etiqueta de cierre:** `</p>` Es igual que la etiqueta de apertura, excepto que incluye una barra diagonal antes del nombre del elemento. Esto indica dónde termina el elemento, en este caso, donde finaliza el párrafo. No incluir una etiqueta de cierre es uno de los errores típicos de principiantes y puede llevar a resultados inesperados.
* **El contenido:** `Mi gato está de muy mal humor.` Este es el contenido del elemento, que en este caso, es simplemente texto.
* **El elemento:** `<p>Mi gato está de muy mal humor.</p>` La etiqueta de apertura, la etiqueta de cierre y el contenido juntos conforman el elemento.

Los elementos también pueden tener propiedades que tienen el siguiente aspecto:

```html
<p class="cat-black" id="mi-gato-unico">Mi gato está de muy mal humor.</p>
```

Los atributos contienen información adicional sobre el elemento que no deseas que aparezca en el contenido real. En este caso, `class` es el nombre del atributo y `cat-black` es el valor del atributo.

\*El atributo `class` te permite asignar al elemento un identificador **no único*** que se puede utilizar para aplicarle información de estilo y otras cosas (junto con cualquier otro elemento que tenga el mismo valor de clase).

\*El attributo `id`  te permite asignar al elemento un identificador **único*** al elemento.

Algunos atributos no tienen valor, como "required".

## Anidamiento de elementos

También puedes colocar elementos dentro de otros elementos; a esto se le llama anidamiento. Si quisiéramos afirmar que nuestro gato está de muy mal humor, podríamos envolver las palabras <u>de muy mal humor</u> en un elemento `<strong>`, lo que significa que las palabras se deben enfatizar considerablemente:

```html
<p class="cat-black" id="mi-gato-unico">Mi gato está <strong>de muy mal humor</strong>.</p>
```

**El siguiente código HTML es incorrecto:**

```html
<p class="cat-black" id="mi-gato-unico">Mi gato está <strong>de muy mal humor</p></strong>
```

* `<p><strong></strong></p>` Correcto!
* `<p><strong></p></strong>` Incorrecto!

> Los elementos deben abrirse y cerrarse correctamente para que estén claramente dentro o fuera unos de otros. Si se superponen como se muestra arriba, tu navegador web intentará adivinar lo que estabas tratando de decir, lo que puede llevar a resultados inesperados. ¡Así que no lo hagas!

## Elementos vacios

Ciertos elementos no tienen contenido y se llaman [elementos vacíos](https://developer.mozilla.org/es/docs/Glossary/Void_element). Toma el elemento `<img>` como ejemplo:

```html
<img src="assets/logo-min.png" alt="Mi logo" />
```

Esto contiene dos atributos, pero no hay una etiqueta de cierre `</img>` ni contenido interno. Esto se debe a que un elemento de imagen no envuelve contenido para afectarlo. Su propósito es incrustar una imagen en la página HTML en el lugar donde aparece.

## Documento HTML

Eso concluye los conceptos básicos de los elementos HTML individuales, pero no son útiles por sí solos. Ahora veremos cómo se combinan los elementos individuales para formar una página HTML completa. Revisemos el código que colocamos en nuestro ejemplo de index.html (que conocimos por primera vez en el artículo "Lidiando con archivos"):

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Mí primera página HTML</title>
  </head>
  <body>
    <img src="assets/logo-min.png" alt="Mi logo" />
  </body>
</html>
```

En este fragmento, encontramos lo siguiente:

* `<!DOCTYPE html>` — [doctype](https://developer.mozilla.org/es/docs/Glossary/Doctype=). Es un preámbulo requerido. En los albores del tiempo, cuando HTML era joven (alrededor de 1991/92), los doctypes estaban destinados a actuar como enlaces a un conjunto de reglas que una página HTML debía seguir para considerarse buena HTML, lo que podría significar la verificación automática de errores y otras cosas útiles. Sin embargo, en la actualidad, no hacen mucho y básicamente son necesarios para asegurarse de que su documento se comporte correctamente. Eso es todo lo que necesita saber por ahora.
* `<html></html>` — el elemento [html](https://developer.mozilla.org/es/docs/Web/HTML/Element/html). Este elemento envuelve todo el contenido en la página completa y a veces se conoce como el elemento raíz. También incluye el atributo lang, que establece el idioma principal del documento.
* `<head></head>` — el elemento [head](https://developer.mozilla.org/es/docs/Web/HTML/Element/head). Este elemento actúa como un contenedor para todo lo que desea incluir en la página HTML que no es el contenido que se muestra a los espectadores de su página. Esto incluye cosas como palabras clave y una descripción de la página que desea que aparezca en los resultados de búsqueda, CSS para dar estilo a su contenido, declaraciones de juegos de caracteres y más.
* `<meta charset="utf-8">` — Este elemento establece el conjunto de caracteres que debe usar su documento en UTF-8, que incluye la mayoría de los caracteres de la gran mayoría de los idiomas escritos. Básicamente, puede manejar cualquier contenido textual que pueda poner en él. No hay razón para no configurarlo, y puede ayudar a evitar algunos problemas más adelante.
* `<meta name="viewport" content="width=device-width">` — [Este elemento](https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts#mobile_viewports) de la vista asegura que la página se represente al ancho de la ventana gráfica, evitando que los navegadores móviles representen páginas más anchas que la ventana gráfica y luego las reduzcan.
* `<title></title>` — el elemento [title](https://developer.mozilla.org/es/docs/Web/HTML/Element/title). Este establece el título de su página, que es el título que aparece en la pestaña del navegador en la que se carga la página. También se utiliza para describir la página cuando la marca como favorita o la agrega a sus marcadores.
* `<body></body>` — el elemento [body](https://developer.mozilla.org/es/docs/Web/HTML/Element/body). Este contiene todo el contenido que desea mostrar a los usuarios web cuando visitan su página, ya sea texto, imágenes, videos, juegos, pistas de audio reproducibles o cualquier otro tipo de contenido.

## Imágenes

Volvamos nuestra atención al elemento `<img>`:

```html
<img src="assets/logo-min.png" alt="Mi logo" />
```

Como mencionamos antes, incrusta una imagen en nuestra página en la posición en la que aparece. Hace esto a través del atributo src (fuente), que contiene la ruta de nuestro archivo de imagen.

También hemos incluido un atributo alt (alternativo). En el atributo alt, se especifica un texto descriptivo para los usuarios que no pueden ver la imagen, posiblemente debido a las siguientes razones:

* Son discapacitados visuales. Los usuarios con discapacidades visuales significativas a menudo utilizan herramientas llamadas lectores de pantalla para leerles el texto alternativo.
* Algo ha salido mal y la imagen no se muestra. Por ejemplo, intente cambiar deliberadamente la ruta dentro de su atributo src para que sea incorrecta. Si guarda y vuelve a cargar la página, debería ver algo como esto en lugar de la imagen: `Mi logo`.
* Se puede hacer uso del atributo `onerror` en caso de que nuestra imagen no se encuentra (404 not found) o no puede cargarse. E aquí un ejemplo del uso de `onerror`:

```html
<img src="invalid_link" alt="Mi logo"
     onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"
/>
```

> Las palabras clave para el texto alternativo son "texto descriptivo". El texto alternativo que escriba debe proporcionar al lector suficiente información para que tenga una buena idea de lo que transmite la imagen. En este ejemplo, nuestro texto actual "Mi logo" no es en absoluto adecuado. Una alternativa mucho mejor para nuestro logo sería "Xexiu dev logo: símbolo de un comando bash".

- - -

> **Note**
> [Aprende más sobre accesibilidad](internal-seo--html5-accesibility) en nuestra sección de aprendizaje sobre accesibilidad.

## Encabezados

Los elementos de encabezado te permiten especificar que ciertas partes de tu contenido son encabezados o subtítulos. De la misma manera que un libro tiene un título principal, títulos de capítulos y subtítulos, un documento HTML también puede tenerlos. HTML contiene 6 niveles de encabezado, `<h1> - <h6>`, aunque normalmente solo usarás 3 o 4 como máximo:

```html
<h1>Título Principal</h1>
<h2>Título secundario</h2>
<h3>Subtítulo</h3>
<h4>Sub-subtítulo</h4>
<h5>título pequeño</h5>
<h6>título muy muy pequeño</h6>
```

> **Note**
> Cualquier cosa en HTML que esté entre `<!-- y -->` es un comentario HTML. El navegador ignora los comentarios al renderizar el código. En otras palabras, no son visibles en la página, solo en el código. Los comentarios en HTML son una forma de escribir notas útiles sobre tu código o lógica.

```html
<!-- Esto es un comentario y no se visualiza en la web -->
<h1>Título principal</h1>
```

> **Note**
> Verás que tu nivel de encabezado 1 tiene un estilo implícito. No uses elementos de encabezado para hacer que el texto sea más grande o en negrita, ya que se utilizan por razones de [accesibilidad](internal-seo--html5-accesibility) y otras, como [SEO](internal-seo--seo). Intenta crear una secuencia significativa de encabezados en tus páginas sin omitir niveles.

### Párrafos

Como se explicó anteriormente, los [elementos p](https://developer.mozilla.org/es/docs/Web/HTML/Element/p) `<p>` se utilizan para contener párrafos de texto; los usarás con frecuencia al marcar contenido de texto regular.

```html
<p>Esto es un páragrafo simple</p>
```

## Listas

Gran parte del contenido web son listas y HTML tiene elementos especiales para ellas. La marcación de listas siempre consta de al menos 2 elementos. Los tipos de listas más comunes son las listas desordenadas y ordenadas:

* Las listas desordenadas son para listas en las que el orden de los elementos no importa, como una lista de compras. Estas se envuelven en un elemento `<ul>`.
* Las listas ordenadas son para listas en las que el orden de los elementos importa, como una receta. Estas se envuelven en un elemento `<ol>`.
* Cada elemento dentro de las listas se coloca dentro de un elemento `<li>` (elemento de lista).

Por ejemplo, si quisiéramos convertir la parte del siguiente fragmento de párrafo en una lista:

```html
<p>
  Somos una comunidad global de tecnólogos, pensadores y constructores que trabajan juntos...
</p>
```

Podríamos modificar el marcado a esto, haciendo use de `ul` (lista no ordenada):

```html
<p>Somos una comunidad global de</p>

<ul>
  <li>tecnólogos</li>
  <li>pensadores</li>
  <li>constructores</li>
</ul>

<p>que trabajan juntos...</p>
```

Y si queremos una lista ordenada, podemos hacer use de `ol`:

```html
<p>La lista de la compra:</p>

<ol>
<li>Leche</li>
<li>Pan</li>
<li>Cerveza</li>
</ol>
```

## Enlaces

Los enlaces son muy importantes, ¡son lo que hace que la web sea una web! Para agregar un enlace, necesitamos usar un elemento simple: `<a>`, donde [a](https://developer.mozilla.org/es/docs/Web/HTML/Element/a) es la forma corta de "anclaje". Para convertir el texto dentro de tu párrafo en un enlace, sigue estos pasos:

1. Elige algún texto. En este caso, elegimos el texto "Buscador de Google".
2. Envuelve el texto en un elemento `<a>`, como se muestra a continuación:

```html
<a>Buscador de Google</a>
```

3. Añade al elemento `<a>` un atributo href, como se muestra a continuación:

```html
<a href="">Buscador de Google</a>
```

4. Rellena el valor de este atributo con la dirección web a la que deseas que enlace el vínculo.

```html
<a href="https://www.google.com/">
  Buscador de Google
</a>
```

Puedes obtener resultados inesperados si omites la parte "https://" o "http://" al comienzo de la dirección web, llamada [protocolo](internal-seo--protocolo-HTTP). Después de crear un enlace, haz clic en él para asegurarte de que te lleve a donde deseas.

## Conclusión

Si has seguido todas las instrucciones de este artículo, deberías terminar con una página que luzca como la que se muestra a continuación [también puedes verla aquí](/demos/html_css/primer-html)

![Mi primer html](/src/images/image-test.png "Mi Primer html")

> Seguir aprendiendo:

* [HTML Multimedia y embedding](internal-seo--html-multimedia-embedding)
* [HTML Formularios](internal-seo--html-forms)
* [HTML Tablas](internal-seo--html-tables)
