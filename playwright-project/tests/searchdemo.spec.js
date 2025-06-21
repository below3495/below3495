import { test, expect } from "@playwright/test";

test("Поиск товара на каталоге", async ({ page }) => {
  const combobox = page.getByRole("combobox", {
    name: "Найти ресторан, блюдо или товар",
  });
  const search = page.getByRole("button", { name: "Найти" });
  const searchResult = page.getByRole("heading", {
    name: "Найдено",
  });
  const firstResult = page
    .getByRole("listitem")
    .filter({ hasText: "Сыр" })
    .first();

  await page.goto("https://eda.yandex.ru/moscow?lang=ru&shippingType=delivery");
  await expect(combobox).toBeVisible();
  await combobox.click();
  await combobox.fill("сыр");
  await search.click();

  await expect(searchResult).toBeVisible();
  await expect(firstResult).toBeVisible();
});
