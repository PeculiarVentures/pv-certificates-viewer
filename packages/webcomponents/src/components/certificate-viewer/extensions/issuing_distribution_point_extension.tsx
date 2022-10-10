/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { IssuingDistributionPoint } from '@peculiar/asn1-x509';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';

interface IIssuingDistributionPointExtensionProps {
  extension: Extension<IssuingDistributionPoint>;
}

// TODO: Add other data parsing.
// eslint-disable-next-line max-len
export const IssuingDistributionPointExtension: FunctionalComponent<IIssuingDistributionPointExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {extension.value.onlyContainsUserCerts && (
        <RowValue
          name="Only User Certificates"
          value="Yes"
        />
      )}
      {extension.value.onlyContainsAttributeCerts && (
        <RowValue
          name="Only Attribute Certificates"
          value="Yes"
        />
      )}
      {extension.value.onlyContainsCACerts && (
        <RowValue
          name="Only CA Certificates"
          value="Yes"
        />
      )}
    </BasicExtension>
  );
};
