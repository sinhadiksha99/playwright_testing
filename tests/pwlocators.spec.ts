import { test, expect, Locator } from '@playwright/test';

test("pw_locator_optimized", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");
    const logo = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();
    const welcomeText = page.getByText("Welcome to our store");
    await expect(welcomeText).toBeVisible();
    await page.getByRole("link", { name: "Register" }).click();
    const registerHeading = page.getByRole("heading", { name: "Register" });
    await expect(registerHeading).toBeVisible();
    await page.getByLabel("First name:").fill("John");
    await page.getByLabel("Last name:").fill("Kennedy");
    await page.getByLabel("Email:").fill("Kennedy@gmail.com");
    await page.getByPlaceholder("Search store").fill("Apple macbook pro")
});