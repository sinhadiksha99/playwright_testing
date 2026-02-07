import { test, expect } from '@playwright/test';

//fixture : page
test("test:Verify page title", async ({ page }) => {
    await page.goto("http://www.google.com");
    const url = await page.url();
    await expect(page).toHaveURL(url)
});