import { newE2EPage } from '@stencil/core/testing';

describe('peculiar-circular-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<peculiar-circular-progress></peculiar-circular-progress>');

    const element = await page.find('peculiar-circular-progress');

    expect(element).toHaveClass('hydrated');
  });
});
