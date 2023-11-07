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

* **[CSS](internal-seo--css)**, y cómo utilizarlo para dar estilo a tu HTML (por ejemplo, cambiar el tamaño del texto y las fuentes utilizadas, agregar bordes y sombras, diseñar tu página con múltiples columnas, añadir animaciones y otros efectos visuales).
* **[JavaScript](internal-seo--javascript)**, y cómo usarlo para agregar funcionalidad dinámica a las páginas web (por ejemplo, encontrar tu ubicación y mostrarla en un mapa, hacer que los elementos de la interfaz de usuario aparezcan/desaparezcan al alternar un botón, guardar los datos de los usuarios localmente en sus computadoras y mucho más).

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

Puedes consultar más [aquí](https://developer.mozilla.org/es/docs/Web/HTML/Element/a)

Un elemento HTML se separa del resto del texto en un documento mediante "etiquetas", que consisten en el nombre del elemento rodeado por "<" y ">". El nombre de un elemento dentro de una etiqueta no distingue entre mayúsculas y minúsculas, es decir, se puede escribir en mayúsculas, minúsculas o en una combinación de ambas. Por ejemplo, la etiqueta `<title>` se puede escribir como `<Title>`, `<TITLE>` o de cualquier otra manera. Sin embargo, la convención y la práctica recomendada es escribir las etiquetas en minúsculas.

> Seguir aprendiendo:

* [HTML Multimedia y embedding](internal-seo--html-multimedia-embedding)
* [HTML Formularios](internal-seo--html-forms)
* [HTML Tablas](internal-seo--html-tables)
