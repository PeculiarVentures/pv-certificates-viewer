import { newE2EPage } from '@stencil/core/testing';

describe('peculiar-certificate-summary', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<peculiar-certificate-summary></peculiar-certificate-summary>');

    const element = await page.find('peculiar-certificate-summary');

    expect(element).toHaveClass('hydrated');
  });
});
