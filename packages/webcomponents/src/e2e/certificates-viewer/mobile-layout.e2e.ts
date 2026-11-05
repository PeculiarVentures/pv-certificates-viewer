import { render, h, describe, it, expect, waitForStable } from '@stencil/vitest';
import { prepareViewportForComponentScreenshot } from '../../tests/prepare-component-screenshot';
import { certificates } from './fixtures';

const MOBILE_WIDTH = 400;

const nextFrames = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

describe('peculiar-certificates-viewer mobile layout', () => {
  it('list', async () => {
    const { root, waitForChanges } = await render(
      h('peculiar-certificates-viewer', { certificates }),
    );

    await waitForStable(root);
    await prepareViewportForComponentScreenshot(root, MOBILE_WIDTH);
    await nextFrames();
    await waitForChanges();
    await prepareViewportForComponentScreenshot(root, MOBILE_WIDTH);

    await expect.element(root).toMatchScreenshot();
  });

  it('expanded row', async () => {
    const { root, waitForChanges } = await render(
      h('peculiar-certificates-viewer', { certificates }),
    );

    await waitForStable(root);
    await prepareViewportForComponentScreenshot(root, MOBILE_WIDTH);
    await nextFrames();
    await waitForChanges();

    root
      .shadowRoot!.querySelector<HTMLElement>(
        '.expand_button, .certificate_row_actions td > button.button',
      )!
      .click();
    await waitForChanges();
    await prepareViewportForComponentScreenshot(root, MOBILE_WIDTH);

    await expect.element(root).toMatchScreenshot();
  });
});
