import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bezkompresemedia.cz',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bezkompresemedia.cz',
      },
    ],
  },
});
