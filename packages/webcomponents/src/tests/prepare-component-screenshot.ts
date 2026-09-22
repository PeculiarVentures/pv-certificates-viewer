import { waitForStable } from '@stencil/vitest';
import { page } from 'vitest/browser';

const VIEWPORT_PADDING = 16;

/**
 * Height of the visible certificate UI (shadow table), not the host's layout box.
 */
function getScreenshotElement(root: HTMLElement): HTMLElement {
  return (root.shadowRoot?.querySelector('table') as HTMLElement | null) ?? root;
}

export function measureComponentContentHeight(root: HTMLElement): number {
  const target = getScreenshotElement(root);

  return Math.ceil(Math.max(target.getBoundingClientRect().height, target.scrollHeight));
}

/**
 * Size the test iframe to the component so Playwright can capture one full frame
 * without scroll-stitch gaps (white bands below the UI).
 */
export async function prepareViewportForComponentScreenshot(
  root: HTMLElement,
  width: number,
): Promise<number> {
  document.documentElement.style.height = 'auto';
  document.documentElement.style.minHeight = '0';
  document.body.style.height = 'auto';
  document.body.style.minHeight = '0';
  document.body.style.margin = '0';

  root.scrollIntoView({ block: 'start', inline: 'nearest' });

  let contentHeight = measureComponentContentHeight(root);
  const viewportHeight = contentHeight + VIEWPORT_PADDING;

  await page.viewport(width, viewportHeight);
  await waitForStable(root);

  contentHeight = measureComponentContentHeight(root);
  const adjustedHeight = contentHeight + VIEWPORT_PADDING;

  if (adjustedHeight !== viewportHeight) {
    await page.viewport(width, adjustedHeight);
    await waitForStable(root);
    contentHeight = measureComponentContentHeight(root);
  }

  return contentHeight;
}
