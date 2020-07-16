import { AuthorityInfoAccessSyntax } from '@peculiar/asn1-x509';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';

import { basic } from './basic';
import { generalName } from './general_name';

export function authorityInfoAccessSyntax(
  extension: Extension,
  value: AuthorityInfoAccessSyntax,
  options: IGeneralNameOptions,
) {
  return basic(
    extension,
    value.map((description, index) => ([
      rowValue(
        `Method #${index + 1}`,
        getStringByOID(description.accessMethod),
      ),
      generalName(description.accessLocation, options),
    ])),
  );
}
