import { test, expect, Locator } from '@playwright/test';

test("shadow dom-1", async ({ page }) => {
    await page.goto("https://books-pwakit.appspot.com/");
    await page.locator("#input").fill("Playwright automation");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000)
    const books = await page.locator("h2.title").all();
    await expect(books.length).toBe(20);
});

test("shadow dom-2", async ({ page }) => {
    await page.goto("https://shop.polymer-project.org/");
    await page.locator(`[aria-label="Men's Outerwear Shop Now"]`).click();
    await page.waitForTimeout(3000);
    expect(await page.locator("li").count()).toBe(16);
});