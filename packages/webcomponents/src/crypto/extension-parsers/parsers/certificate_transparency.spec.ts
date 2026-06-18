import { id_certificateTransparency } from '@peculiar/asn1-cert-transparency';
import { makeExtRaw } from '../../../tests/test_utils';
import { CertificateTransparencyParser } from './certificate_transparency';

// Extension value from Le Banque.cer (test_assets)
const LE_BANQUE_CT_HEX = '0482016a0168007600e83ed0da3ef5063532e75728bc896bc903d3cbd1116beceb69e1777d6d06bd6e00000182affd502a000004030047304502207b3eea325691eb88d8fe64ca43474eb84f0313194b2eb854c684baeb520eb5b2022100bfe2f2d24485af3b902c9f7f2fbe5b82fdb760396444b256cde82f6339fff4140076006f5376ac31f03119d89900a45115ff77151c11d902c10029068db2089a37d91300000182affd4dd30000040300473045022100e3408aef79bb78a5675d308ae9ffe2656fd4c4da0f1d9484f749c159e4258df5022003613c56ae0d203f61e1f6cb67eee64f05a3483399476c6c49b705581fa72bbf007600b3737707e18450f86386d605a9dc11094a792db1670c0b87dcf0030e7936a59a00000182affd4f47000004030047304502205879052fd7bdf1b99f25f0c087faae06ce442e913c4941486dbda397d593b5b6022100ade7501e2dc8125dad60a01ec65484d7319d6ae43c51889d3eb3842fb0a8dbd8';

describe('CertificateTransparencyParser', () => {
  const parser = new CertificateTransparencyParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_certificateTransparency]);
  });

  it('parses SCTs from a real extension value', () => {
    const result = parser.parse(makeExtRaw(id_certificateTransparency, LE_BANQUE_CT_HEX));

    expect(result).toEqual({
      oid: '1.3.6.1.4.1.11129.2.4.2',
      critical: false,
      children: [{
        title: 'Timestamps',
        children: [
          {
            title: '',
            children: [
              {
                title: 'Version', value: 0,
              },
              {
                title: 'Log ID', value: 'e83ed0da3ef5063532e75728bc896bc903d3cbd1116beceb69e1777d6d06bd6e',
              },
              {
                title: 'Timestamp', value: 'Thu, 18 Aug 2022 08:06:30 GMT',
              },
              {
                title: 'Hash Algorithm', value: 'sha256',
              },
              {
                title: 'Signature Algorithm', value: 'ecdsa',
              },
              {
                title: 'Signature',
                value: 'MEUCIHs+6jJWkeuI2P5kykNHTrhPAxMZSy64VMaEuutSDrWyAiEAv+Ly0kSFrzuQLJ9/L75bgv23YDlkRLJWzegvYzn/9BQ=',
              },
            ],
          },
          {
            title: '',
            children: [
              {
                title: 'Version', value: 0,
              },
              {
                title: 'Log ID', value: '6f5376ac31f03119d89900a45115ff77151c11d902c10029068db2089a37d913',
              },
              {
                title: 'Timestamp', value: 'Thu, 18 Aug 2022 08:06:29 GMT',
              },
              {
                title: 'Hash Algorithm', value: 'sha256',
              },
              {
                title: 'Signature Algorithm', value: 'ecdsa',
              },
              {
                title: 'Signature',
                value: 'MEUCIQDjQIrvebt4pWddMIrp/+Jlb9TE2g8dlIT3ScFZ5CWN9QIgA2E8Vq4NID9h4fbLZ+7mTwWjSDOZR2xsSbcFWB+nK78=',
              },
            ],
          },
          {
            title: '',
            children: [
              {
                title: 'Version', value: 0,
              },
              {
                title: 'Log ID', value: 'b3737707e18450f86386d605a9dc11094a792db1670c0b87dcf0030e7936a59a',
              },
              {
                title: 'Timestamp', value: 'Thu, 18 Aug 2022 08:06:29 GMT',
              },
              {
                title: 'Hash Algorithm', value: 'sha256',
              },
              {
                title: 'Signature Algorithm', value: 'ecdsa',
              },
              {
                title: 'Signature',
                value: 'MEUCIFh5BS/XvfG5nyXwwIf6rgbORC6RPElBSG29o5fVk7W2AiEAredQHi3IEl2tYKAexlSE1zGdauQ8UYidPrOEL7Co29g=',
              },
            ],
          },
        ],
      }],
    });
  });
});
