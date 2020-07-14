import { CRLDistributionPoints } from '@peculiar/asn1-x509';

import { Extension } from '../../../crypto/extension';

import { generalName } from './general_name';
import { basic } from './basic';

export function crlDistributionPoints(extension: Extension, value: CRLDistributionPoints) {
  return basic(
    extension,
    value.map((point) => {
      return point?.distributionPoint?.fullName.map(gn => (
        generalName(gn)
      ));
    }),
  );
}
