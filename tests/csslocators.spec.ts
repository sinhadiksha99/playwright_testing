import { test,expect } from '@playwright/test';

test("css locators",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator("[id=small-searchterms]").fill("T-shirts");
    await page.locator("[type=submit]").click();
    const result = await page.locator(".result").textContent();
    console.log(result);
})