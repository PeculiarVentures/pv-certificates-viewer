/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Timestamp } from '@peculiar/asn1-adobe-acrobat';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { l10n } from '../../../utils';

import { BasicExtension } from './basic_extension';
import { GeneralNamePart } from './general_name_part';

interface ITimestampExtensionProps extends IGeneralNameOptions {
  extension: Extension<Timestamp>;
}

export const TimestampExtension: FunctionalComponent<ITimestampExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name="Version"
        value={extension.value.version}
      />
      <GeneralNamePart
        generalName={extension.value.location}
        {...props}
      />
      <RowValue
        name="Requires Auth"
        value={extension.value.requiresAuth ? l10n.getString('yes') : l10n.getString('no')}
      />
    </BasicExtension>
  );
};
