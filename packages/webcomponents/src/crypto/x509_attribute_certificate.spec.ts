/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { X509AttributeCertificate } from './x509_attribute_certificate';

describe('X509AttributeCertificate', () => {
  let certificatePem: string;
  let certificate: X509AttributeCertificate;

  beforeAll(() => {
    const certPath = join(
      __dirname,
      '../components/attribute-certificate-viewer/test_assets/ntqwac-x509-attribute.crt',
    );

    certificatePem = readFileSync(certPath, 'utf8');
    certificate = new X509AttributeCertificate(certificatePem);
  });

  describe('toJSON', () => {
    it('should return a complete JSON object matching snapshot', () => {
      const json = certificate.toJSON();

      expect(json).toMatchSnapshot();
    });
  });
});
