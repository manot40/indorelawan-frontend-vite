import { defineConfig, loadEnv } from 'vite';

import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), svgr(), eslint()],
    // Tell rollup to not push global vars in production
    build: {
      rollupOptions: {
        output: { globals: null },
      },
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
    // Preserve legacy env and global vars style
    define: {
      'global.console.log': 'window.console.log',
      'global.setImmediate': 'window.setTimeout',
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        REACT_APP_BASE_URL: env.REACT_APP_BASE_URL,
        REACT_APP_API_BASE_URL: env.REACT_APP_API_BASE_URL,
        REACT_APP_CART_API_URL: env.REACT_APP_CART_API_URL,
        REACT_APP_WALLET_API_URL: env.REACT_APP_WALLET_API_URL,
		REACT_APP_STORAGE_URL: env.REACT_APP_STORAGE_URL,
        REACT_APP_SENTRY: env.REACT_APP_SENTRY,
        REACT_APP_MIDTRANS_MODE: env.REACT_APP_MIDTRANS_MODE,
        REACT_APP_SERTIVA_ENABLED: env.REACT_APP_SERTIVA_ENABLED,
        REACT_APP_YT_API_KEY: env.REACT_APP_YT_API_KEY,
      },
    },
  };
});
