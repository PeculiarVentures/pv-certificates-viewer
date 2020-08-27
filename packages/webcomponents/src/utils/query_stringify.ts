/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function queryStringify(options: Record<string, any>): string {
  const parameters: string[] = [];

  Object.keys(options).forEach((o) => {
    if (
      typeof options[o] === 'string'
      || typeof options[o] === 'boolean'
      || typeof options[o] === 'number'
    ) {
      parameters.push(`${o}=${encodeURIComponent(options[o])}`);
    }
  });

  return parameters.join('&');
}
