import { newE2EPage } from '@stencil/core/testing';

describe('pv-circular-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<pv-circular-progress></pv-circular-progress>');

    const element = await page.find('pv-circular-progress');

    expect(element).toHaveClass('hydrated');
  });
});
