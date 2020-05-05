import { newE2EPage } from '@stencil/core/testing';

describe('peculiar-highlight-words', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<peculiar-highlight-words></peculiar-highlight-words>');

    const element = await page.find('peculiar-highlight-words');

    expect(element).toHaveClass('hydrated');
  });
});
