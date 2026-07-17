import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://dino-portal.com',
  redirects: {
    '/dictionary/kamuyasaurus': '/dictionary/kamuysaurus/',
  },
  integrations: [sitemap({
    filter: (page) => page !== 'https://dino-portal.com/my-collection/' && page !== 'https://dino-portal.com/my-collection',
  }), mdx()],
});