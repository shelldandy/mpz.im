---
title: Shopify JS Codesplit and Lazy-Loading with Webpack 4
date: 2018-05-11
layout: Post
---

# Shopify JS Codesplit and Lazy-Loading with Webpack 4
Can it get more SEO-friendly? 😋

I swear I searched something along those lines for way too long, probably around 2 years every month or so.

## TL;DR
[Demo!](https://pixelbikeshop.myshopify.com/)

Open up your console on Chrome and click the button!

## Why is this a problem?
Well thanks for asking 😉 basically Shopify has its own CDN thing which cache-busts the files you usually access it like this:

```liquid
Inside a liquid file...
{{ 'somefile.js' | asset_url }}

Becomes...

//cdn.shopify.com/s/files/1/2577/1972/t/5/assets/somefile?6997867469058749431
```

So as you can see that path is not that predictable and overall not cool to mess around with. Except I noted 2 major things:

- Even if everything changes all of your theme files live in the same folder so that means the `//cdn.shopify.com/s/files/1/2577/1972/t/5/assets/` is consistent along all your files
- You can request even files that don't exist...

For code split we actually need to set the `config.output.publicPath` and it turns out you can actually set that up at runtime: 
[See relevant docs](https://webpack.js.org/configuration/output/#output-publicpath)

Quoting from there:

> In cases where the publicPath of output files can't be known at compile time, it can be left blank and set dynamically at runtime in the entry file using the free variable __webpack_public_path__.

```js
__webpack_public_path__ = myRuntimePublicPath
// rest of your application entry
```

> See this [discussion](https://github.com/webpack/webpack/issues/2776#issuecomment-233208623) for more information on __webpack_public_path__.

BINGO!!

## Making the magic happen
So with that knowledge in hand let's do a bit of liquid hacking because what is not a hack in Shopify Development anyways??

`layout/theme.liquid`

```liquid
  {% capture randomFile %}{{ 'esketit.js' | asset_url }}{% endcapture %}
  {% assign assetsPath = randomFile | split: 'esketit.js' | first %}
  <script>
    window.__webpack_public_path__ = "{{ assetsPath }}"
  </script>
```

Create a `public-path.js` file on your root of your JS entry point and add this:

```js
__webpack_public_path__ = window.__webpack_public_path__
```

And in your entry point add this right on top:

```js
import './public-path'
```

So now this sort of works except Shopify uses some very hard cache and now when you require the files you just ask for their normal name so tweak your `webpack.config.js` 

```js
module.exports = {
 // rest of config blah blah
 output: {
   // rest of output blah
   chunkFilename: '[name].chunk.[chunkhash:5].js',
 }
}
```

And with that we'll now require the chunks by the hash Webpack generates and not the one Shopify Generates.

## Conclusion
Yeah, it's hacky but it works and so far no one has come up with a solution so here's mine hoping we can improve it together.

So far these cool insights are now part of our [Shopify Generator](https://www.npmjs.com/package/@pixel2html/generator-shopify) from Pixel2HTML (where I work and maintain our OSS Endeavors) so you can try that right now if you want to without configuring anything.

[Demo!](https://pixelbikeshop.myshopify.com/)

[npm repo](https://www.npmjs.com/package/@pixel2html/generator-shopify)

[Code and Example Repo](https://github.com/Pixel2HTML/Pixel2HTML/tree/master/packages/generator-shopify)
