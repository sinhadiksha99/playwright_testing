import { test, expect, Locator } from '@playwright/test';

test("Screenshot", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const timeStamp = Date.now();
    await page.screenshot({path:'screenshots/fullPage'+timeStamp+'.png', fullPage:true})
    const logo = page.locator("img[alt = 'Tricentis Demo Web Shop']");
    await logo.screenshot({path:'screenshots/logo'+timeStamp+'.png'});
    const products = page.locator('.product-grid');
    await products.screenshot({path:'screenshots/products'+timeStamp+'.png'});
});

test("Screenshot-1", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const timeStamp = Date.now();
    await page.screenshot({path:'screenshots/fullPage'+timeStamp+'.png', fullPage:true})
    const logo = page.locator("img[alt = 'Tricentis Demo Web Shop']");
    await logo.screenshot({path:'screenshots/logo'+timeStamp+'.png'});
    const products = page.locator('.product-grid');
    await products.screenshot({path:'screenshots/products'+timeStamp+'.png'});
});