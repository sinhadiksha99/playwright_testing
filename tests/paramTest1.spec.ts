import { expect, test } from '@playwright/test';

const searchItems: string[] = ["laptop", "Gift card", "smartphone", "monitor"];

//run for multiple time with different search elements
for (const search of searchItems) {
    test(`Param-11-${search}`, async ({ browser }) => {
        const context = await browser.newContext({
            ignoreHTTPSErrors: true
        });
        const page = await context.newPage();
        await page.goto("https://demowebshop.tricentis.com/");
        await page.waitForLoadState();
        await page.locator("#small-searchterms").fill(search);
        await page.locator(".button-1.search-box-button").click();
        await expect.soft(page.locator(`h2 a`).nth(0)).toContainText(search, { ignoreCase: true });
    })
}

//using forEach function
searchItems.forEach((search) => {
    test(`Param-12-${search}`, async ({ browser }) => {
        const context = await browser.newContext({
            ignoreHTTPSErrors: true
        });
        const page = await context.newPage();
        await page.goto("https://demowebshop.tricentis.com/");
        await page.waitForLoadState();
        await page.locator("#small-searchterms").fill(search);
        await page.locator(".button-1.search-box-button").click();
        await expect.soft(page.locator(`h2 a`).nth(0)).toContainText(search, { ignoreCase: true });
    })
})

test.describe("searching items", async () => {
    searchItems.forEach((search) => {
        test(`Param-13-${search}`, async ({ browser }) => {
            const context = await browser.newContext({
                ignoreHTTPSErrors: true
            });
            const page = await context.newPage();
            await page.goto("https://demowebshop.tricentis.com/");
            await page.waitForLoadState();
            await page.locator("#small-searchterms").fill(search);
            await page.locator(".button-1.search-box-button").click();
            await expect.soft(page.locator(`h2 a`).nth(0)).toContainText(search, { ignoreCase: true });
        })
    })
})