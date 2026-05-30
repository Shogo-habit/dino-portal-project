import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dino-portal-project.vercel.app',
  integrations: [sitemap()],
});
