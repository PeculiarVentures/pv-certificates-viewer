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
import { l10n } from '../../../utils';
import { BasicExtension } from './basic_extension';
import { GeneralNamePart } from './general_name_part';

interface IIssuingDistributionPointExtensionProps extends IGeneralNameOptions {
  extension: Extension<IssuingDistributionPoint>;
}

export const IssuingDistributionPointExtension:
FunctionalComponent<IIssuingDistributionPointExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {extension.value.distributionPoint?.fullName.map((gn) => (
        <GeneralNamePart
          generalName={gn}
          {...props}
        />
      ))}
      {extension.value.onlySomeReasons && (
        <RowValue
          name={l10n.getString('onlyReasons')}
          value={extension.value.onlySomeReasons.toJSON().join(', ')}
        />
      )}
      {extension.value.indirectCRL && (
        <RowValue
          name={l10n.getString('indirectCRL')}
          value={l10n.getString('yes')}
        />
      )}
      {extension.value.onlyContainsUserCerts && (
        <RowValue
          name={l10n.getString('onlyUserCertificates')}
          value={l10n.getString('yes')}
        />
      )}
      {extension.value.onlyContainsAttributeCerts && (
        <RowValue
          name={l10n.getString('onlyAttributeCertificates')}
          value={l10n.getString('yes')}
        />
      )}
      {extension.value.onlyContainsCACerts && (
        <RowValue
          name={l10n.getString('onlyCACertificates')}
          value={l10n.getString('yes')}
        />
      )}
    </BasicExtension>
  );
};
