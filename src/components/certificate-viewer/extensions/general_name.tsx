import { GeneralName } from '@peculiar/asn1-x509';

import { rowValue } from '../row_value';

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

  return  Object.keys(generalName).map(name => (
    rowValue(
      names[name] || name,
      generalName[name],
    )
  ));
}
