/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElements } from '@peculiar/certificates-viewer/loader';

export * from './components';

// TODO: defineCustomElements() is asyncronous
// We need to use the promise
if (typeof window !== 'undefined') {
  defineCustomElements(window);
}
