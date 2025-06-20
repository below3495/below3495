import { test, expect } from "@playwright/test";

test("Проверка выбора времени доставки на каталоге", async ({ page }) => {
  const addressInput = page.getByTestId("address-input");
  const deliveryTime = page.getByRole("button", {
    name: "Выбрать время доставки. Выбранное время доставки Сейчас",
  });
  const newDeliveryTime = page.getByRole("button", {
    name: "Выбрать время доставки. Выбранное время доставки 22:30",
  });
  const addressChoose = page.getByRole("button", {
    name: "Укажите адрес доставки",
  });

  await page.goto("https://eda.yandex.ru/moscow?lang=ru&shippingType=delivery");
  await expect(addressChoose).toBeVisible();
  await addressChoose.click();
  await addressInput.click();
  await addressInput.fill("тверская 7");
  await page.getByLabel("Тверская улица, 7Москва").click();
  await page.getByRole("button", { name: "ОК" }).click();

  await expect(deliveryTime).toBeVisible();
  await deliveryTime.click();
  await page.getByRole("option", { name: "22:30" }).click();
  await expect(newDeliveryTime).toBeVisible();
});
