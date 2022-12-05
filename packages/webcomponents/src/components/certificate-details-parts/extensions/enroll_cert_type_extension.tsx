/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { EnrollCertTypeChoice } from '@peculiar/asn1-x509-microsoft';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IEnrollCertTypeChoiceExtensionProps {
  extension: Extension<EnrollCertTypeChoice>;
}

export const EnrollCertTypeChoiceExtension:
FunctionalComponent<IEnrollCertTypeChoiceExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Name"
        value={extension.value.toString()}
      />
    </BasicExtension>
  );
};
