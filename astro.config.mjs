// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// GitHub Pages: project sites use /repo-name; user/org sites (username.github.io) use /
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserSite =
  repoName?.endsWith('.github.io') ||
  process.env.ASTRO_BASE === '/';
const base =
  process.env.ASTRO_BASE ??
  (repoName && !isUserSite ? `/${repoName}` : '/');

const site =
  process.env.ASTRO_SITE ??
  (base === '/' ? 'https://yifei-gu.github.io' : `https://yifei-gu.github.io${base}`);

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
