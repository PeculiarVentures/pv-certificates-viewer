/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Convert } from 'pvtsutils';
import { KeyDescriptionExtension } from './key_description_extension';

describe('KeyDescriptionExtension', () => {
  it('should return correct JSON structure', () => {
    /**
     * Name: Key Description
     * Critical: No
     * Contains Android Key Attestation data
     */
    const hexExtension = '30819406082b0601050507011104820186308201820201640a01010201640a01010420316231616461333561633432366562316638343563383765653239663065633304003057bf8545530451304f312930270421636f6d2e7469636b7069636b6c6c632e63656f627269656e2e7469636b7069636b0202012931220420ce016851b704da76fdedde34ab314a155ca5a5db31266d2685fcbf281ab510283081f6a1083106020103020102a203020103a30402020100a5053103020104aa03020101bf8377020500bf853e03020100bf85404c304a04209fb52f0954613f221af4f4070c31415ed44c1a81d51889db0946632599b3e9460101ff0a01000420ffaeec3477824dd82e09b6400602dcb274eb4e89dcb6093ad1f6ede964ed73c3bf854105020301d4c0bf8542050203031644bf854d1604146d6f746f726f6c61206564676520283230323229bf854c0a04086d6f746f726f6c61bf85480d040b7465736c615f675f737973bf85470704057465736c61bf85460a04086d6f746f726f6c61bf854e0602040134b291bf854f0602040134b291';
    const extension = new KeyDescriptionExtension(Convert.FromHex(hexExtension));

    const json = extension.toJSON();

    expect(json).toMatchSnapshot();
  });
});
