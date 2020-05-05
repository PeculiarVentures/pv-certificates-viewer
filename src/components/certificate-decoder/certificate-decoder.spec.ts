import { CertificateDecoder } from './certificate-decoder';

describe('peculiar-certificate-decoder', () => {
  it('builds', () => {
    expect(new CertificateDecoder()).toBeTruthy();
  });
});
