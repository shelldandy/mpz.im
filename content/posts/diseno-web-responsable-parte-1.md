---
author: mike3run
date: 2015-09-09 14:36:08+00:00
layout: Post
link: http://www.miguel.click/blog/2015/09/09/disen%cc%83o-web-responsable-parte-1/
title: Diseño Web Responsable Parte 1
---
## Una guía básica de supervivencia para el mundo digital

Luego de ya llevar alrededor de un año ganando experiencia en el campo del desarrollo web he ido aprendiendo ciertas cosas que puede que sean muy sútiles pero pueden cambiar de manera muy drástica la experiencia de usuario en una página lo cual puede ser la diferencia entre un visitante que se vuelve cliente o que ve lo que quieres que vea a alguien que simplemente se va.

![El libro en si mismo](http://i2.wp.com/www.miguel.click/wp-content/uploads/2015/09/ABA-hero-13.png?resize=611%2C293 "El libro en sí mismo")

Estas “reglas” son algo que Scott Jehl autor del libro **[Responsible Responsive Design](http://abookapart.com/products/responsible-responsive-design)** hace referencia para hablar de prácticas responsables a la hora de desarrollar un sitio web o escribir una entrada en un blog y demás. En pocas palabras debes de pensar y entender que no todo el mundo tiene una Macbook Pro con pantalla retina e internet de 200 Megas o un iPhone 6 Plus con 4G a 40Mb.

**No.**

La realidad es que muchas, muchísimas personas navegan usando celulares de gama media-baja. Usando velocidades 3G o menos. Incluso puede que personas naveguen en su laptop pero conectados a través de su celular a modo de modem (trabalenguas jaja) o de la misma forma quizá estén en su trabajo o casa relajados con el celular pero disfrutando de una velocidad de internet mayor a lo que uno esperaría en un celular normal.

Si a eso le sumamos la magnitud de aparatos que hay ahora y que salen y salen todo el tiempo pues es necesario estar preparados para lo impensable. En pocas palabras debemos aprovechar hasta el más mínimo kb posible para optimizar nuestros sitios web. Hay algunas prácticas que son sencillas de implementar otras requieren más habilidad pero las iré mencionando todas en orden.

### Optimizar Imágenes

Este proceso puede hacer una de las diferencias más significativas a la hora de que una persona visite tu sitio web o baje tu app o abra tu mail o lo que sea realmente.

Tenemos la costumbre por _culpa_ de los celulares y las cámaras de muchos megas de subir fotos directamente del tamaño que salen de nuestro aparato. Y pues esto está bien si las quieres subir a Flickr o si tu sitio se trata de fotos pues va. Pero normalmente eso lo único que va a hacer es subir el tamaño de tu archivo unas 10 o muchas más veces.

Para lograr eso lo primero que tenemos que hacer es pensar en el tamaño que va a ocupar tu imágen en pixeles en donde la vas a usar y entonces si ajustala a ese tamaño. Podemos hacer eso desde la app más sencilla como Paint en Windows o Vista Previa en Mac.

Y bueno aunque eso puede llegar a ser suficiente pero pues si ya andas leyendo eso pues vas por Tokyo ¿no?

El siguiente paso (o pasos) son optimizar las imágenes usando primero una degradación lossy, eso quiere decir que al bajar por ejemplo el número de colores o la saturación de pixeles pues se baja muchísimo el tamaño del archivo aunque también se pierde definición. Por eso se llama _Lossy._ Esto es lograble tanto con varios programas de edición de fotos pero en mi opinión el Rey Eterno será Photoshop al menos en el corto y mediano plazo. Con su opción de “Guardar para Web” se pueden hacer muchas cosas.

Debo recordarles que no hay una fórmula escrita para siempre tener buenos resultados pues esto varía dependiendo de cada imágen a la que quieras optimizar. En pocas palabras: **optimizar imágenes para internet es un arte.** Si bien alguna vez jpg hace la chamba otras veces gif será el candidato ideal o también png. Todo depende y es parte de tu deber experimentar hasta encontrar la mejor manera de resolverlo.

El paso final consiste en darle el tratamiento _Lossless._ Eso consiste en pasar las imágenes por un último filtro donde se consigue recortarles un último pedazo de tamaño pero sin tener degradación en la calidad de imagen, osea sin perder detalle.

Mi estandar ideal (algo reciente) es generar imágenes de menos de 50 kb cada una buscando un resultado donde no se pierda tanto detalle.![](http://i1.wp.com/www.miguel.click/wp-content/uploads/2015/09/1_swim.jpg?resize=500%2C252 "Esta foto pesaba 11Mb inicialmente")

### Uso de SVG

Existe un curioso formato de imágenes que es [soportado por prácticamente todos los navegadores modernos](http://caniuse.com/#search=svg) y lo genial que tiene es que estás hablando de vectores y no pixeles. Lo cual es muy muy útil pues con un solo archivo aseguras que tu logo, dibujo, elemento, etc. Se vea delicioso y perfecto en aparatos de cualquier tamaño.

Estos archivos se pueden usar idéntico a un jpg o gif o lo que sea.

    <img class="“logo" src="“logo.svg”" alt="“Nuestro Logo" />

    .logo {

    background-image: url(‘../img/logo.svg');

    }

O incluso se pueden usar así directamente como código fuente en el HTML (ideal para cargar extra rápido y para animar, aunque no tan bueno para guardar en cache).

```html
    <svg width="256px" height="258px" viewBox="0 0 256 258" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
      <g fill="none" transform="translate(2.000000, 2.000000)">
        <rect fill="#DC4E41" filter="url(#filter-1)" x="0" y="0" width="252" height="252" rx="7"></rect>
        <path d="M100.8,119.7 L100.8,134.82 L125.811,134.82 C124.803,141.309 118.251,153.846 100.8,153.846 C85.743,153.846 73.458,141.372 73.458,126 C73.458,110.628 85.743,98.154 100.8,98.154 C109.368,98.154 115.101,101.808 118.377,104.958 L130.347,93.429 C122.661,86.247 112.707,81.9 100.8,81.9 C76.419,81.9 56.7,101.619 56.7,126 C56.7,150.381 76.419,170.1 100.8,170.1 C126.252,170.1 143.136,152.208 143.136,127.008 C143.136,124.11 142.821,121.905 142.443,119.7 L100.8,119.7 L100.8,119.7 Z" fill="#FFFFFF"></path>
        <path d="M100.8,120.456 L142.443,120.456 C142.884,122.535 143.136,124.74 143.136,127.386 L143.136,126.945 C143.136,124.047 142.821,121.842 142.443,119.637 L100.8,119.637 L100.8,120.456 L100.8,120.456 Z M100.8,82.656 C112.455,82.656 122.283,86.877 129.843,93.807 L130.284,93.366 C122.661,86.247 112.707,81.9 100.8,81.9 C76.419,81.9 56.7,101.619 56.7,126 L56.7,126.378 C56.952,102.249 76.608,82.656 100.8,82.656 L100.8,82.656 Z M100.8,154.602 C118.251,154.602 124.803,142.128 125.811,135.576 L125.622,135.576 C124.236,142.254 117.621,153.783 100.8,153.783 C85.869,153.783 73.71,141.498 73.521,126.378 C73.521,126.504 73.458,126.63 73.458,126.756 C73.458,142.128 85.743,154.602 100.8,154.602 L100.8,154.602 Z" opacity="0.4" fill="#FFFFFF"></path>
        <path d="M100.8,98.154 C85.743,98.154 73.458,110.628 73.458,126 C73.458,126.126 73.521,126.252 73.521,126.378 C73.71,111.195 85.869,98.973 100.8,98.973 C109.368,98.973 115.101,102.627 118.377,105.777 L130.347,94.248 C130.221,94.122 130.032,93.996 129.906,93.87 L118.377,105.021 C115.101,101.871 109.368,98.154 100.8,98.154 L100.8,98.154 Z M100.8,134.82 L100.8,135.576 L125.622,135.576 C125.685,135.324 125.748,135.009 125.811,134.82 L100.8,134.82 L100.8,134.82 Z" opacity="0.1" fill="#3E2723"></path>
        <path d="M100.8,170.1 C76.608,170.1 56.952,150.57 56.7,126.378 L56.7,126.756 C56.7,151.137 76.419,170.856 100.8,170.856 C126.252,170.856 143.136,152.964 143.136,127.764 L143.136,127.386 C142.947,152.397 126.126,170.1 100.8,170.1 L100.8,170.1 Z" opacity="0.1" fill="#3E2723"></path>
        <path d="M195.3,119.7 L182.7,119.7 L182.7,107.1 L170.1,107.1 L170.1,119.7 L157.5,119.7 L157.5,132.3 L170.1,132.3 L170.1,144.9 L182.7,144.9 L182.7,132.3 L195.3,132.3" fill="#FFFFFF"></path>
        <path d="M182.7,119.7 L195.3,119.7 L195.3,120.456 L182.7,120.456 L182.7,119.7 Z M170.1,107.1 L182.7,107.1 L182.7,107.856 L170.1,107.856 L170.1,107.1 Z M157.5,119.7 L170.1,119.7 L170.1,120.456 L157.5,120.456 L157.5,119.7 Z" opacity="0.4" fill="#FFFFFF"></path>
        <path d="M157.5,132.3 L170.1,132.3 L170.1,133.056 L157.5,133.056 L157.5,132.3 Z M182.7,132.3 L195.3,132.3 L195.3,133.056 L182.7,133.056 L182.7,132.3 Z M170.1,144.9 L182.7,144.9 L182.7,145.656 L170.1,145.656 L170.1,144.9 Z" opacity="0.1" fill="#3E2723"></path>
        <path d="M25.2,25.2 L226.8,25.2 L226.8,226.8 L25.2,226.8 L25.2,25.2 Z"></path>
      </g>
    </svg>
```

### Unificar archivos y minimizarlos

Ahora si ya se anda poniendo más sabrosón el tema. Verás cada que haces una referencia a un archivo CSS o JS en tu HTML estás haciendo una petición al servidor (tuyo o externo) y eso toma tiempo en ser contestado, procesado, enviado y recibido. Si tienes muchos archivos lo mejor es combinarlos todos en uno solo de cada tipo para que entonces solo hagas una petición al servidor y todo funcione de manera más hermosa.

Otra cosa clave es que es muy diferente presentar código para que lo lea otra persona a presentar código para que lo lea una computadora. A las computadoras no les importa que se vea bonito, bien indentado, legible, etc. Para una computadora los espacios vacíos le importan menos de nada pero en el archivo cada caracter es un precioso byte que le estás descontando a tu usuario de sus Megas carísimos que tenemos en México 😭. Por eso es buena práctica minimizar tus archivos ya para cargarlos y usarlos en vivo. Hay muchas maneras de lograr esto desde [sitios web](http://refresh-sf.com/), pasando por [tecnología](http://gruntjs.com/) [open source](http://gulpjs.com/) a [software de paga](https://incident57.com/codekit). En lo personal uso Codekit porque me permite usar JS modular cosa que normalmente no es posible hacer y pues no tengo que andar pensando tanto en configuraciones y demás. Para mi CSS uso Sass.

![Que hermosura](http://i1.wp.com/www.miguel.click/wp-content/uploads/2015/09/Sass.png?resize=540%2C480 "Que hermosura")

Y bueno creo que ya me pasé de lanza en cuanto a palabras así que buscaré seguir este post mañana.

**Cheers!**
