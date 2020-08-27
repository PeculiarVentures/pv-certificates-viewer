/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createBrowserHistory } from 'history';

import parseHash from './parse_hash';
import queryStringify from './query_stringify';

const browserHistory = createBrowserHistory();
const history = Object.assign(browserHistory, {
  parseHash,
  queryStringify,
});

export default history;
