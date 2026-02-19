/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { X509Crl } from './x509_crl';

describe('X509Crl', () => {
  let crlPem: string;
  let crl: X509Crl;

  beforeAll(async () => {
    const crlPath = join(
      __dirname,
      '../components/crl-viewer/test_assets/Sample Signer Cert.crl',
    );

    crlPem = readFileSync(crlPath, 'utf8');
    crl = new X509Crl(crlPem);
    await crl.getThumbprint('SHA-1');
    await crl.getThumbprint('SHA-256');
  });

  describe('toJSON', () => {
    it('should return a complete JSON object matching snapshot', () => {
      const json = crl.toJSON();

      expect(json).toMatchSnapshot();
    });
  });
});
