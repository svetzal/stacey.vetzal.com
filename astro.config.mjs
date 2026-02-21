import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkResolveImages from './src/plugins/remark-resolve-images.mjs';

export default defineConfig({
  site: 'https://stacey.vetzal.com',
  integrations: [tailwind(), sitemap()],
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkResolveImages],
  },
});
