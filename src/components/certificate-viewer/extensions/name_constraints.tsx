import { NameConstraints } from '@peculiar/asn1-x509';

import { Extension } from '../../../crypto/extension';

import { basic } from './basic';
import { generalName } from './general_name';

export function nameConstraints(extension: Extension, value: NameConstraints) {
  return basic(
    extension,
    [
      value.excludedSubtrees?.map(generalSubtree => (
        generalName(generalSubtree.base)
      )),
      value.permittedSubtrees?.map(generalSubtree => (
        generalName(generalSubtree.base)
      )),
    ],
  );
}
