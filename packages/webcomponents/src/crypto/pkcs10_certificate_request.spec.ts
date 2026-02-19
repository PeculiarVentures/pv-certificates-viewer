/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { Pkcs10CertificateRequest } from './pkcs10_certificate_request';

describe('Pkcs10CertificateRequest', () => {
  let certificateRequestPem: string;
  let certificateRequest: Pkcs10CertificateRequest;

  beforeAll(() => {
    const csrPath = join(
      __dirname,
      '../components/csr-viewer/test_assets/domain.test.csr',
    );

    certificateRequestPem = readFileSync(csrPath, 'utf8');
    certificateRequest = new Pkcs10CertificateRequest(certificateRequestPem);
  });

  describe('toJSON', () => {
    it('should return a complete JSON object matching snapshot', () => {
      const json = certificateRequest.toJSON();

      expect(json).toMatchSnapshot();
    });
  });
});
