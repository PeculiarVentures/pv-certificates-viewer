import { render, h, describe, it, expect, waitForStable } from '@stencil/vitest';
import { prepareViewportForComponentScreenshot } from '../../tests/prepare-component-screenshot';
import { certificates } from './fixtures';

const VIEWPORT_WIDTH = 1024;

describe('peculiar-certificates-viewer', () => {
  it('Google PKI demo root certificates', async () => {
    const { root, setProps, waitForChanges } = await render(h('peculiar-certificates-viewer', {}));

    await setProps({ certificates });
    await waitForChanges();
    await waitForStable(root);

    await prepareViewportForComponentScreenshot(root, VIEWPORT_WIDTH);

    await expect.element(root).toMatchScreenshot();
  });
});

describe('peculiar-certificates-viewer search', () => {
  it('filters rows by name, issuer, algorithm and fingerprint', async () => {
    const { root, waitForChanges } = await render(
      h('peculiar-certificates-viewer', { certificates }),
    );

    await waitForStable(root);

    const shadow = root.shadowRoot!;
    const rows = () => shadow.querySelectorAll('tbody > tr').length;
    const search = async (value: string) => {
      const input = shadow.querySelector<HTMLInputElement>('input[type="search"]')!;

      input.value = value;
      input.dispatchEvent(new Event('input'));
      await waitForChanges();
    };

    const total = rows();

    expect(total).toBe(certificates.length);

    await search('gts root r2');
    expect(rows()).toBe(1);

    await search('ECDSA');
    expect(rows()).toBeGreaterThan(0);
    expect(rows()).toBeLessThan(total);

    await search('no-such-certificate');
    expect(shadow.textContent).toContain('No results found');
  });
});
