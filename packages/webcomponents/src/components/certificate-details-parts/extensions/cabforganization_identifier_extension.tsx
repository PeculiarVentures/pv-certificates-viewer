/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { Extension } from '../../../crypto/extension';
import { CabforganizationIdentifier } from '../../../crypto/extensions';
import { RowValue } from '../row';
import { camelCaseToWords } from '../../../utils';
import { BasicExtension } from './basic_extension';

interface ICabforganizationIdentifierExtensionProps {
  extension: Extension<CabforganizationIdentifier>;
}

export const CabforganizationIdentifierExtension: FunctionalComponent<
  ICabforganizationIdentifierExtensionProps
> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {Object.keys(extension.value).map((keyName) => (
        <RowValue
          name={camelCaseToWords(keyName)}
          value={extension.value[keyName]}
        />
      ))}
    </BasicExtension>
  );
};
