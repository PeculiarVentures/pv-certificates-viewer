import { newE2EPage } from '@stencil/core/testing';

describe('pv-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pv-input></pv-input>');

    const element = await page.find('pv-input');
    expect(element).toHaveClass('hydrated');
  });
});
