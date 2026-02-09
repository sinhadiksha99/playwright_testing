import { test, expect } from '@playwright/test';

test("xpath locators", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator("xpath=/html/body/div[4]/div[1]/div[1]/div[1]/a/img")).toBeVisible();
    const products =  page.locator("//a[contains(@href,'computer')]");
    console.log(await products.count())
    let prodTexrt:string[] = await products.allTextContents();
    for(let pt of prodTexrt){
        console.log(pt);
    }
})