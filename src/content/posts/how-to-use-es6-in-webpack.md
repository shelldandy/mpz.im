---
title: How to use ES6 on Webpack
date: 2017-03-05
layout: Post
# hero: TBD
---

## I just wasted 2 days of my life so you don't have to

![That was me yesterday 100% Real No
Fake](https://media0.giphy.com/media/ReImZejkBnqYU/200w.gif)

So you're a brave or curious person who decided to try out to build
a webpack configuration from scratch and since before that you've used
those push-button-receive-bacon configs you were expecting to be able to
use those fancy pants `import something from 'module'` but hey breaking
news: Node doesn't work that way, at least not out of the box.

So here's what you will need to get that thing working:

```
yarn add babel-{cli,preset-env,core}
```

That will install babel-cli, babel-preset-env and babel-core now in your
folder where you keep you `webpack.conf.js` or similar plop another
`.babelrc` file. (Yeah, I know ANOTHER) and add the following:

```.json
{
  "presets": [
    ["env", {
      "targets": {
        "node": 4
      }
    }]
  ]
}
```

So basically that tells babel, hey translate your stuff so even Node 4 and
upwards can understand modules kthanksbai.

Now adjust your scripts inside your `package.json` as follows:


```.json
{
  "scripts": {
  "build": "babel-node node_modules/.bin/webpack"
  }
}
```

You can rename it accordingly but you get the drill. Basically we are
running a version of babel that executes node stuff and it transpiles your stuff as well.

Now just run `yarn run build` and much wow it works!
