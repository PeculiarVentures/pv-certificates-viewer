import fs from 'fs';
import path from 'path';
import { newE2EPage } from '@stencil/core/testing';
import { devices } from '../../tests';

const testAssetsFolderPath = path.join(__dirname, 'test_assets');
const testFiles = fs.readdirSync(testAssetsFolderPath)
  .filter((fileName) => fileName !== '.DS_Store');
const certificates = testFiles.map((fileName) => ({
  name: fileName,
  value: fs.readFileSync(path.join(testAssetsFolderPath, fileName), { encoding: 'utf-8' })
    .replace(/-{5}(BEGIN|END) .*-{5}/gm, '')
    .replace(/\s/gm, ''),
}));

describe('peculiar-certificate-viewer', () => {
  certificates.forEach((certificate) => {
    describe(certificate.name, () => {
      devices.forEach((device) => {
        it(`${device.viewport.width}x${device.viewport.height}`, async () => {
          const page = await newE2EPage({
            html: `
              <peculiar-certificate-viewer
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
            encoding: 'base64',
          });

          expect(image).toMatchImageSnapshot();
        });
      });
    });
  });
});
