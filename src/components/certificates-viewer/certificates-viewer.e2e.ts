import { newE2EPage } from '@stencil/core/testing';

describe('peculiar-certificates-viewer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<peculiar-certificates-viewer></peculiar-certificates-viewer>');

    const element = await page.find('peculiar-certificates-viewer');

    expect(element).toHaveClass('hydrated');
  });
});
