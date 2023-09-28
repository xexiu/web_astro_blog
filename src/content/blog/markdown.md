---
title: Markdown Cheat Sheet
date: 2023-09-22T17:14:10+02:00
category: general
excerpt: This is a short except about, This is a short except about, This is a
  short except about, This is a short except about
author: Sergiu Mironescu
featured_post: false
tags:
  - markdown
featured_image:
  alt: featured
  src: src/images/screen-shot-2023-08-31-at-08.19.44-am-2-.png
---
```astro
  import Welcome from "../../components/Welcome.astro";

## This is a component

  <Welcome text="Sergiu" />
```

Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro. TEST3

![alt text](/src/images/hero-img.png "alt title")

[An Internal Link](/about)

[This is an external link to genome.gov](https://www.genome.gov/)

## Headings

  The following HTML `<h1>`—`<h6>` elements represent six levels of section headings. `<h1>` is the highest section level while `<h6>` is the lowest.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

  Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

  Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Blockquotes

  The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.

#### Blockquote without attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.\
> **Note** that you can use *Markdown syntax* within a blockquote.

#### Blockquote with attribution

> Don't communicate by sharing memory, share memory by communicating.

## Tables

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| *italics* | **bold** | `code` |

  *italicized text*

## Code Blocks

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <p>Test</p>
</body>
</html>
```

## List Types

#### Ordered List

1. First item
2. Second item
3. Third item

#### Unordered List

* List item
* Another item
* And another item

#### Nested list

* Fruit

  * Apple
  * Orange
  * Banana
* Dairy

  * Milk
  * Cheese

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

### My Great Heading {#custom-id}

term
: definition

~~The world is flat.~~

* Write the press release
* Update the website
* Contact the media

That is so funny! :joy:

I need to highlight these ==very important words==.

H\~2\~O

X^2^