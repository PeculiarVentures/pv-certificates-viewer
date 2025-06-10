/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { CertificateTemplate } from '@peculiar/asn1-x509-microsoft';
import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { BasicExtension } from './basic_extension';

interface ICertificateTemplateExtensionProps {
  extension: Extension<CertificateTemplate>;
}

export const CertificateTemplateExtension:
FunctionalComponent<ICertificateTemplateExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Template ID"
        value={extension.value.templateID}
      />
      <RowValue
        name="Template Major Version"
        value={extension.value.templateMajorVersion}
      />
      <RowValue
        name="Template Minor Version"
        value={extension.value.templateMinorVersion}
      />
    </BasicExtension>
  );
};
