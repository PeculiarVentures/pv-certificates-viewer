/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import { NameConstraints } from '@peculiar/asn1-x509';

import { Extension } from '../../../crypto/extension';

import { BasicExtension } from './basic_extension';
import { GeneralNamePart } from './general_name_part';

interface INameConstraintsExtensionProps extends IGeneralNameOptions {
  extension: Extension<NameConstraints>;
}

export const NameConstraintsExtension:
FunctionalComponent<INameConstraintsExtensionProps> = (props) => {
  const { extension } = props;

  return (
    <BasicExtension
      extension={extension}
    >
      {extension.value.excludedSubtrees?.map((generalSubtree) => (
        <GeneralNamePart
          generalName={generalSubtree.base}
          {...props}
        />
      ))}
      {extension.value.permittedSubtrees?.map((generalSubtree) => (
        <GeneralNamePart
          generalName={generalSubtree.base}
          {...props}
        />
      ))}
    </BasicExtension>
  );
};
