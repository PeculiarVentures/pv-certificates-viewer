/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const getLEILink = (lei: string) => `https://search.gleif.org/#/record/${lei}`;

export const getDNSNameLink = (dnsName: string) => `https://search.censys.io/search?resource=hosts&q=dns.names%3A${dnsName}`;

export const getIPAddressLink = (ipAddress: string) => `https://search.censys.io/search?resource=hosts&q=ip%3A${ipAddress}`;
