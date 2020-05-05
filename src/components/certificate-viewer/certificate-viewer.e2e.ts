import { newE2EPage } from '@stencil/core/testing';

describe('peculiar-certificate-viewer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<peculiar-certificate-viewer></peculiar-certificate-viewer>');

    const element = await page.find('peculiar-certificate-viewer');

    expect(element).toHaveClass('hydrated');
  });
});
