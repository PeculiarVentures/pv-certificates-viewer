import { render, h, describe, it, expect, waitForStable } from '@stencil/vitest';
import { loadPemTestAssets } from '../../tests/load-test-assets';
import { waitForDecodedViewerTable } from '../../tests/wait-for-decoded-viewer';
import { certificates as listCertificates } from '../certificates-viewer/fixtures';

const [certificate] = loadPemTestAssets('certificate-viewer');

const nextFrames = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

async function renderViewer(width: string) {
  const { root, waitForChanges } = await render(
    h(
      'div',
      { style: { width } },
      h('peculiar-certificate-viewer', { certificate: certificate.value }),
    ),
  );
  const viewer = root.querySelector<HTMLElement>('peculiar-certificate-viewer')!;

  await waitForDecodedViewerTable(viewer, waitForChanges);

  // In the mobile layout (CSS container query on the host) cells stack as blocks.
  const cellDisplay = () => getComputedStyle(viewer.shadowRoot!.querySelector('td')!).display;

  return { wrapper: root, cellDisplay };
}

describe('mobile layout (container query)', () => {
  it('follows the component width, not the viewport', async () => {
    const { cellDisplay } = await renderViewer('600px');

    expect(cellDisplay()).toBe('block');
  });

  it('uses the desktop layout in a wide container', async () => {
    const { cellDisplay } = await renderViewer('1000px');

    expect(cellDisplay()).toBe('table-cell');
  });

  it('switches when the container is resized', async () => {
    const { wrapper, cellDisplay } = await renderViewer('1000px');

    wrapper.style.width = '600px';
    await nextFrames();

    expect(cellDisplay()).toBe('block');
  });

  it('hides the list header and shows cell labels in a narrow certificates-viewer', async () => {
    const { root } = await render(
      h(
        'div',
        { style: { width: '600px' } },
        h('peculiar-certificates-viewer', { certificates: listCertificates }),
      ),
    );
    const viewer = root.querySelector<HTMLElement>('peculiar-certificates-viewer')!;

    await waitForStable(viewer);

    const shadow = viewer.shadowRoot!;

    expect(getComputedStyle(shadow.querySelector('thead')!).display).toBe('none');
    expect(getComputedStyle(shadow.querySelector('.cell_label')!).display).toBe('block');
  });
});
