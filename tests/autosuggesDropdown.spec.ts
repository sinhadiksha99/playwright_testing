import {test,expect, Locator} from '@playwright/test';

test("Auto-suggest dropdown", async({page})=>{
    await page.goto("https://www.flipkart.com/");
    await page.locator("input[name=q]").first().fill("smart");
    const numberOfSuggestedOptions = page.locator("ul>li");
    await page.waitForSelector("ul>li",{state:'attached',timeout:10000})
    console.log(await numberOfSuggestedOptions.allTextContents());
    await page.locator("ul>li").nth(2).click();
});