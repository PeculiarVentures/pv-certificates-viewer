const DEFAULT_TIMEOUT_MS = 30_000;

/**
 * Viewer components decode PEM asynchronously; wait until the main table is rendered.
 */
export async function waitForDecodedViewerTable(
  root: HTMLElement,
  waitForChangesFn: () => Promise<void>,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<HTMLElement> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    await waitForChangesFn();

    const table = root.shadowRoot?.querySelector('table') as HTMLElement | null;
    if (table) {
      const { height, width } = table.getBoundingClientRect();
      if (height > 0 && width > 0) {
        return table;
      }
    }

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
  }

  throw new Error(`Timed out after ${timeoutMs}ms waiting for decoded viewer content`);
}
