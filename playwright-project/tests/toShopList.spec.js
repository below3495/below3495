import { test, expect } from "@playwright/test";

test("Переход в магазин лист с главной", async ({ page }) => {
  const allShops = page.getByRole("button", { name: "Все Магазины" });
  const headerPop = page.getByRole("heading", { name: "Популярные" });

  await page.goto("https://eda.yandex.ru/moscow?lang=ru&shippingType=delivery");
  await expect(allShops).toBeVisible();
  await allShops.click();
  await expect(headerPop).toBeVisible();
});
