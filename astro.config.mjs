// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [preact()],
  site: 'https://mpz.im',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});