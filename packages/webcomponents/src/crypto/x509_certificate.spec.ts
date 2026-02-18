/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { X509Certificate } from './x509_certificate';

describe('X509Certificate', () => {
  let certificatePem: string;
  let certificate: X509Certificate;

  beforeAll(() => {
    const certPath = join(
      __dirname,
      '../components/certificate-viewer/test_assets/Configuration.cer',
    );

    certificatePem = readFileSync(certPath, 'utf8');
    certificate = new X509Certificate(certificatePem);
  });

  describe('toJSON', () => {
    it('should return a complete JSON object matching snapshot', () => {
      const json = certificate.toJSON();

      expect(json).toMatchSnapshot();
    });
  });
});
