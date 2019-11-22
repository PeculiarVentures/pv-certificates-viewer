import { newE2EPage } from '@stencil/core/testing';

describe('pv-certificate-summary', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pv-certificate-summary></pv-certificate-summary>');

    const element = await page.find('pv-certificate-summary');
    expect(element).toHaveClass('hydrated');
  });
});
