import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    setupFiles: [path.resolve(__dirname, 'src/testing/setup.ts')],
    include: ['src/**/*.test.ts'],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
