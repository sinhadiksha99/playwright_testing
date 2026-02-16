import { test, expect, Locator, Page, BrowserContext, webkit, Browser } from '@playwright/test';

test("browser context demo", async ({ context }) => {
    const page: Page = await context.newPage();

});

test("browser demo", async ({ browser }) => {
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
});

test("my browser use not config browser use demo", async ({ }) => {
    const browser: Browser = await webkit.launch();
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto("https://www.flipkart.com/");
});

test("multiple pages demo", async ({ context}) => {
    const page1: Page = await context.newPage();
    const page2: Page = await context.newPage();
    await page1.goto("https://www.flipkart.com/");
    await page2.goto("https://www.myntra.com/");
    // console.log("number of pages created", context.pages().length)
    console.log(await page1.title())
    console.log(await page2.title())
});