import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bezkompresemedia.cz',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Passthrough preserves raw photo URLs in galleries (public/images/).
  // Images imported from src/assets/ are still processed by Sharp at build time.
  image: {
    service: passthroughImageService(),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bezkompresemedia.cz',
      },
    ],
  },
});
