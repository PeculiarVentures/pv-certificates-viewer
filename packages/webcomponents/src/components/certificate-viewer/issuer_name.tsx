/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import type { INameJSON } from '../../crypto/name';
import { l10n } from '../../utils';

import { RowTitle, RowValue } from './row';

interface ISubjectNameProps {
  name: INameJSON[];
  issuerDnLink?: string;
}

export const IssuerName: FunctionalComponent<ISubjectNameProps> = (props) => {
  const { name, issuerDnLink } = props;

  if (!name || !name.length) {
    return null;
  }

  const title = l10n.getString('issuerName');

  return [
    <RowTitle
      value={issuerDnLink ? (
        <peculiar-link
          href={issuerDnLink}
          type="h6"
        >
          {title}
        </peculiar-link>
      ) : title}
    />,
    name.map((n) => (
      <RowValue
        name={n.name || n.type}
        value={n.value}
      />
    )),
  ];
};
