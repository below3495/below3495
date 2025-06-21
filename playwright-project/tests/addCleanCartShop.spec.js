import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://eda.yandex.ru/moscow?lang=ru&shippingType=delivery");
  await page.getByRole("button", { name: "Укажите адрес доставки" }).click();
  await page.getByTestId("address-input").click();
  await page.getByTestId("address-input").fill("тверская 7");
  await page.getByLabel("Тверская улица, 7Москва").click();
  await page.getByRole("button", { name: "ОК" }).click();
  await page.getByRole("link", { name: "Магнит" }).click();
});

test("Добавление товара в корзину магазина", async ({ page }) => {
  const addToCartButton = page
    .getByRole("button", { name: "В корзину" })
    .first();
  const cart = page.getByRole("button", { name: "Корзина" });
  await addToCartButton.click();
  await expect(cart).toBeVisible();
});

test("Удаление товара из корзины", async ({ page }) => {
  const addToCartButton = page
    .getByRole("button", { name: "В корзину" })
    .first();
  const cart = page.getByRole("button", { name: "Корзина" });
  await addToCartButton.click();
  await expect(cart).toBeVisible();

  await cart.click();
  await page.getByRole("button", { name: "Очистить" }).click();
  await page.getByRole("button", { name: "Да, очистить" }).click();

  await expect(cart).toBeHidden();
});
