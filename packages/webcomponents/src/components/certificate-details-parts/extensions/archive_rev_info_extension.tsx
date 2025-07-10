/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { ArchiveRevInfo } from '@peculiar/asn1-adobe-acrobat';
import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { BasicExtension } from './basic_extension';

interface IArchiveRevInfoExtensionProps {
  extension: Extension<ArchiveRevInfo>;
}

export const ArchiveRevInfoExtension:
FunctionalComponent<IArchiveRevInfoExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Version"
        value={extension.value.version}
      />
    </BasicExtension>
  );
};
