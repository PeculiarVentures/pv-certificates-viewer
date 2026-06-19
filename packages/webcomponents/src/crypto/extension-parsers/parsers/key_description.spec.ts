import { id_ce_keyDescription } from '@peculiar/asn1-android';
import { makeExtRaw } from '../../../tests/test_utils';
import { KeyDescriptionParser } from './key_description';

// Extension value from Android Keystore Key.cer (test_assets)
const ANDROID_KEY_DESCRIPTION_HEX = '308201820201640a01010201640a01010420316231616461333561633432366562316638343563383765653239663065633304003057bf8545530451304f312930270421636f6d2e7469636b7069636b6c6c632e63656f627269656e2e7469636b7069636b0202012931220420ce016851b704da76fdedde34ab314a155ca5a5db31266d2685fcbf281ab510283081f6a1083106020103020102a203020103a30402020100a5053103020104aa03020101bf8377020500bf853e03020100bf85404c304a04209fb52f0954613f221af4f4070c31415ed44c1a81d51889db0946632599b3e9460101ff0a01000420ffaeec3477824dd82e09b6400602dcb274eb4e89dcb6093ad1f6ede964ed73c3bf854105020301d4c0bf8542050203031644bf854d1604146d6f746f726f6c61206564676520283230323229bf854c0a04086d6f746f726f6c61bf85480d040b7465736c615f675f737973bf85470704057465736c61bf85460a04086d6f746f726f6c61bf854e0602040134b291bf854f0602040134b291';

describe('KeyDescriptionParser', () => {
  const parser = new KeyDescriptionParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toEqual([id_ce_keyDescription]);
  });

  it('parses Android key attestation description', () => {
    expect(parser.parse(makeExtRaw(id_ce_keyDescription, ANDROID_KEY_DESCRIPTION_HEX))).toEqual({
      oid: '1.3.6.1.4.1.11129.2.1.17',
      critical: false,
      children: [
        {
          title: 'Attestation Version', value: 100,
        },
        {
          title: 'Attestation Security Level', value: 'trustedEnvironment',
        },
        {
          title: 'Keymaster Version', value: 100,
        },
        {
          title: 'Keymaster Security Level', value: 'trustedEnvironment',
        },
        {
          title: 'Attestation Challenge', value: '1b1ada35ac426eb1f845c87ee29f0ec3',
        },
        {
          title: 'Software Enforced',
          children: [{
            title: 'Attestation Application Id',
            children: [
              {
                title: 'Package Infos',
                children: [{
                  title: '',
                  children: [
                    {
                      title: 'Package Name', value: 'com.tickpickllc.ceobrien.tickpick',
                    },
                    {
                      title: 'Version', value: 297,
                    },
                  ],
                }],
              },
              {
                title: 'Signature Digests',
                children: [{
                  title: 'Digest',
                  value: 'ce016851b704da76fdedde34ab314a155ca5a5db31266d2685fcbf281ab51028',
                }],
              },
            ],
          }],
        },
        {
          title: 'TEE Enforced',
          children: [
            {
              title: 'Purpose', value: '3, 2',
            },
            {
              title: 'Algorithm', value: 3,
            },
            {
              title: 'Key Size', value: 256,
            },
            {
              title: 'Digest', value: '4',
            },
            {
              title: 'Ec Curve', value: 1,
            },
            {
              title: 'No Auth Required', value: true,
            },
            {
              title: 'Origin', value: 0,
            },
            {
              title: 'Root Of Trust',
              children: [
                {
                  title: 'Verified Boot Key',
                  value: '9fb52f0954613f221af4f4070c31415ed44c1a81d51889db0946632599b3e946',
                },
                {
                  title: 'Device Locked', value: true,
                },
                {
                  title: 'Boot State', value: 'verified',
                },
                {
                  title: 'Boot Hash',
                  value: 'ffaeec3477824dd82e09b6400602dcb274eb4e89dcb6093ad1f6ede964ed73c3',
                },
              ],
            },
            {
              title: 'Os Version', value: 120000,
            },
            {
              title: 'Os Patch Level', value: 202308,
            },
            {
              title: 'Attestation Id Model', value: 'motorola edge (2022)',
            },
            {
              title: 'Attestation Id Manufacturer', value: 'motorola',
            },
            {
              title: 'Attestation Id Product', value: 'tesla_g_sys',
            },
            {
              title: 'Attestation Id Device', value: 'tesla',
            },
            {
              title: 'Attestation Id Brand', value: 'motorola',
            },
            {
              title: 'Vendor Patch Level', value: '20230801',
            },
            {
              title: 'Boot Patch Level', value: '20230801',
            },
          ],
        },
      ],
    });
  });
});
