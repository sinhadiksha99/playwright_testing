import { test, expect, Locator } from '@playwright/test';

test("Soft Assertion", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect.soft(page).toHaveTitle("Welcome")
    await page.locator("#small-searchterms").fill("Laptop");
    await page.locator(".button-1.search-box-button").click();
    console.log("clicked")
    await expect.soft(page.locator(`[alt="Tricentis Demo Web Shop"]`)).toBeVisible();
});

