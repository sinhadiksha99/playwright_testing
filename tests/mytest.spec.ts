import { test, expect } from '@playwright/test';

//fixture : page
test("test:Verify page title", async ({ page }) => {
    await page.goto("http://www.google.com");
    console.log("Title:", await page.title());
    await expect(page).toHaveTitle("Google");
});