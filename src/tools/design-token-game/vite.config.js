import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: './', // 以當前目錄為根目錄
  base: './', // 使用相對路徑
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../../../public/game'), // 輸出到 public/game 資料夾
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'zustand', 'html2canvas'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../'), // 可選：設置別名方便導入
    },
  },
}); 