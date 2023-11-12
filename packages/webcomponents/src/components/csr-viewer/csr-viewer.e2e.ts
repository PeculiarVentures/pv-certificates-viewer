import { newE2EPage } from '@stencil/core/testing';
import { devices } from '../../tests';

const certificates = [
  {
    name: 'test',
    value: 'MIHQMIGDAgEAMA8xDTALBgNVBAMMBHRlc3QwKjAFBgMrZXADIQD7Fua9ZF+wPXVdDCBwQr+Aqny6OFvs25wZ/P4LyVsYmKBBMD8GCSqGSIb3DQEJDjEyMDAwLgYDVR0RBCcwJaAjBgorBgEEAYI3FAIDoBUME2FkZHJlc3NAZG9tYWluLnRlc3QwBQYDK2VwA0EAUp5FenHF1rZzRGU+7wiF+/D1bfyDRF0dzWz2sl44nltu8iLjHO3aIfOTYWpqZlaDg1Bq3L7Fcb7If4yZAsE5Cw==',
  },
];

describe('peculiar-csr-viewer', () => {
  certificates.forEach((certificate) => {
    describe(certificate.name, () => {
      devices.forEach((device) => {
        it(`${device.viewport.width}x${device.viewport.height}`, async () => {
          const page = await newE2EPage({
            html: `
              <peculiar-csr-viewer
                certificate="${certificate.value}"
              />
            `,
          });

          await page.setViewport({
            width: device.viewport.width,
            height: device.viewport.height,
          });

          const image = await page.screenshot({
            fullPage: true,
          });

          expect(image).toMatchImageSnapshot();
        });
      });
    });
  });
});
