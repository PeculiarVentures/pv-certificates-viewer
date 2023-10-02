/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { SubjectKeyIdentifier } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { Extension } from '../../../crypto/extension';
import { Link } from '../../link';
import { RowValue } from '../row';
import { BasicExtension } from './basic_extension';

interface ISubjectKeyIdentifierExtensionProps extends ISubjectKeyIdentifierOptions {
  extension: Extension<SubjectKeyIdentifier>;
}

export const SubjectKeyIdentifierExtension:
FunctionalComponent<ISubjectKeyIdentifierExtensionProps> = (props) => {
  const { extension, getSubjectKeyIdChildrenLink, getSubjectKeyIdSiblingsLink } = props;

  const keyId = Convert.ToHex(extension.value.buffer);
  const childrenLink = getSubjectKeyIdChildrenLink(keyId);
  const siblingsLink = getSubjectKeyIdSiblingsLink(keyId);

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Key ID"
        value={keyId}
        monospace
        extraValue={[
          childrenLink && (
            <span>
              &nbsp;[
              <Link href={childrenLink}>
                children
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
