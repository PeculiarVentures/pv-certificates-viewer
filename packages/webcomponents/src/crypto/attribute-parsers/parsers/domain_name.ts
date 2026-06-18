/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Attribute as AsnAttribute } from '@peculiar/asn1-x509';
import {
  id_DomainNameBeneficiary,
  DomainNameBeneficiary,
  id_DomainNameLegalRepresentative,
  DomainNameLegalRepresentative,
  id_DomainNameOwner,
  DomainNameOwner,
  id_DomainNameTechnicalOperator,
  DomainNameTechnicalOperator,
} from '@peculiar/asn1-ntqwac';
import { Name } from '../../name';
import type { IAttributeParser, IParsedAttribute } from '../types';
import { node } from '../../extension-parsers/builders';

function parseDomainName(
  attribute: AsnAttribute,
  DomainNameClass: typeof DomainNameBeneficiary,
): IParsedAttribute {
  const dn = AsnParser.parse(attribute.values[0], DomainNameClass);
  const attrs = new Name(dn).toJSON();

  return {
    oid: attribute.type,
    children: attrs.map((a) => node(a.name ?? a.type, a.value)),
  };
}

export class DomainNameBeneficiaryParser implements IAttributeParser {
  readonly oids = [id_DomainNameBeneficiary];

  parse(attribute: AsnAttribute): IParsedAttribute {
    return parseDomainName(attribute, DomainNameBeneficiary);
  }
}

export class DomainNameLegalRepresentativeParser implements IAttributeParser {
  readonly oids = [id_DomainNameLegalRepresentative];

  parse(attribute: AsnAttribute): IParsedAttribute {
    return parseDomainName(attribute, DomainNameLegalRepresentative);
  }
}

export class DomainNameOwnerParser implements IAttributeParser {
  readonly oids = [id_DomainNameOwner];

  parse(attribute: AsnAttribute): IParsedAttribute {
    return parseDomainName(attribute, DomainNameOwner);
  }
}

export class DomainNameTechnicalOperatorParser implements IAttributeParser {
  readonly oids = [id_DomainNameTechnicalOperator];

  parse(attribute: AsnAttribute): IParsedAttribute {
    return parseDomainName(attribute, DomainNameTechnicalOperator);
  }
}
