import { chromium, expect, test } from '@playwright/test';

test("browser context settings-1", async () => {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext({
        viewport:{width:1000, height:1000 }, // in playwright.config also we can do this
        locale:'en-US',   // to chnage language of browser in english language
        // proxy:{ server:"http://proxyserver:port3245"}
        ignoreHTTPSErrors:true

    });
    const page = await context.newPage();
    // await page.goto("https://www.google.com");
    await page.goto("https://expired.badssl.com/");
    console.log(await page.title())
});

test("browser context settings-cookies", async () => {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await context.addCookies([
        {name:"mycookie", value:'123456', url:'https://testautomationpractice.blogspot.com/'}
    ]);
    await page.goto("https://testautomationpractice.blogspot.com/");
    console.log("Cookie details...");
    const allCookies = await context.cookies();
    const retrivedCookies = allCookies.find(c=>c.name ==='mycookie');
    expect(retrivedCookies?.value).toBe("123456");
    await context.clearCookies();
});