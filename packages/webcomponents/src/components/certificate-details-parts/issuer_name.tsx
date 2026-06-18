/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import type { INameJSON } from '../../crypto/name';
import { getStringByOID } from '../../utils/get_string_by_oid';
import { l10n } from '../../utils';
import { Link } from '../link';
import { RowTitle, RowValue } from './row';

interface ISubjectNameProps {
  name: INameJSON[];
  issuerDnLink?: string;
}

export const IssuerName: FunctionalComponent<ISubjectNameProps> = (props) => {
  const { name, issuerDnLink } = props;
  const title = l10n.getString('issuerName');

  return [
    <RowTitle
      value={issuerDnLink
        ? (
            <Link
              href={issuerDnLink}
            >
              {title}
            </Link>
          )
        : title}
    />,
    name.map((n) => (
      <RowValue
        name={getStringByOID(n.type, true)}
        value={n.value}
      />
    )),
  ];
};
