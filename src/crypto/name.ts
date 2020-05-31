import { Name as AsnName } from '@peculiar/asn1-x509';
import { AsnConvert } from '@peculiar/asn1-schema';

const names: Record<string, string> = {
  '2.5.4.3': 'CN',
  '2.5.4.6': 'C',
  '0.9.2342.19200300.100.1.25': 'DC',
  '1.2.840.113549.1.9.1': 'E',
  '2.5.4.42': 'G',
  '2.5.4.43': 'I',
  '2.5.4.7': 'L',
  '2.5.4.10': 'O',
  '2.5.4.11': 'OU',
  '2.5.4.8': 'ST',
  '2.5.4.4': 'SN',
  '2.5.4.12': 'T',
};

export class Name {
  private asn = new AsnName();

  public constructor(data: BufferSource | AsnName) {
    this.asn = data instanceof AsnName
      ? data
      : AsnConvert.parse(data, AsnName);
  }

  public toJSON() {
    const res = [];

    this.asn.forEach(o => (
      o.forEach((a) => {
        res.push({
          type: a.type,
          name: names[a.type],
          value: a.value.toString(),
        });
      })
    ));

    return res;
  }
}
