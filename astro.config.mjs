import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [],
  output: 'static',
  adapter: vercel(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: ['vercel.app'],
  },
  vite: {
    ssr: {
      external: ['sharp'],
    },
  },
});
