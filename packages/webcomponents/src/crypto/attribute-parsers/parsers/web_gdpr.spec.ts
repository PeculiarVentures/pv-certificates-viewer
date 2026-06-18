import { id_WebGDPR } from '@peculiar/asn1-ntqwac';
import { makeAttrRaw } from '../../../tests/test_utils';
import { WebGDPRParser } from './web_gdpr';

const WEB_GDPR_HEX = '3081a6a00a81084744505220434142a11881164365727469666963617465206eb03132342f32303230a21b861968747470733a2f2f676470726361622e6c752f6e6f77696e61a30413024c55a45b0c594e6f77696e6120536f6c7574696f6e7320686173206265656e2073686f776e20746f206265204744505220636f6d706c69616e7420696e20697473207369676e6174757265206372656174696f6e2061637469766974696573';

describe('WebGDPRParser', () => {
  const parser = new WebGDPRParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_WebGDPR]);
    expect(parser.oids).toContain('0.4.0.9496.7');
  });

  it('parses GDPR assessment fields', () => {
    expect(parser.parse(makeAttrRaw(id_WebGDPR, WEB_GDPR_HEX))).toEqual({
      oid: '0.4.0.9496.7',
      children: [
        {
          title: 'Assessment Authority',
          children: [{
            title: 'RFC 822 Name', value: 'GDPR CAB',
          }],
        },
        {
          title: 'Assessment Reference',
          children: [{
            title: 'RFC 822 Name', value: 'Certificate n°124/2020',
          }],
        },
        {
          title: 'Assessment Location',
          children: [{
            title: 'URI', value: 'https://gdprcab.lu/nowina',
          }],
        },
        {
          title: 'Data Storage Territory', value: 'LU',
        },
        {
          title: 'Description',
          value: 'Nowina Solutions has been shown to be GDPR compliant in its signature creation activities',
        },
      ],
    });
  });
});
