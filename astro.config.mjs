import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dino-portal.com',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://dino-portal.com/my-collection/' && page !== 'https://dino-portal.com/my-collection',
    }),
  ],
});
