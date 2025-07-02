// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://mywebsitecvcv.netlify.app',
  
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    mdx(), 
    sitemap(), 
    // We only need the Lucide pack now. The custom collection is gone.
    icon({
      include: {
        'lucide': ['*'],
      }
    })
  ],
});