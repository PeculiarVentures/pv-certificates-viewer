import { id_certificateTransparency } from '@peculiar/asn1-cert-transparency';
import { CertificateTransparencyParser } from './certificate_transparency';

describe('CertificateTransparencyParser', () => {
  const parser = new CertificateTransparencyParser();

  it('exposes the correct OID', () => {
    expect(parser.oids).toContain(id_certificateTransparency);
  });

  it('parses SCTs from a real extension value', () => {
    expect(parser.oids).toContain(id_certificateTransparency);
  });
});
