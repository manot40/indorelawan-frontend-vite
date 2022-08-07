import fs from 'fs/promises';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// const jsAsJsx = {
//   name: 'js-as-jsx',
//   setup(build) {
//     build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
//       loader: 'jsx',
//       contents: await fs.readFile(args.path, 'utf8'),
//     }));
//   },
// };

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    build: {
      outDir: 'build',
    },
    define: {
      global: {
        setImmediate: global.setImmediate,
      },
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        REACT_APP_BASE_URL: env.REACT_APP_BASE_URL,
        REACT_APP_API_BASE_URL: env.REACT_APP_API_BASE_URL,
        REACT_APP_CART_API_URL: env.REACT_APP_CART_API_URL,
        REACT_APP_WALLET_API_URL: env.REACT_APP_WALLET_API_URL,
        REACT_APP_SENTRY: env.REACT_APP_SENTRY,
        REACT_APP_MIDTRANS_MODE: env.REACT_APP_MIDTRANS_MODE,
        REACT_APP_SERTIVA_ENABLED: env.REACT_APP_SERTIVA_ENABLED,
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: [{ find: /^~/, replacement: '' }],
      preserveSymlinks: true,
    },
    plugins: [react(), svgr(), eslint()],
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
  };
});
