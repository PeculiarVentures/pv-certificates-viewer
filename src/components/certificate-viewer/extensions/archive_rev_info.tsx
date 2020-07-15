import { ArchiveRevInfo } from '@peculiar/asn1-adobe-acrobat';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function archiveRevInfo(extension: Extension, value: ArchiveRevInfo) {
  return basic(
    extension,
    rowValue(
      'Version',
      value.version,
    ),
  );
}
