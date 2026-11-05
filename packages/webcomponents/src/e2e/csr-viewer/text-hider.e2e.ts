import { render, h, describe, it, expect } from '@stencil/vitest';
import { loadPemTestAssets } from '../../tests/load-test-assets';
import { waitForDecodedViewerTable } from '../../tests/wait-for-decoded-viewer';

const [certificate] = loadPemTestAssets('csr-viewer');

describe('collapsed values', () => {
  it('unwrap when the native <details> toggle opens', async () => {
    const { root, waitForChanges } = await render(
      h('peculiar-csr-viewer', { certificate: certificate.value }),
    );

    await waitForDecodedViewerTable(root, waitForChanges);

    const shadow = root.shadowRoot!;
    const content = shadow.querySelector<HTMLElement>('.text_hider_content')!;
    const details = shadow.querySelector<HTMLDetailsElement>('.text_hider_toggle')!;
    const summary = details.querySelector('summary')!;

    expect(getComputedStyle(content).whiteSpace).toBe('nowrap');
    expect(details.open).toBe(false);

    summary.click();

    expect(details.open).toBe(true);
    expect(getComputedStyle(content).whiteSpace).not.toBe('nowrap');

    summary.click();

    expect(details.open).toBe(false);
    expect(getComputedStyle(content).whiteSpace).toBe('nowrap');
  });

  it('keeps the value outside the toggle, so selecting it does not collapse', async () => {
    const { root, waitForChanges } = await render(
      h('peculiar-csr-viewer', { certificate: certificate.value }),
    );

    await waitForDecodedViewerTable(root, waitForChanges);

    const shadow = root.shadowRoot!;
    const content = shadow.querySelector<HTMLElement>('.text_hider_content')!;
    const details = shadow.querySelector<HTMLDetailsElement>('.text_hider_toggle')!;

    expect(details.contains(content)).toBe(false);
    expect(details.querySelector('summary')!.getAttribute('aria-label')).toBe('Show full value');
  });
});
