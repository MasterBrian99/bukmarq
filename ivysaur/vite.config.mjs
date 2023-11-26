import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import progress from 'vite-plugin-progress';
import pc from 'picocolors';

import * as path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    progress({
      format: `${pc.green(pc.bold('Building'))} ${pc.cyan('[:bar]')} :percent ${pc.red(
        ':rate/bps'
      )} :etas`,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
