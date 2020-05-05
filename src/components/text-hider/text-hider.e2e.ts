import { newE2EPage } from '@stencil/core/testing';

describe('peculiar-text-hider', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<peculiar-text-hider></peculiar-text-hider>');

    const element = await page.find('peculiar-text-hider');

    expect(element).toHaveClass('hydrated');
  });
});
