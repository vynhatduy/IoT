import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = process.env.BE_URL;
  const PORT = 4000;

  return {
    server: {
      open: true,
      port: PORT,
      host: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: PORT // Cổng của Vite frontend
      },
      proxy: {
        '/api': {
          target: API_URL, // Định tuyến API về ASP.NET
          changeOrigin: true,
          secure: false
        },
        '/ws': {
          target: API_URL, // Kết nối WebSocket về ASP.NET
          changeOrigin: true,
          ws: true // Kích hoạt WebSocket
        }
      }
    },
    plugins: [react()]
  };
});
