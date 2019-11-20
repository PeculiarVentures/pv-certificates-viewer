import { newE2EPage } from '@stencil/core/testing';

describe('pv-button-split', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pv-button-split></pv-button-split>');

    const element = await page.find('pv-button-split');
    expect(element).toHaveClass('hydrated');
  });
});
