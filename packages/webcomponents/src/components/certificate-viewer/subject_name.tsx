/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';

import type { INameJSON } from '../../crypto/name';

import { RowTitle, RowValue } from './row';

interface ISubjectNameProps {
  name: INameJSON[];
}

export const SubjectName: FunctionalComponent<ISubjectNameProps> = (props) => {
  const { name } = props;

  if (!name || !name.length) {
    return null;
  }

  return [
    <RowTitle
      value="Subject Name"
    />,
    name.map((n) => (
      <RowValue
        name={n.name || n.type}
        value={n.value}
      />
    )),
  ];
};
