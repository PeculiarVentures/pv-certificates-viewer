/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { Name } from '@peculiar/asn1-x509';

import { OIDs } from '../../../constants/oids';
import { RowValue } from '../row';

interface INamePartProps {
  name: Name;
}

export const NamePart: FunctionalComponent<INamePartProps> = (props): any[] => {
  const { name } = props;

  if (!name) {
    return null;
  }

  return name.map((relativeDistinguishedName) => (
    relativeDistinguishedName.map((attributeTypeAndValue) => (
      <RowValue
        name={OIDs[attributeTypeAndValue.type] || attributeTypeAndValue.type}
        value={attributeTypeAndValue.value.toString()}
      />
    ))
  ));
};
