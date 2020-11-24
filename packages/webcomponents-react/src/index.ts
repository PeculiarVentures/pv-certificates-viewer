/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElements, applyPolyfills } from '@peculiar/certificates-viewer/loader';

export * from './components';

if (typeof window !== 'undefined') {
  applyPolyfills()
    .then(() => defineCustomElements(window));
}
