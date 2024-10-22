import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enable network access
    port: 5173, // Specify port
    strictPort: true, // Fail if port is in use
  },
  resolve: {
    alias: {
      // Only needed if you're using react-native-web
      'react-native$': 'react-native-web',
    },
  },
});
