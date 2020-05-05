import { newE2EPage } from '@stencil/core/testing';

describe('peculiar-certificate-decoder', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<peculiar-certificate-decoder></peculiar-certificate-decoder>');

    const element = await page.find('peculiar-certificate-decoder');

    expect(element).toHaveClass('hydrated');
  });
});
