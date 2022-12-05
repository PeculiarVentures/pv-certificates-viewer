/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { TNAuthorizationList } from '@peculiar/asn1-rfc8226';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface ITNAuthListExtensionProps {
  extension: Extension<TNAuthorizationList>;
}

export const TNAuthListExtension: FunctionalComponent<ITNAuthListExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {extension.value.map((entry, arrayIndex) => ([
        <RowValue
          name={`Entry #${arrayIndex + 1}`}
          value=""
        />,
        <RowValue
          name="SPC"
          value={entry.spc}
        />,
        <RowValue
          name="Range"
          value={entry.range ? `start=${entry.range.start} count==${entry.range.count}` : null}
        />,
        <RowValue
          name="One"
          value={entry.one}
        />,
      ]))}
    </BasicExtension>
  );
};
