// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows the app to be accessible on the local network
    port: 5173, // You can change the port if needed
    strictPort: true, // Ensures the server fails if the port is already in use
  },
  esbuild: {
    loader: 'jsx', // This tells esbuild to parse .js files as JSX
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web', // Use react-native-web for web
    },
  },
});
