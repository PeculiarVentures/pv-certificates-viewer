import { newE2EPage } from '@stencil/core/testing';

describe('pv-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<pv-button></pv-button>');

    const element = await page.find('pv-button');

    expect(element).toHaveClass('hydrated');
  });
});
