// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://yifeigu.github.io',
  // Uncomment and set base if deploying to a subpath:
  // base: '/yfg_landing',
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
