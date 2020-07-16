import { h } from '@stencil/core';
import { SubjectKeyIdentifier } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function subjectKeyIdentifier(
  extension: Extension,
  value: SubjectKeyIdentifier,
  options: ISubjectKeyIdentifierOptions = {},
) {
  const keyId = Convert.ToHex(value);
  const childrenLink = options?.getSubjectKeyIdChildrenLink(keyId);
  const siblingsLink = options?.getSubjectKeyIdSiblingsLink(keyId);

  return basic(
    extension,
    rowValue(
      'Key ID',
      keyId,
      {
        monospace: true,
        extraValue: [
          childrenLink && (
            <span>
              &nbsp;[<peculiar-link href={childrenLink}>
                children
              </peculiar-link>]
            </span>
          ),
          siblingsLink && (
            <span>
              &nbsp;[<peculiar-link href={siblingsLink}>
                siblings
              </peculiar-link>]
            </span>
          ),
        ],
      },
    ),
  );
}
