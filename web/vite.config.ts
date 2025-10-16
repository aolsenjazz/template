import path from 'path';
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig } from 'vite';

const baseConfig = defineConfig({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react(), svgr({ exportType: 'named' })],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name].[hash].js',
        entryFileNames: 'main.js',
        assetFileNames: ({ name }) => {
          const ext = name?.split('.').pop();
          if (/(png|jpe?g|gif|webp|avif)$/.test(ext || '')) {
            return 'static/media/[name].[hash][extname]';
          }
          if (/(woff|woff2|eot|ttf|otf)$/.test(ext || '')) {
            return 'static/fonts/[name].[hash][extname]';
          }
          return 'static/[ext]/[name].[hash][extname]';
        },
      },
    },
  },
});

const devConfig = defineConfig({
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});

const prodConfig = defineConfig({
  build: {
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        compact: true,
      },
    },
  },
});

const targetConfig =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default mergeConfig(baseConfig, targetConfig, false);
