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
import { getStringByOID } from '../../utils/get_string_by_oid';
import { RowTitle, RowValue } from './row';

interface ISubjectNameProps {
  name: INameJSON[];
}

export const SubjectName: FunctionalComponent<ISubjectNameProps> = (props) => {
  const { name } = props;

  return [
    <RowTitle
      value={l10n.getString('subjectName')}
    />,
    name.map((n) => (
      <RowValue
        name={getStringByOID(n.type, true)}
        value={n.value}
      />
    )),
  ];
};
