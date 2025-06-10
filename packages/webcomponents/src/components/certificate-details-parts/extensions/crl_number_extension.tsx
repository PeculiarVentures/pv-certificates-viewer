/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { CRLNumber } from '@peculiar/asn1-x509';
import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { l10n } from '../../../utils';
import { BasicExtension } from './basic_extension';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ICRLNumberExtensionProps {
  extension: Extension<CRLNumber>;
}

export const CRLNumberExtension: FunctionalComponent<ICRLNumberExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name={l10n.getString('value')}
        value={extension.value.value}
      />
    </BasicExtension>
  );
};
