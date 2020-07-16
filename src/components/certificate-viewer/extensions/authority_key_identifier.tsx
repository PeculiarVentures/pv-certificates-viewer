import { h } from '@stencil/core';
import { AuthorityKeyIdentifier } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { rowValue } from '../row_value';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';

export function authorityKeyIdentifier(
  extension: Extension,
  value: AuthorityKeyIdentifier,
  options: IAuthorityKeyIdentifierOptions = {},
) {
  const keyId = Convert.ToHex(value.keyIdentifier);
  const parentLink = options?.getAuthKeyIdParentLink(keyId);
  const siblingsLink = options?.getAuthKeyIdSiblingsLink(keyId);

  return basic(
    extension,
    rowValue(
      'Key ID',
      keyId,
      {
        monospace: true,
        extraValue: [
          parentLink && (
            <span>
              &nbsp;[<peculiar-link href={parentLink}>
                parents
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
