import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/convert': 'https://pdfconv-rc55.onrender.com'
    }
  }
});
