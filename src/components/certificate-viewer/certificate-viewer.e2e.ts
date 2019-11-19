import { newE2EPage } from '@stencil/core/testing';

describe('pv-certificate-viewer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pv-certificate-viewer></pv-certificate-viewer>');

    const element = await page.find('pv-certificate-viewer');
    expect(element).toHaveClass('hydrated');
  });
});
