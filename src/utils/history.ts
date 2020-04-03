import { createBrowserHistory } from 'history';

import parseHash from './parseHash';
import queryStringify from './queryStringify';

const browserHistory = createBrowserHistory();
const history = Object.assign(browserHistory, {
  parseHash,
  queryStringify,
});

export default history;
