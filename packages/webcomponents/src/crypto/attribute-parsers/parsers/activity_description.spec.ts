import { id_ActivityDescription } from '@peculiar/asn1-ntqwac';
import { makeAttrRaw } from '../../../tests/test_utils';
import { ActivityDescriptionParser } from './activity_description';

const ACTIVITY_HEX = '30820218a00981074e41434542454ca108810636362e303130a2210c1f436f6d70757465722070726f6772616d6d696e672061637469766974696573a38201dc0c8201d84c6120736f6369c3a974c3a9206120706f7572206f626a6574206c652064c3a976656c6f7070656d656e742c206c612076656e7465206574206c61206d69736520656e20706c61636520646520736f6c7574696f6e7320696e666f726d617469717565732028736f667477617265206574206861726477617265292064657374696ec3a965732061757820656e747265707269736573207075626c69717565732065742070726976c3a965732c20656e20636520636f6d70726973206c6120636f6e73756c74616e63652064616e73206c6520646f6d61696e6520696e666f726d6174697175652c206c652064c3a976656c6f7070656d656e742c206c61206d69736520656e20706c6163652c206c6520737570706f7274206574206c61206d61696e74656e616e63652064652073797374c3a86d6573206427696e666f726d6174696f6e2c2061696e736920717565206c612076656e7465206465206d6174c3a97269656c2065742064652070726f6772616d6d65732c2061696e73692071756520746f75746573206c6573206f70c3a9726174696f6e7320736520726170706f7274616e7420646972656374656d656e74206f7520696e646972656374656d656e7420c3a02063657474652061637469766974c3a92e';

const SHORT_DESCRIPTION = 'La société a pour objet le développement, la vente et la mise en place de solutions informatiques (software et hardware) destinées aux entreprises publiques et privées, en ce compris la consultance dans le domaine informatique, le développement, la mise en place, le support et la maintenance de systèmes d\'information, ainsi que la vente de matériel et de programmes, ainsi que toutes les opérations se rapportant directement ou indirectement à cette activité.';

describe('ActivityDescriptionParser', () => {
  const parser = new ActivityDescriptionParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ActivityDescription]);
  });

  it('parses activity description fields', () => {
    expect(parser.parse(makeAttrRaw(id_ActivityDescription, ACTIVITY_HEX))).toEqual({
      oid: '0.4.0.9496.6',
      children: [
        {
          title: 'Code Authority',
          children: [{
            title: 'RFC 822 Name', value: 'NACEBEL',
          }],
        },
        {
          title: 'Code ID',
          children: [{
            title: 'RFC 822 Name', value: '66.010',
          }],
        },
        {
          title: 'Short Name', value: 'Computer programming activities',
        },
        {
          title: 'Short Description', value: SHORT_DESCRIPTION,
        },
      ],
    });
  });
});
