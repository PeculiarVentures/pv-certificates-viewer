import { render, h, describe, it, expect } from '@stencil/vitest';
import { loadPemTestAssets } from '../../tests/load-test-assets';
import { prepareViewportForComponentScreenshot } from '../../tests/prepare-component-screenshot';
import { waitForDecodedViewerTable } from '../../tests/wait-for-decoded-viewer';

const certificate = loadPemTestAssets('certificate-viewer').find(
  (c) => c.name === 'Test Certificates 2011.cer',
)!;

const MOBILE_WIDTH = 400;

const nextFrames = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

describe('peculiar-certificate-viewer mobile layout', () => {
  it(certificate.name, async () => {
    const { root, waitForChanges } = await render(
      h('peculiar-certificate-viewer', { certificate: certificate.value }),
    );

    await waitForDecodedViewerTable(root, waitForChanges);
    await prepareViewportForComponentScreenshot(root, MOBILE_WIDTH);
    await nextFrames();
    await waitForChanges();
    await prepareViewportForComponentScreenshot(root, MOBILE_WIDTH);

    await expect.element(root).toMatchScreenshot();
  });
});
