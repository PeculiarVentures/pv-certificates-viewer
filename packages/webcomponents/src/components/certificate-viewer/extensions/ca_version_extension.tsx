/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { CaVersion } from '@peculiar/asn1-x509-microsoft';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface ICaVersionExtensionProps {
  extension: Extension<CaVersion>;
}

export const CaVersionExtension: FunctionalComponent<ICaVersionExtensionProps> = (props) => {
  const { extension } = props;
  const version = extension.value.getVersion();

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Certificate Index"
        value={version.certificateIndex}
      />
      <RowValue
        name="Key Index"
        value={version.keyIndex}
      />
    </BasicExtension>
  );
};
