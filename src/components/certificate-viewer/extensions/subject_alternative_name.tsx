import { SubjectAlternativeName } from '@peculiar/asn1-x509';

import { Extension } from '../../../crypto/extension';

import { basic } from './basic';
import { generalName } from './general_name';

export function subjectAlternativeName(extension: Extension, value: SubjectAlternativeName) {
  return basic(
    extension,
    value.map(gn => (
      generalName(gn)
    )),
  );
}
