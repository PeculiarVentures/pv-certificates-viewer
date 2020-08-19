import { createBrowserHistory } from 'history';

import parseHash from './parse_hash';
import queryStringify from './query_stringify';

const browserHistory = createBrowserHistory();
const history = Object.assign(browserHistory, {
  parseHash,
  queryStringify,
});

export default history;
