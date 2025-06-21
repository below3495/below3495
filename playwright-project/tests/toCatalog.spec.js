import { test, expect } from "@playwright/test";

test("Переход на каталог по тапу на лого", async ({ page }) => {
  const logo = page.getByRole("link", { name: "Логотип" });
  const shopsHeader = page.getByRole("heading", { name: "Магазины" });
  const combobox = page.getByRole("combobox", {
    name: "Найти ресторан",
  });

  await page.goto("https://eda.yandex.ru/moscow?lang=ru&shippingType=delivery");
  await page.getByRole("link", { name: "Магнит" });
  await expect(logo).toBeVisible();
  await logo.click();
  await expect(shopsHeader).toBeVisible();
  await expect(combobox).toBeVisible();
});
