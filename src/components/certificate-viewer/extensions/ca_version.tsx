import { CaVersion } from '@peculiar/asn1-x509-microsoft';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function caVersion(extension: Extension, value: CaVersion) {
  const version = value.getVersion();

  return basic(
    extension,
    [
      rowValue(
        'Certificate Index',
        version.certificateIndex,
      ),
      rowValue(
        'Key Index',
        version.keyIndex,
      ),
    ],
  );
}
