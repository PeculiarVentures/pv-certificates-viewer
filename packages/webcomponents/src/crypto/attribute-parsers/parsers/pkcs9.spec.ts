import {
  id_pkcs9_at_challengePassword,
  id_pkcs9_at_unstructuredName,
  id_pkcs9_at_extensionRequest,
} from '@peculiar/asn1-pkcs9';
import { makeAttrRaw } from '../../../tests/test_utils';
import {
  ChallengePasswordParser,
  UnstructuredNameParser,
  ExtensionRequestParser,
} from './pkcs9';

describe('ChallengePasswordParser', () => {
  const parser = new ChallengePasswordParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_pkcs9_at_challengePassword]);
  });

  it('parses a UTF8String challenge password', () => {
    expect(parser.parse(makeAttrRaw(
      id_pkcs9_at_challengePassword,
      '0c06736563726574',
    ))).toEqual({
      oid: '1.2.840.113549.1.9.7',
      children: [{
        title: 'Value', value: 'secret',
      }],
    });
  });
});

describe('UnstructuredNameParser', () => {
  const parser = new UnstructuredNameParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_pkcs9_at_unstructuredName]);
  });

  it('parses an IA5String unstructured name', () => {
    expect(parser.parse(makeAttrRaw(
      id_pkcs9_at_unstructuredName,
      '160b6578616d706c652e636f6d',
    ))).toEqual({
      oid: '1.2.840.113549.1.9.2',
      children: [{
        title: 'Value', value: 'example.com',
      }],
    });
  });
});

describe('ExtensionRequestParser', () => {
  const parser = new ExtensionRequestParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_pkcs9_at_extensionRequest]);
  });

  it('parses nested certificate extensions', () => {
    // ExtensionRequest from domain.test.csr: subjectAltName with otherName + rfc822Name
    expect(parser.parse(makeAttrRaw(
      id_pkcs9_at_extensionRequest,
      '3030302e0603551d1104273025a023060a2b060104018237140203a0150c136164647265737340646f6d61696e2e74657374',
    ))).toEqual({
      oid: '1.2.840.113549.1.9.14',
      children: [{
        title: 'Extensions',
        children: [{
          oid: '2.5.29.17',
          critical: false,
          children: [
            {
              title: 'Other Name',
              children: [
                {
                  title: 'Type', value: '1.3.6.1.4.1.311.20.2.3',
                },
                {
                  title: 'Value', value: 'address@domain.test',
                },
              ],
            },
          ],
        }],
      }],
    });
  });
});
