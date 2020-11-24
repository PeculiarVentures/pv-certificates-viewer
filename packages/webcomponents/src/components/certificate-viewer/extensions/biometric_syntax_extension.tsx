/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { BiometricSyntax } from '@peculiar/asn1-x509-qualified';
import { Convert } from 'pvtsutils';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';

import { BasicExtension } from './basic_extension';

interface IBiometricSyntaxExtensionProps {
  extension: Extension<BiometricSyntax>;
}

export const BiometricSyntaxExtension:
FunctionalComponent<IBiometricSyntaxExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {extension.value.map((data, arrayIndex) => ([
        <RowValue
          name={`Biometric Oid #${arrayIndex + 1}`}
          value={getStringByOID(data.typeOfBiometricData.biometricDataOid)}
        />,
        <RowValue
          name={`Biometric Type #${arrayIndex + 1}`}
          value={data.typeOfBiometricData.predefinedBiometricType}
        />,
        <RowValue
          name={`Algorithm #${arrayIndex + 1}`}
          value={getStringByOID(data.hashAlgorithm.algorithm)}
        />,
        <RowValue
          name={`Biometric Hash #${arrayIndex + 1}`}
          value={Convert.ToHex(data.biometricDataHash.buffer)}
          monospace
        />,
        <RowValue
          name={`Source Uri #${arrayIndex + 1}`}
          value={data.sourceDataUri}
        />,
        <tr>
          <td />
          <td />
        </tr>,
      ]))}
    </BasicExtension>
  );
};
