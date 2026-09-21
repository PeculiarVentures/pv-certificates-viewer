import { defineVitestConfig } from '@stencil/vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineVitestConfig({
  stencilConfig: './stencil.config.ts',
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.spec.ts'],
          environment: 'node',
          globals: true,
          setupFiles: ['./src/tests/setupUnit.ts'],
        },
      },
      {
        test: {
          name: 'browser',
          include: ['src/e2e/**/*.e2e.ts'],
          globals: true,
          setupFiles: ['./vitest-setup.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
            expect: {
              toMatchScreenshot: {
                screenshotDirectory: '__image_snapshots__',
              },
            },
          },
        },
      },
    ],
  },
});
