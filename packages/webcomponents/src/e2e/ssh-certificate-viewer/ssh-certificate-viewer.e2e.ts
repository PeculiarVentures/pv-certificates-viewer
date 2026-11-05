import { render, h, describe, it, expect } from '@stencil/vitest';
import { loadRawTestAssets } from '../../tests/load-test-assets';
import { waitForDecodedViewerTable } from '../../tests/wait-for-decoded-viewer';

const certificates = loadRawTestAssets('ssh-certificate-viewer');

describe('peculiar-ssh-certificate-viewer', () => {
  certificates.forEach((certificate) => {
    it(`renders the key sections of ${certificate.name}`, async () => {
      const { root, waitForChanges } = await render(
        h('peculiar-ssh-certificate-viewer', { certificate: certificate.value, download: true }),
      );

      await waitForDecodedViewerTable(root, waitForChanges);

      const text = root.shadowRoot!.textContent ?? '';

      expect(text).toContain('Basic Information');
      expect(text).toContain('Public Key Info');
      expect(text).toContain('Signing CA');
      // One SHA-256 thumbprint per decoded key: public key and signing CA.
      expect(text.match(/Thumbprint \(SHA-256\)/g)).toHaveLength(2);
      expect(text).toContain('Download');
    });
  });
});
