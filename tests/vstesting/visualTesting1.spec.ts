import { expect, test } from '@playwright/test';

test("visual testing-1", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");
    expect(await page.screenshot()).toMatchSnapshot("homepage.png",{maxDiffPixels: 100});
});


test("visual testing-2", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");
    await expect(page).toHaveScreenshot()
});

test("visual testing-logo", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");
    const logo = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();
    await expect(logo).toHaveScreenshot();
    expect(await logo.screenshot()).toMatchSnapshot("logo.png",{maxDiffPixels: 100});

});