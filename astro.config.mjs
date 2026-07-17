import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Default (Sharp) image service optimizes images imported from src/assets/.
// Files in public/ (gallery photos) are always copied as-is, no config needed.
export default defineConfig({
  site: 'https://bezkompresemedia.cz',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
