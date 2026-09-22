import { defineVitestConfig } from '@stencil/vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineVitestConfig({
  stencilConfig: './stencil.config.ts',
  test: {
    projects: [
      {
        test: {
          name: 'spec',
          include: ['src/**/*.spec.{ts,tsx}'],
          environment: 'stencil',
          setupFiles: ['./vitest-setup.ts'],
        },
      },
      {
        test: {
          name: 'browser',
          include: ['src/**/*.e2e.{ts,tsx}'],
          setupFiles: ['./vitest-setup-browser.ts'],
          browser: {
            viewport: {
              width: 1024,
              height: 768,
            },
            enabled: true,
            provider: playwright({
              // Playwright page viewport must fit tall component screenshots (iframe uses page.viewport()).
              contextOptions: {
                viewport: { width: 1280, height: 4096 },
              },
            }),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
