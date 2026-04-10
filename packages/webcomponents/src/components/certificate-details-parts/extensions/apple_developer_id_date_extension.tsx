/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Extension } from '../../../crypto/extension';
import { AppleDeveloperIdDate } from '../../../crypto/extensions';
import { RowValue } from '../row';
import { dateShort } from '../../../utils';
import { BasicExtension } from './basic_extension';

interface IAppleDeveloperIdDateExtensionProps {
  extension: Extension<AppleDeveloperIdDate>;
}

export const AppleDeveloperIdDateExtension:
FunctionalComponent<IAppleDeveloperIdDateExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Date"
        value={dateShort(extension.value.date)}
      />
    </BasicExtension>
  );
};
