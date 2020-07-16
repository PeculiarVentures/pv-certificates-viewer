import { SubjectAlternativeName } from '@peculiar/asn1-x509';

import { Extension } from '../../../crypto/extension';

import { basic } from './basic';
import { generalName } from './general_name';

export function subjectAlternativeName(
  extension: Extension,
  value: SubjectAlternativeName,
  options: IGeneralNameOptions,
) {
  return basic(
    extension,
    value.map(gn => (
      generalName(gn, options)
    )),
  );
}
