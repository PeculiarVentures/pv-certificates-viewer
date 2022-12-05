/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface IGeneralNameOptions {
  getDNSNameLink: (value: string) => string;
  getIPAddressLink: (value: string) => string;
}

interface ILeiOptions {
  getLEILink: (value: string) => string;
}

interface IAuthorityKeyIdentifierOptions {
  getAuthKeyIdParentLink?: (value: string) => string;
  getAuthKeyIdSiblingsLink?: (value: string) => string;
}

interface ISubjectKeyIdentifierOptions {
  getSubjectKeyIdChildrenLink?: (value: string) => string;
  getSubjectKeyIdSiblingsLink?: (value: string) => string;
}
