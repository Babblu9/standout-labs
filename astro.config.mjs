import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.standoutlabs.in',
  integrations: [
    react(),
    tailwind({
      // We will define styling rules in global CSS and custom settings if needed.
      // This is a standard Tailwind CSS config integration.
      applyBaseStyles: false, // Prevents loading Astro's default tailwind base styles so we have total control
    }),
  ],
});
