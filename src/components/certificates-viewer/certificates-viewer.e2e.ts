import { newE2EPage } from '@stencil/core/testing';

describe('pv-certificates-viewer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pv-certificates-viewer></pv-certificates-viewer>');

    const element = await page.find('pv-certificates-viewer');
    expect(element).toHaveClass('hydrated');
  });
});
