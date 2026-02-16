import { test, expect, Locator, Page, BrowserContext, webkit, Browser } from '@playwright/test';

test("popup demo", async ({ context }) => {
    const page1: Page = await context.newPage();
    await page1.goto("https://testautomationpractice.blogspot.com/");
    await Promise.all([page1.waitForEvent('popup'), page1.locator("#PopUp").click()]);
    // do not use await for popup click()
    console.log(context.pages().length)
    const pages = context.pages();
    console.log(pages[1].url())
});

test("authenticated popup demo1", async ({ context }) => {
    const page1: Page = await context.newPage();
    // approach1: https://username:password@the-internet.herokuapp.com/basic_auth use this url , do not use
    // https://the-internet.herokuapp.com/basic_auth
    await page1.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    await page1.waitForLoadState();
    const text = await page1.locator("p").innerText();
    await expect(text).toBe("Congratulations! You must have the proper credentials.")
});

test("authenticated popup demo2", async ({ browser }) => {
    const context = await browser.newContext({
        httpCredentials:{
            username:"admin",
            password:"admin"
        }
    });
    const page1: Page = await context.newPage();
    await page1.goto("https://the-internet.herokuapp.com/basic_auth");
    const text = await page1.locator("p").innerText();
    await expect(text).toBe("Congratulations! You must have the proper credentials.")
});