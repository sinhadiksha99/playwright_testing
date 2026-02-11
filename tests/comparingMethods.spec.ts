import { test, expect, Locator } from '@playwright/test';

test("comparing methods", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    const products: Locator = page.locator(".product-title");
    //Locator is an interface
    console.log(await products.nth(1).innerText())
    console.log(await products.nth(1).textContent())
    //o/p - 
    // 14.1-inch Laptop - innertext output

    //         14.1-inch Laptop - textContent()

    const productList:Locator[] = await products.all();
    
});