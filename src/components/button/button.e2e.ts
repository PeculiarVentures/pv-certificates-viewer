import { newE2EPage } from '@stencil/core/testing';

describe('peculiar-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<peculiar-button></peculiar-button>');

    const element = await page.find('peculiar-button');

    expect(element).toHaveClass('hydrated');
  });
});
