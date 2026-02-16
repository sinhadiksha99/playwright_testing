import { test, expect, Locator, Page, BrowserContext, webkit, Browser } from '@playwright/test';

test("tabs demo", async ({ context}) => {
    const page1: Page = await context.newPage();
    await page1.goto("https://testautomationpractice.blogspot.com/");
    // const [page2] = await Promise.all([context.waitForEvent('page'), page1.locator("button:has-text('New Tab')").click()]);
    // here try understanding promise.all() return array of result [event->page,click->null]
    // so [page2] means = result[0] i.e page
    // suppose i f i chnage the order of array then we will get const[,page2] = await Promise.all([ page1.locator("button:has-text('New Tab')").click(),context.waitForEvent('page')]);

    const page2Promise = context.waitForEvent('page');
    await page1.locator("button:has-text('New Tab')").click()
    const page2 = await page2Promise
    console.log(await page2.title());
    console.log(context.pages().length)
});