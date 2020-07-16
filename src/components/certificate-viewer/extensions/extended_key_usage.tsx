import { ExtendedKeyUsage } from '@peculiar/asn1-x509';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';

import { basic } from './basic';

export function extendedKeyUsage(extension: Extension, value: ExtendedKeyUsage) {
  return basic(
    extension,
    value.map((usage, index) => (
      rowValue(
        `Purpose #${index + 1}`,
        getStringByOID(usage),
      )
    )),
  );
}
