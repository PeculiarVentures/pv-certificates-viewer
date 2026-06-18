import {
  id_DomainNameBeneficiary,
  id_DomainNameLegalRepresentative,
  id_DomainNameOwner,
  id_DomainNameTechnicalOperator,
} from '@peculiar/asn1-ntqwac';
import { makeAttrRaw } from '../../../tests/test_utils';
import {
  DomainNameBeneficiaryParser,
  DomainNameLegalRepresentativeParser,
  DomainNameOwnerParser,
  DomainNameTechnicalOperatorParser,
} from './domain_name';

const BENEFICIARY_HEX = '3081f0310f300d06035504030c064e6f77696e6131193017060355040a0c104e6f77696e6120536f6c7574696f6e73310b3009060355040613024c55310f300d06035504070c064b65686c656e310d300b06035504110c0438323837311d301b06035504090c145a6f6e6520696e647573747269656c6c6520313531193017060355041413102b3335322d3636312d3233312d393134311d301b06092a864886f70d010901160e696e666f406e6f77696e612e6c753117301506035504610c0e5641544c552d32363835303638323123302106035504610c1a4c454958472d3232323130303251514a364b3859515951443038';

const LEGAL_REP_HEX = '30653110300e060355042a0c074f6c69766965723110300e06035504040c074261726574746531193017060355040a0c104e6f77696e6120536f6c7574696f6e73310b3009060355040613024245311730150603550405130e50415342452d4142313233343536';

const BENEFICIARY_CHILDREN = [
  {
    title: '2.5.4.3', value: 'Nowina',
  },
  {
    title: '2.5.4.10', value: 'Nowina Solutions',
  },
  {
    title: '2.5.4.6', value: 'LU',
  },
  {
    title: '2.5.4.7', value: 'Kehlen',
  },
  {
    title: '2.5.4.17', value: '8287',
  },
  {
    title: '2.5.4.9', value: 'Zone industrielle 15',
  },
  {
    title: '2.5.4.20', value: '+352-661-231-914',
  },
  {
    title: '1.2.840.113549.1.9.1', value: 'info@nowina.lu',
  },
  {
    title: '2.5.4.97', value: 'VATLU-26850682',
  },
  {
    title: '2.5.4.97', value: 'LEIXG-2221002QQJ6K8YQYQD08',
  },
];

describe('DomainNameBeneficiaryParser', () => {
  const parser = new DomainNameBeneficiaryParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_DomainNameBeneficiary]);
  });

  it('parses a domain name RDN set', () => {
    expect(parser.parse(makeAttrRaw(id_DomainNameBeneficiary, BENEFICIARY_HEX))).toEqual({
      oid: '0.4.0.9496.1',
      children: BENEFICIARY_CHILDREN,
    });
  });
});

describe('DomainNameLegalRepresentativeParser', () => {
  const parser = new DomainNameLegalRepresentativeParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_DomainNameLegalRepresentative]);
  });

  it('parses a domain name RDN set', () => {
    expect(parser.parse(makeAttrRaw(id_DomainNameLegalRepresentative, LEGAL_REP_HEX))).toEqual({
      oid: '0.4.0.9496.2',
      children: [
        {
          title: '2.5.4.42', value: 'Olivier',
        },
        {
          title: '2.5.4.4', value: 'Barette',
        },
        {
          title: '2.5.4.10', value: 'Nowina Solutions',
        },
        {
          title: '2.5.4.6', value: 'BE',
        },
        {
          title: '2.5.4.5', value: 'PASBE-AB123456',
        },
      ],
    });
  });
});

describe('DomainNameOwnerParser', () => {
  const parser = new DomainNameOwnerParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_DomainNameOwner]);
  });

  it('parses a domain name RDN set', () => {
    expect(parser.parse(makeAttrRaw(id_DomainNameOwner, BENEFICIARY_HEX))).toEqual({
      oid: '0.4.0.9496.3',
      children: BENEFICIARY_CHILDREN,
    });
  });
});

describe('DomainNameTechnicalOperatorParser', () => {
  const parser = new DomainNameTechnicalOperatorParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_DomainNameTechnicalOperator]);
  });

  it('parses a domain name RDN set', () => {
    expect(parser.parse(makeAttrRaw(id_DomainNameTechnicalOperator, BENEFICIARY_HEX))).toEqual({
      oid: '0.4.0.9496.4',
      children: BENEFICIARY_CHILDREN,
    });
  });
});
