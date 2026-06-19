import fs from 'fs';
import path from 'path';
import { X509AttributeCertificate } from './x509_attribute_certificate';

const testAssetsFolderPath = path.join(__dirname, '../components/attribute-certificate-viewer/test_assets');
const testFiles = fs.readdirSync(testAssetsFolderPath)
  .filter((fileName) => fileName !== '.DS_Store');
const certificates = testFiles.map((fileName) => ({
  name: fileName,
  value: fs.readFileSync(path.join(testAssetsFolderPath, fileName), { encoding: 'utf-8' }),
}));

describe('X509AttributeCertificate', () => {
  certificates.forEach((certificate) => {
    it(`should parse the test certificate ${certificate.name}`, () => {
      const x509AttributeCertificate = new X509AttributeCertificate(certificate.value);

      x509AttributeCertificate.parseExtensions();
      x509AttributeCertificate.parseAttributes();

      expect(x509AttributeCertificate).toMatchSnapshot();
    });
  });
});
