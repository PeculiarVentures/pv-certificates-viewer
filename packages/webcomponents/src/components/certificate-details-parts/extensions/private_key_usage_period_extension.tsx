/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { PrivateKeyUsagePeriod } from '@peculiar/asn1-x509';
import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { dateShort } from '../../../utils';
import { BasicExtension } from './basic_extension';

interface IPrivateKeyUsagePeriodExtensionProps {
  extension: Extension<PrivateKeyUsagePeriod>;
}

export const PrivateKeyUsagePeriodExtension:
FunctionalComponent<IPrivateKeyUsagePeriodExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Not Before"
        value={dateShort(extension.value.notBefore)}
      />
      <RowValue
        name="Not After"
        value={dateShort(extension.value.notAfter)}
      />
    </BasicExtension>
  );
};
