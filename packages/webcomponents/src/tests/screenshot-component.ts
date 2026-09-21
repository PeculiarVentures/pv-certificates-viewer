import { page } from 'vitest/browser';

type ViewportDevice = {
  viewport: {
    width: number;
    height: number;
  };
};

export async function setDeviceViewport(device: ViewportDevice): Promise<void> {
  await page.viewport(device.viewport.width, device.viewport.height);
}
