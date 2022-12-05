/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { EntrustVersionInfo } from '@peculiar/asn1-x509';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IEntrustVersionInfoExtensionProps {
  extension: Extension<EntrustVersionInfo>;
}

export const EntrustVersionInfoExtension:
FunctionalComponent<IEntrustVersionInfoExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Version"
        value={extension.value.entrustVers}
      />
      <RowValue
        name="Info Flags"
        value={extension.value.entrustInfoFlags.toJSON().join(', ')}
      />
    </BasicExtension>
  );
};
