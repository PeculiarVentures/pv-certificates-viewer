import { describe, it, expect } from 'vitest';
import { getDNSNameLink, getIPAddressLink, getLEILink } from './third_party_links';

describe('third_party_links', () => {
  it('builds GLEIF search URL for LEI', () => {
    expect(getLEILink('5493000IBP32UQZ0KL24')).toBe(
      'https://search.gleif.org/#/record/5493000IBP32UQZ0KL24',
    );
  });

  it('builds Censys DNS search URL', () => {
    expect(getDNSNameLink('example.com')).toBe(
      'https://search.censys.io/search?resource=hosts&q=dns.names%3Aexample.com',
    );
  });

  it('builds Censys IP search URL', () => {
    expect(getIPAddressLink('203.0.113.1')).toBe(
      'https://search.censys.io/search?resource=hosts&q=ip%3A203.0.113.1',
    );
  });
});
