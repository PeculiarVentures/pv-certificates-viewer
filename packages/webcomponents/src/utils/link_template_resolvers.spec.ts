import { describe, it, expect } from 'vitest';
import { buildLinkTemplateResolvers } from './link_template_resolvers';

describe('buildLinkTemplateResolvers', () => {
  it('substitutes template placeholders in link patterns', () => {
    const resolvers = buildLinkTemplateResolvers({
      authKeyIdParentLink: 'https://example.test/parent/{{authKeyId}}',
      authKeyIdSiblingsLink: 'https://example.test/siblings/{{authKeyId}}',
      subjectKeyIdChildrenLink: 'https://example.test/children/{{subjectKeyId}}',
      subjectKeyIdSiblingsLink: 'https://example.test/sk-siblings/{{subjectKeyId}}',
      issuerDnLink: 'https://example.test/issuer',
    });

    expect(resolvers.getAuthKeyIdParentLink('abc')).toBe('https://example.test/parent/abc');
    expect(resolvers.getAuthKeyIdSiblingsLink('abc')).toBe('https://example.test/siblings/abc');
    expect(resolvers.getSubjectKeyIdChildrenLink('def')).toBe('https://example.test/children/def');
    expect(resolvers.getSubjectKeyIdSiblingsLink('def')).toBe(
      'https://example.test/sk-siblings/def',
    );
    expect(resolvers.getIssuerDnLink()).toBe('https://example.test/issuer');
  });

  it('returns undefined when template props are omitted', () => {
    const resolvers = buildLinkTemplateResolvers({});

    expect(resolvers.getAuthKeyIdParentLink('abc')).toBeUndefined();
    expect(resolvers.getIssuerDnLink()).toBeUndefined();
  });
});
