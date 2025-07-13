// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
// --- FIX 1: Correct the import to be a default import ---
//import font from 'astro-font'; 
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://mywebsitecvcv.netlify.app',
  
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
    },
    plugins: [tailwindcss()],
    // --- FIX 2: Add the SSR configuration as hinted by the error message ---
    ssr: {
      noExternal: ['astro-font'],
    },
  },

  integrations: [
    preact(),    
    mdx(),
    sitemap(),
    icon({
      include: {
        'lucide': ['*'],
      }
    }),

  ],
});