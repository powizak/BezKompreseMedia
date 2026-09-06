import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Default (Sharp) image service optimizes images imported from src/assets/.
// Files in public/ (gallery photos) are always copied as-is, no config needed.
export default defineConfig({
  site: 'https://bezkompresemedia.cz',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // /dekujeme/ is a noindex thank-you page; /mcp-data.json is a data endpoint
      // for the PHP MCP server — keep both out of the sitemap
      filter: (page) => !page.includes('/dekujeme/') && !page.includes('/mcp-data.json'),
    }),
  ],
});
