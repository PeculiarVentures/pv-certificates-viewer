import { newE2EPage } from '@stencil/core/testing';

describe('pv-text-hider', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<pv-text-hider></pv-text-hider>');

    const element = await page.find('pv-text-hider');

    expect(element).toHaveClass('hydrated');
  });
});
