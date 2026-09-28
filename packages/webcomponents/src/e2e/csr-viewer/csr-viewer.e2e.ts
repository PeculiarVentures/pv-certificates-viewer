import { render, h, describe, it, expect } from '@stencil/vitest';
import { loadPemTestAssets } from '../../tests/load-test-assets';
import { prepareViewportForComponentScreenshot } from '../../tests/prepare-component-screenshot';
import { waitForDecodedViewerTable } from '../../tests/wait-for-decoded-viewer';

const certificates = loadPemTestAssets('csr-viewer');

const VIEWPORT_WIDTH = 1024;

describe('peculiar-csr-viewer', () => {
  certificates.forEach((certificate) => {
    it(certificate.name, async () => {
      const { root, waitForChanges } = await render(
        h('peculiar-csr-viewer', { certificate: certificate.value }),
      );

      await waitForDecodedViewerTable(root, waitForChanges);

      await prepareViewportForComponentScreenshot(root, VIEWPORT_WIDTH);

      await expect.element(root).toMatchScreenshot();
    });
  });
});
