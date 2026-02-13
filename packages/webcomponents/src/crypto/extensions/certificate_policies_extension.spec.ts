/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { CertificatePoliciesExtension } from './certificate_policies_extension';

describe('CertificatePoliciesExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Certificate Policies
     * Critical: Yes
     * Policies: 1.3.6.1.4.1.11129.2.5.3
     */
    const hexExtension = '308201260603551d200482011d308201193082010a060b2b06010401e6790a0102023081fa302f06082b060105050702011623687474703a2f2f7777772e6669726d6170726f666573696f6e616c2e636f6d2f6370733081c606082b060105050702023081b90c81b6c38973746520657320756e20436572746966696361646f20436f72706f72617469766f20646520506572736f6e612046c3ad73696361206375616c6966696361646f20706172612073752075736f2073696e20444343462e2044697265636369c3b36e2064656c20707265737461646f7220646520736572766963696f7320646520636f6e6669616e7a613a20506173656f206465206c6120426f6e616e6f76612c2034372e2030383031372042617263656c6f6e613009060704008bec400100';
    const extension = new CertificatePoliciesExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toEqual({
      Name: 'Certificate Policies',
      Critical: 'No',
      Policies: [
        {
          'Policy ID': '1.3.6.1.4.1.13177.10.1.2.2',
          Qualifiers: [
            {
              'Qualifier ID': '1.3.6.1.5.5.7.2.1',
              Value: 'http://www.firmaprofesional.com/cps',
            },
            {
              'Qualifier ID': '1.3.6.1.5.5.7.2.2',
              Value: 'Éste es un Certificado Corporativo de Persona Física cualificado para su uso sin DCCF. Dirección del prestador de servicios de confianza: Paseo de la Bonanova, 47. 08017 Barcelona',
            },
          ],
        },
        {
          'Policy ID': '0.4.0.194112.1.0',
        },
      ],
    });
  });
});
