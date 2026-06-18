import {
  GeneralName,
  OtherName,
  EDIPartyName,
  DirectoryString,
  Name,
  RelativeDistinguishedName,
  AttributeTypeAndValue,
  AttributeValue,
} from '@peculiar/asn1-x509';
import { parseGeneralName } from './parse_general_name';

// --- helpers ---

function gn(fields: Partial<GeneralName>): GeneralName {
  return new GeneralName(fields);
}

// Build a single-RDN directoryName with the given OID + string value
function directoryNameGn(typeOid: string, value: string): GeneralName {
  const atv = new AttributeTypeAndValue();

  atv.type = typeOid;
  atv.value = new AttributeValue({ utf8String: value });

  const rdn = new RelativeDistinguishedName([atv]);
  const name = new Name([rdn]);

  return new GeneralName({ directoryName: name });
}

// ---------------------------------------------------------------------------

describe('parseGeneralName', () => {
  // --- string primitives ---

  it('parses uniformResourceIdentifier', () => {
    expect(parseGeneralName(gn({ uniformResourceIdentifier: 'http://example.com/crl' }))).toEqual({
      title: 'URI',
      value: 'http://example.com/crl',
    });
  });

  it('parses dNSName', () => {
    expect(parseGeneralName(gn({ dNSName: 'example.com' }))).toEqual({
      title: 'DNS Name',
      value: 'example.com',
      _type: 'dNSName',
    });
  });

  it('parses rfc822Name', () => {
    expect(parseGeneralName(gn({ rfc822Name: 'user@example.com' }))).toEqual({
      title: 'RFC 822 Name',
      value: 'user@example.com',
    });
  });

  it('parses registeredID', () => {
    expect(parseGeneralName(gn({ registeredID: '1.2.3.4.5' }))).toEqual({
      title: 'Registered ID',
      value: '1.2.3.4.5',
    });
  });

  // The library's AsnIpConverter decodes the raw bytes into a dotted string
  it('parses iPAddress (already decoded to string by the library)', () => {
    expect(parseGeneralName(gn({ iPAddress: '10.0.0.1' }))).toEqual({
      title: 'IP Address',
      value: '10.0.0.1',
      _type: 'iPAddress',
    });
  });

  it('parses IPv6 iPAddress', () => {
    expect(parseGeneralName(gn({ iPAddress: '2001:db8::1' }))).toEqual({
      title: 'IP Address',
      value: '2001:db8::1',
      _type: 'iPAddress',
    });
  });

  // --- structured types ---

  it('parses otherName into a section with type and decoded value', () => {
    const on = new OtherName({
      typeId: '1.3.6.1.4.1.311.20.2.3',
      value: new Uint8Array([0x0c, 0x05, 0x61, 0x64, 0x6d, 0x69, 0x6e]).buffer,
    });

    expect(parseGeneralName(new GeneralName({ otherName: on }))).toEqual({
      title: 'Other Name',
      children: [
        {
          title: 'Type', value: '1.3.6.1.4.1.311.20.2.3',
        },
        {
          title: 'Value', value: 'admin',
        },
      ],
    });
  });

  it('parses ediPartyName with both nameAssigner and partyName', () => {
    const edi = new EDIPartyName();

    edi.nameAssigner = new DirectoryString({ utf8String: 'ExampleAssigner' });
    edi.partyName = new DirectoryString({ utf8String: 'ExampleParty' });

    expect(parseGeneralName(new GeneralName({ ediPartyName: edi }))).toEqual({
      title: 'EDI Party Name',
      children: [
        {
          title: 'Name Assigner', value: 'ExampleAssigner',
        },
        {
          title: 'Party Name', value: 'ExampleParty',
        },
      ],
    });
  });

  it('parses ediPartyName without nameAssigner', () => {
    const edi = new EDIPartyName();

    edi.partyName = new DirectoryString({ utf8String: 'JustParty' });

    expect(parseGeneralName(new GeneralName({ ediPartyName: edi }))).toEqual({
      title: 'EDI Party Name',
      children: [
        {
          title: 'Party Name', value: 'JustParty',
        },
      ],
    });
  });

  it('parses directoryName — uses OID as title', () => {
    const result = parseGeneralName(directoryNameGn('2.5.4.3', 'Test CA'));

    expect(result).toEqual({
      title: 'Directory Name',
      children: [{
        title: '2.5.4.3', value: 'Test CA',
      }],
    });
  });

  it('parses directoryName — unknown OID uses raw OID as title', () => {
    const result = parseGeneralName(directoryNameGn('1.2.3.4.99', 'Unknown'));

    expect(result).toEqual({
      title: 'Directory Name',
      children: [{
        title: '1.2.3.4.99', value: 'Unknown',
      }],
    });
  });

  it('parses directoryName with multiple attributes', () => {
    const cnAtv = new AttributeTypeAndValue();

    cnAtv.type = '2.5.4.3';
    cnAtv.value = new AttributeValue({ utf8String: 'Test CA' });

    const oAtv = new AttributeTypeAndValue();

    oAtv.type = '2.5.4.10';
    oAtv.value = new AttributeValue({ utf8String: 'Test Org' });

    const rdn = new RelativeDistinguishedName([cnAtv]);
    const rdn2 = new RelativeDistinguishedName([oAtv]);
    const name = new Name([rdn, rdn2]);

    expect(parseGeneralName(new GeneralName({ directoryName: name }))).toEqual({
      title: 'Directory Name',
      children: [
        {
          title: '2.5.4.3', value: 'Test CA',
        },
        {
          title: '2.5.4.10', value: 'Test Org',
        },
      ],
    });
  });

  it('parses x400Address as hex', () => {
    const result = parseGeneralName(
      new GeneralName({ x400Address: new Uint8Array([0xde, 0xad, 0xbe, 0xef]).buffer }),
    );

    expect(result).toEqual({
      title: 'X400 Address',
      value: 'deadbeef',
    });
  });

  it('returns Unknown for an empty GeneralName', () => {
    expect(parseGeneralName(new GeneralName())).toEqual({
      title: 'Unknown', value: '',
    });
  });
});
