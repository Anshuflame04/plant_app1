import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Ensure it's accessible over the network if needed
    port: 5173, // Ensure correct port configuration
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensure proper JSX handling if required
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web', // Alias to use react-native-web
    },
  },
  build: {
    target: 'esnext', // Ensure Vite builds for modern browsers
    rollupOptions: {
      output: {
        format: 'esm', // Ensure ES modules are served properly
      },
    },
  },
});
