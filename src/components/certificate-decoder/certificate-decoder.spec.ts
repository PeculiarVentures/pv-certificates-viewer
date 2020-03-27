import { CertificateDecoder } from './certificate-decoder';

describe('pv-certificate-decoder', () => {
  it('builds', () => {
    expect(new CertificateDecoder()).toBeTruthy();
  });
});
