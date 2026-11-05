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
