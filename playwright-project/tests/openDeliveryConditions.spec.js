import { test, expect } from "@playwright/test";

test("Открытие условий доставки", async ({ page }) => {
  const addressInput = page.getByTestId("address-input");
  const addressChoose = page.getByRole("button", {
    name: "Укажите адрес доставки",
  });
  const cart = page.getByRole("button", { name: "Корзина" });
  const deliveryCondition = page
    .getByRole("dialog")
    .getByRole("button", { name: "Доставка" });
  const item = page
    .getByRole("listitem")
    .filter({ hasText: "Чикен ролл" })
    .getByLabel("В корзину");

  await page.goto("https://eda.yandex.ru/moscow?lang=ru&shippingType=delivery");
  await addressChoose.click();
  await addressInput.click();
  await addressInput.fill("тверская 7");
  await page.getByLabel("Тверская улица, 7Москва").click();
  await page.getByRole("button", { name: "ОК" }).click();
  await page.getByRole("link").filter({ hasText: "Zotman Pizza" }).click();

  await item.scrollIntoViewIfNeeded(); //скролл не срабатывает, пробовал разные способы
  await item.click();

  await expect(cart).toBeVisible();
  await cart.click();
  await expect(page.locator(".AppPopup_root")).toBeVisible();
  await expect(deliveryCondition).toBeVisible();
  await deliveryCondition.click();
  await expect(page.locator(".m3qwtke")).toBeVisible();
});
