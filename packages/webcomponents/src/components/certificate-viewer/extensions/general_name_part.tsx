/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import {
  GeneralName, Name, OtherName, DisplayText, EDIPartyName,
} from '@peculiar/asn1-x509';
import { Convert, BufferSourceConverter } from 'pvtsutils';
import { AsnParser } from '@peculiar/asn1-schema';

import { OIDs } from '../../../constants/oids';
import { RowValue } from '../row';

const names: Record<keyof GeneralName, string> = {
  otherName: 'Other Name',
  rfc822Name: 'RFC 822 Name',
  dNSName: 'DNS Name',
  x400Address: 'X400 Address',
  directoryName: 'Directory Name',
  ediPartyName: 'Edi Party Name ',
  uniformResourceIdentifier: 'URI',
  iPAddress: 'IP Address',
  registeredID: 'Registered ID',
};

interface IGeneralNamePartProps extends IGeneralNameOptions {
  generalName: GeneralName;
}

export const GeneralNamePart: FunctionalComponent<IGeneralNamePartProps> = (props) => {
  const { generalName, getDNSNameLink, getIPAddressLink } = props;

  if (!generalName) {
    return null;
  }

  return Object.keys(generalName).map((name: keyof GeneralName) => {
    const value = generalName[name];

    if (value instanceof Name) {
      return [
        <RowValue
          name={names[name] || name}
          value=""
        />,
        value.map((relativeDistinguishedName) => (
          relativeDistinguishedName.map((attributeTypeAndValue) => (
            <RowValue
              name={OIDs[attributeTypeAndValue.type] || attributeTypeAndValue.type}
              value={attributeTypeAndValue.value.toString()}
            />
          ))
        )),
      ];
    }

    if (value instanceof OtherName) {
      const text = AsnParser.parse(value.value, DisplayText);

      return (
        <RowValue
          name={OIDs[value.typeId]}
          value={text.toString()}
        />
      );
    }

    if (BufferSourceConverter.isBufferSource(value)) {
      return (
        <RowValue
          name={names[name] || name}
          value={Convert.ToString(value)}
        />
      );
    }

    if (value instanceof EDIPartyName) {
      return (
        <RowValue
          name={names[name] || name}
          value={Convert.ToString(value.partyName)}
        />
      );
    }

    if (name === 'dNSName') {
      return (
        <RowValue
          name={names[name] || name}
          value={value}
          href={getDNSNameLink(value)}
        />
      );
    }

    if (name === 'iPAddress') {
      return (
        <RowValue
          name={names[name] || name}
          value={value}
          href={getIPAddressLink(value)}
        />
      );
    }

    return (
      <RowValue
        name={names[name] || name}
        value={value}
      />
    );
  });
};
