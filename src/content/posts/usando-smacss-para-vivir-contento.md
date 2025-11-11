---
author: mike3run
comments: true
date: 2015-09-24 14:15:52+00:00
layout: Post
link: http://www.miguel.click/blog/2015/09/24/usando-smacss-para-vivir-contento/
slug: usando-smacss-para-vivir-contento
title: Usando SMACSS para Vivir Contento
wordpress_id: 11338
categories:
- Article
---
Una cosa es escribir código solo para tu uso personal y otra cosa es trabajar en equipo e incluso cuando el tema es personal, regresar a tu viejo código puede llegar a ser algo terrible 😐.

Por suerte una serie de humanos muy inteligentes pensaron en [una manera muy buena de organizar nuestro CSS](https://smacss.com/) más o menos como funcionan las opciones y caminos en la terminal.

**SMACSS: Scalable and Modular Arquitechture for CSS**

## Los Básicos

La situación funciona en pocas palabras así:

**Vamos a ir escribiendo nuestro CSS de manera que todo sea pensado en cuestión de módulos y objetos reusables.**

Para lograr esa situación podemos dividir nuestro CSS en varias secciones que facilitarán nuestra vida tremendamente como son:

*   Base
*   Layuout (Estructura)
*   Modules (Módulos)
*   States (Estados)
*   Utilities (Herramientas/Utilidades)
*   Variables

De esta manera la vida se vuelve un poco más hermosa pero…

<figure>![We have it!](https://i1.wp.com/media1.giphy.com/media/CTX0ivSQbI78A/giphy.gif)

<figcaption>We have it!</figcaption>

</figure>

**¡Podemos hacer más!**

## Meet Sass

Quizá esto sea un poco más avanzado de lo escrito hasta ahora pero si nunca has usado Sass… pues que pena 👻. En verdad Sass te ayuda a vivir la vida de manera más feliz en cuanto a CSS respecta.

Sass es un preprocesador de CSS que corre [en la terminal](https://www.iterm2.com/) [o en programas especiales](https://incident57.com/codekit/). Te ayuda a que tu CSS sea bonito, modular y fácil de escribir. La herramienta perfecta para todo developer.

[Aprende más de Sass en su sitio web oficial](http://sass-lang.com/)

Sass tiene 2 estilos de escritura: **.scss** y **.sass**. Si eres un pequeñín entonces lo recomendado para ti es la sintaxis **Scss** pues es idéntica a como ya estás acostumbrado a escribir CSS. Osea, es el paso ideal para dar el salto. Puedes seguir escribiendo CSS normal pero cuando te decidas le puedes ir dando super poderes.

## Sass + SMACSS = 💁

Bueno bueno, ya aprendiste a usar Sass y estás listo para más (jojo la rima loca) ¿entonces qué sigue? pues sigue aplicar tus conocimientos de manera hermosa y modular usando la metología SMACSS así que vamos adelante.

### Imports

Una cosa hermosa de Sass es que puedes importar muchos archivos uno dentro de otro (espera, ¿qué no CSS normal puede hacer eso de por si?). Erm si, la diferencia está en que con CSS cada “import” que haces genera una petición nueva al servidor lo cual pues genera tiempos y pues si leiste mi post sobre [**Diseño Web Responsivo y Responsable**](http://www.miguel.click/blog/2015/09/09/disen%CC%83o-web-responsable-parte-1/) entonces pues sabrás que mientras más llamadas al servidor peor.

Por eso la _diferencia Sass_ es que puedes importar varios archivos pero al final todos se exportan y concatenan en un mismo archivo para que en tu markup solo hagas referencia a un solo archivo minimizado.

Ejemplo:

```
// Una manera hermosa de tener tu archivo Sass padre
@import base
@import layout
@import modules
etc…

```

De esta manera puedes tener solo los imports en tu archivo padre mientras que en todos los demás tienes fragmentos de código muy específicos que van a simplificarte la vida a la hora de regresar.

### 1 Base

El primer elemento a considerar en tu Sass con SMACSS es el de la Base, esto quiere decir todo tipo de ajustes universales que haces al documento entero como resets (normalize, reset). En este paso todavía no vemos nada relacionado a IDs o clases por ejemplo:

```
@import reset
*
    box-sizing: border-box
body
    margin: 0px
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif
    font-weight: 300

h1
    font-size: 1.5 em

a
    color: tomato
    font-size: 0.8 em
    &:hover
    color: blue
//etc…

```

### 2 Layout

En la sección de layout vamos a poner todo tipo de situaciones que nos ayuden a acomodar nuestro contenido de manera general ya entrando un poco a nuestras IDs.

Por ejemplo acá vamos a usar las técnicas para mandar contenido a la derecha, izquiera, centrar texto y demás.

```
#container
    padding: 0.5 em

.centrado
    text-align: center

.l-left
    justify-content: flex-start

.l-right
    justify-content: flex-end

// etc

```

<figure>![MRW I get this.](https://i1.wp.com/i.imgur.com/Q8Fv0M9.jpg)

<figcaption>MRW I get this.</figcaption>

</figure>

### 3 Modules

Acá es donde viene lo sabroso e interesante de todo para entender esto vamos a ver primero un poco de nuestro markdown super obvio en Jade plis. Lo bonito de Jade es que es básicamente Sass pero para HTML entonces se puede usar manera modular y bella igual.

```
header#menu
    ul.nav
        li.nav--item Inicio
        li.nav--item-selected Blog
        li.nav--item Contacto
        li.nav--item--search
            input(type=“search”)

```

Entonces si nos vamos dando cuenta de esta situación hermosa podemos deducir un par de cosas:

*   Los IDs solo se usan para nombrar a las secciones mayores
*   Las clases nos sirven para describir módulos
*   Al entrar en los módulos (ul-> li) podemos saber claramente que la clase de .nav–item es clase hija de .nav. **Osea, es entendible**
*   Estamos _entrando_ cada vez más usando dos guiones “–“ y estamos pasando opciones con solo uno “-“

Pero ahora podemos ver como esto funciona de manera mucho más bonita en Sass ya que ahí tenemos una herramienta muy poderosa conocida como “&”.

“&” nos permite _llamar_ todo lo anterior a ella sin tener que escribirlo por ejemplo

```
.nav
    font-size: 1em
    &--item
        color: white
        &--search
            font-size: 1.1em
        &-selected
            color: red

```

Nos da como resultado

```
.nav {
  font-size: 1em; }
  .nav--item {
    color: white; }
    .nav--item--search {
      font-size: 1.1em; }
    .nav--item-selected {
      color: red; }

```

<figure>![Lo se, lo se](https://i1.wp.com/i.imgur.com/DWrI2JY.gif)

<figcaption>Lo se, lo se</figcaption>

</figure>

### Lo demás

Aún puedes segmentar mucho más con opciones, utilidades, variables y estados.

Creo que este artículo apenas empieza a hacer justicia a esta nueva manera de pensar. Realmente apenas leí sobre esto y vi un video al respecto por lo que soy tan nuevo en esto como tu. Si quieres saber más sobre este tema recomiendo las siguientes fuentes.

Haré un pequeño boilerplate y lo subiré a mi Github así que pendientes 😄

**Video tutorial en inglés**

<span class="embed-youtube" style="text-align:center; display: block;"><iframe class="youtube-player" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/6co781JgoqQ?version=3&amp;rel=1&amp;fs=1&amp;autohide=2&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent" allowfullscreen="true" style="border:0;"></iframe></span>

[**SMACSS sitio oficial**](https://smacss.com/)
