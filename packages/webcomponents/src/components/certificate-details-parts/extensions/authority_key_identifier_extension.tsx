/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { AuthorityKeyIdentifier } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { Extension } from '../../../crypto/extension';
import { Link } from '../../link';
import { RowValue } from '../row';
import { BasicExtension } from './basic_extension';

interface IAuthorityKeyIdentifierExtensionProps extends IAuthorityKeyIdentifierOptions {
  extension: Extension<AuthorityKeyIdentifier>;
}

export const AuthorityKeyIdentifierExtension:
FunctionalComponent<IAuthorityKeyIdentifierExtensionProps> = (props) => {
  const { extension, getAuthKeyIdParentLink, getAuthKeyIdSiblingsLink } = props;

  const keyId = Convert.ToHex(extension.value.keyIdentifier.buffer);
  const parentLink = getAuthKeyIdParentLink(keyId);
  const siblingsLink = getAuthKeyIdSiblingsLink(keyId);

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Key ID"
        value={keyId}
        monospace
        extraValue={[
          parentLink && (
            <span>
              &nbsp;[
              <Link href={parentLink}>
                parents
              </Link>
              ]
            </span>
          ),
          siblingsLink && (
            <span>
              &nbsp;[
              <Link href={siblingsLink}>
                siblings
              </Link>
              ]
            </span>
          ),
        ]}
      />
    </BasicExtension>
  );
};
