import { test, expect } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({ 
  use: {
    locale: 'ru-RU',
    permissions: [],
  }});

  test.use({
    locale: 'ru-RU',
  });
  test.use({permissions: []})

test('Открытие рекламного объявления', async ({ page }) => {
  const adv = page.getByRole('button', { name: 'Реклама' })
  const advHeader = page.getByText('Рекламное объявление')
  const advCopyButton = page.getByRole('button', { name: 'Скопировать ссылку на объявление' })
  const advClose = page.getByRole('button', { name: 'Закрыть модальное окно' })
  
  await page.goto('https://eda.yandex.ru/moscow?shippingType=delivery');
  await adv.first().click();
  await expect(advHeader).toBeVisible();
  await expect(advCopyButton).toBeVisible();
  await expect(advClose).toBeVisible();
});
