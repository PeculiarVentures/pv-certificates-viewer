import { render, h, describe, it, expect, waitForStable } from '@stencil/vitest';
import { loadPemTestAssets } from '../../tests/load-test-assets';
import { prepareViewportForComponentScreenshot } from '../../tests/prepare-component-screenshot';

const certificates = loadPemTestAssets('crl-viewer');

const VIEWPORT_WIDTH = 1024;

describe('peculiar-crl-viewer', () => {
  certificates.forEach((certificate) => {
    it(certificate.name, async () => {
      const { root, waitForChanges } = await render(
        h('peculiar-crl-viewer', { certificate: certificate.value }),
      );

      await waitForChanges();
      await waitForStable(root);

      await prepareViewportForComponentScreenshot(root, VIEWPORT_WIDTH);

      await expect.element(root).toMatchScreenshot();
    });
  });
});
