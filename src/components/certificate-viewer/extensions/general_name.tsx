import { GeneralName, Name, OtherName } from '@peculiar/asn1-x509';
import { Convert } from 'pvtsutils';

import { rowValue } from '../row_value';
import OIDs from '../../../constants/oids';

const names: Record<keyof GeneralName, string> = {
  otherName: 'Other Name',
  rfc822Name: 'RFC-822 Name',
  dNSName: 'DNS Name',
  x400Address: 'x400 Address',
  directoryName: 'Directory Name',
  ediPartyName: 'Edi Party Name ',
  uniformResourceIdentifier: 'URI',
  iPAddress: 'IP Address',
  registeredID: 'Registered ID',
};

export function generalName(generalName: GeneralName) {
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
      return rowValue(
        OIDs[value.typeId],
        Convert.ToString(value.value),
      );
    }

    if (value instanceof ArrayBuffer) {
      return rowValue(
        names[name] || name,
        Convert.ToString(value),
      );
    }

    return rowValue(
      names[name] || name,
      value as any,
    );
  });
}
