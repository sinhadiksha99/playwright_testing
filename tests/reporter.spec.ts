import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");
})

test("pw_locator_logo", async ({ page }) => {
    const logo = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();
});

test("pw_locator_welcome", async ({ page }) => {
    const welcomeText = page.getByText("Welcome to our store");
    await expect(welcomeText).not.toBeVisible();
});

test("pw_locator_regsiter", async ({ page }) => {
    await page.getByRole("link", { name: "Register" }).click();
    const registerHeading = page.getByRole("heading", { name: "Register" });
    await expect(registerHeading).toBeVisible();
    await page.getByLabel("First name:").fill("John");
    await page.getByLabel("Last name:").fill("Kennedy");
    await page.getByLabel("Email:").fill("Kennedy@gmail.com");
    await page.getByPlaceholder("Search store").fill("Apple macbook pro")
});