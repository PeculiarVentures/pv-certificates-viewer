import fs from 'fs';
import path from 'path';
import { X509Certificate } from './x509_certificate';

const testAssetsFolderPath = path.join(__dirname, '../components/certificate-viewer/test_assets');
const testFiles = fs.readdirSync(testAssetsFolderPath)
  .filter((fileName) => fileName !== '.DS_Store');
const certificates = testFiles.map((fileName) => ({
  name: fileName,
  value: fs.readFileSync(path.join(testAssetsFolderPath, fileName), { encoding: 'utf-8' }),
}));

describe('X509Certificate', () => {
  certificates.forEach((certificate) => {
    it(`should parse the test certificate ${certificate.name}`, () => {
      const x509Certificate = new X509Certificate(certificate.value);

      x509Certificate.parseExtensions();

      expect(x509Certificate).toMatchSnapshot();
    });
  });
});
