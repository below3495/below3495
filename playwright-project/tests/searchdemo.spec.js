import { test, expect } from '@playwright/test';

const TEXT = {
  searchPlaceholder: {
    ru: 'Найти ресторан, блюдо или товар',
    en: 'Search for restaurants, food'
  },
  searchButton: {
    ru: 'Найти',
    en: 'Search'
  },
  resultsHeader: {
    ru: 'Найдено',
    en: 'Found'
  }
};

test('Поиск товара на каталоге', async ({ page }) => {
  
const searchInput = page.getByRole('combobox', { name: new RegExp('ресторан|restaurant', 'i') });
const searchButton = page.getByRole('button', { name: new RegExp('найти|search', 'i') }).last();
const resultsHeader = page.getByRole('heading').filter({ hasText: new RegExp('найдено|found', 'i') });
const resultsDiv = page.locator('#main div').filter({ hasText: new RegExp('найдено|found', 'i') }).first();
  
  await page.goto('https://eda.yandex.ru/moscow?shippingType=delivery');

  await searchInput.waitFor();
  await searchInput.click();
  
  await searchInput.fill('сыр');
  
  await searchButton.click();
  
  await expect(resultsHeader).toBeVisible();
  await expect(resultsDiv).toBeVisible();
});
