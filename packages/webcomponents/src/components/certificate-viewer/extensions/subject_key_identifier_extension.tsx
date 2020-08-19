import { h, FunctionalComponent } from '@stencil/core';
import { SubjectKeyIdentifier } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

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
            <peculiar-link href={childrenLink}>
              children
            </peculiar-link>
            ]
          </span>
          ),
          siblingsLink && (
          <span>
            &nbsp;[
            <peculiar-link href={siblingsLink}>
              siblings
            </peculiar-link>
            ]
          </span>
          ),
        ]}
      />
    </BasicExtension>
  );
};
