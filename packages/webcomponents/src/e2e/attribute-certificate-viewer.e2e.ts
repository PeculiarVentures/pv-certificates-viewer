import { render, h, describe, it, expect } from '@stencil/vitest';
import { devices } from '../tests/devices';
import { loadPemTestAssets } from '../tests/load-test-assets';
import { setDeviceViewport } from '../tests/screenshot-component';

const testAssetModules = import.meta.glob<string>(
  '../components/attribute-certificate-viewer/test_assets/*',
  {
    eager: true,
    import: 'default',
    query: '?raw',
  },
);

const certificates = loadPemTestAssets(testAssetModules);

describe('peculiar-attribute-certificate-viewer', () => {
  certificates.forEach((certificate) => {
    describe(certificate.name, () => {
      devices.forEach((device) => {
        it(`${device.viewport.width}x${device.viewport.height}`, async () => {
          const { root, waitForChanges } = await render(
            h('peculiar-attribute-certificate-viewer', { certificate: certificate.value }),
          );

          await waitForChanges();

          await setDeviceViewport(device);

          await expect(root).toMatchScreenshot();
        });
      });
    });
  });
});
