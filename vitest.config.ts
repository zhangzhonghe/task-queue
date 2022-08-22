import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './miniprogram/scripts/setupMiniprogram.ts',
  },
})
