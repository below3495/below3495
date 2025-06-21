import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://eda.yandex.ru/moscow?lang=ru&shippingType=delivery");
  await page.getByRole("button", { name: "Укажите адрес доставки" }).click();
  await page.getByTestId("address-input").click();
  await page.getByTestId("address-input").fill("тверская 7");
  await page.getByLabel("Тверская улица, 7Москва").click();
  await page.getByRole("button", { name: "ОК" }).click();
  await page.getByRole("link").filter({ hasText: "Zotman Pizza" }).click();
});

test("Добавление товара в корзину ресторана", async ({ page }) => {
  const searchItem = page
    .getByRole("textbox", { name: "Найти в ресторане" })
    .fill("Волковский лимонад Волчок Манго-Кокос");
  const addToCartButton = page.getByRole("button", { name: "В корзину" });
  const cart = page.getByRole("button", { name: "Корзина" });

  await page.getByRole("textbox", { name: "Найти в ресторане" }).click();
  await searchItem;
  await addToCartButton.click();

  await expect(cart).toBeVisible();
});

test("Удаление товара из корзины ресторана", async ({ page }) => {
  const searchItem = page
    .getByRole("textbox", { name: "Найти в ресторане" })
    .fill("Волковский лимонад Волчок Манго-Кокос");
  const addToCartButton = page.getByRole("button", { name: "В корзину" });
  const cart = page.getByRole("button", { name: "Корзина" });

  await page.getByRole("textbox", { name: "Найти в ресторане" }).click();
  await searchItem;
  await addToCartButton.click();

  await expect(cart).toBeVisible();
  await cart.click();
  await page
    .locator(".AppPopup_wrapper")
    .getByRole("button", { name: "Очистить" })
    .click();
  await page.getByRole("button", { name: "Да, очистить" }).click();
  await expect(cart).toBeHidden();
});
