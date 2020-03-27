import { newE2EPage } from '@stencil/core/testing';

describe('pv-certificate-decoder', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pv-certificate-decoder></pv-certificate-decoder>');

    const element = await page.find('pv-certificate-decoder');
    expect(element).toHaveClass('hydrated');
  });
});
