import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), svgr(), eslint()],
    build: {
      outDir: 'build',
    },
    // Symlinks support
    resolve: {
      alias: [{ find: /^~/, replacement: '' }],
      preserveSymlinks: true,
    },
    // Preserve legacy CRA non .jsx file extensions
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: { '.js': 'jsx' },
      },
    },
    // SASS support
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    // Preserve legacy env and globar vars style
    define: {
      'global.console.log': console.log,
      'global.setImmediate': setTimeout,
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        REACT_APP_BASE_URL: env.REACT_APP_BASE_URL,
        REACT_APP_API_BASE_URL: env.REACT_APP_API_BASE_URL,
        REACT_APP_CART_API_URL: env.REACT_APP_CART_API_URL,
        REACT_APP_WALLET_API_URL: env.REACT_APP_WALLET_API_URL,
        REACT_APP_SENTRY: env.REACT_APP_SENTRY,
        REACT_APP_MIDTRANS_MODE: env.REACT_APP_MIDTRANS_MODE,
        REACT_APP_SERTIVA_ENABLED: env.REACT_APP_SERTIVA_ENABLED,
        REACT_APP_YT_API_KEY: env.REACT_APP_YT_API_KEY,
      },
    },
  };
});
