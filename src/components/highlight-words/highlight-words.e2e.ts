import { newE2EPage } from '@stencil/core/testing';

describe('pv-highlight-words', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<pv-highlight-words></pv-highlight-words>');

    const element = await page.find('pv-highlight-words');

    expect(element).toHaveClass('hydrated');
  });
});
