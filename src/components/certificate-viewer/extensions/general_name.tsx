import { GeneralName, Name, OtherName, DisplayText, EDIPartyName } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';
import { AsnParser } from '@peculiar/asn1-schema';

import { rowValue } from '../row_value';
import OIDs from '../../../constants/oids';

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

export function generalName(generalName: GeneralName, options: IGeneralNameOptions) {
  if (!generalName) {
    return null;
  }

  return  Object.keys(generalName).map((name: keyof GeneralName) => {
    const value = generalName[name];

    if (value instanceof Name) {
      return [
        rowValue(
          names[name] || name,
          '',
        ),
        value.map(relativeDistinguishedName => (
          relativeDistinguishedName.map(attributeTypeAndValue => (
            rowValue(
              OIDs[attributeTypeAndValue.type] || attributeTypeAndValue.type,
              attributeTypeAndValue.value.toString(),
            )
          ))
        )),
      ];
    }

    if (value instanceof OtherName) {
      const text = AsnParser.parse(value.value, DisplayText);

      return rowValue(
        OIDs[value.typeId],
        text.toString(),
      );
    }

    if (value instanceof ArrayBuffer) {
      return rowValue(
        names[name] || name,
        Convert.ToString(value),
      );
    }

    if (value instanceof EDIPartyName) {
      return [
        rowValue(
          names[name] || name,
          Convert.ToString(value.partyName),
        ),
      ];
    }

    if (name === 'dNSName') {
      return rowValue(
        names[name] || name,
        value,
        { href: options.getDNSNameLink(value) },
      );
    }

    if (name === 'iPAddress') {
      return rowValue(
        names[name] || name,
        value,
        { href: options.getIPAddressLink(value) },
      );
    }

    return rowValue(
      names[name] || name,
      value,
    );
  });
}
