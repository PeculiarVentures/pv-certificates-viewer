/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import { id_InsuranceValue, InsuranceValue } from '@peculiar/asn1-ntqwac';
import type { IAttributeParser, IParsedAttribute } from '../types';
import { node } from '../../extension-parsers/builders';

export class InsuranceValueParser implements IAttributeParser {
  readonly oids = [id_InsuranceValue];

  parse(attribute: AsnAttribute): IParsedAttribute {
    const iv = AsnParser.parse(attribute.values[0], InsuranceValue);

    return {
      oid: attribute.type,
      children: [
        node('Value', `${iv.base} * 10^${iv.degree} ${iv.location}`),
      ],
    };
  }
}
