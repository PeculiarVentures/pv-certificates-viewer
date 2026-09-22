import { render, h, describe, it, expect, waitForStable } from '@stencil/vitest';
import { loadPemTestAssets } from '../../tests/load-test-assets';
import { prepareViewportForComponentScreenshot } from '../../tests/prepare-component-screenshot';

const certificates = loadPemTestAssets('attribute-certificate-viewer');

const VIEWPORT_WIDTH = 1024;

describe('peculiar-attribute-certificate-viewer', () => {
  certificates.forEach((certificate) => {
    it(certificate.name, async () => {
      const { root, waitForChanges } = await render(
        h('peculiar-attribute-certificate-viewer', { certificate: certificate.value }),
      );

      await waitForChanges();
      await waitForStable(root);

      await prepareViewportForComponentScreenshot(root, VIEWPORT_WIDTH);

      await expect.element(root).toMatchScreenshot();
    });
  });
});
