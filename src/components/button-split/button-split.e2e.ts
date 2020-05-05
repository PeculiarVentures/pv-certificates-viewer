import { newE2EPage } from '@stencil/core/testing';

describe('peculiar-button-split', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<peculiar-button-split></peculiar-button-split>');

    const element = await page.find('peculiar-button-split');

    expect(element).toHaveClass('hydrated');
  });
});
