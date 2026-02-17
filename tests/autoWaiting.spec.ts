import { test, expect, Locator } from '@playwright/test';

test("Auto-Scroll-test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    await expect(page.locator("text=Welcome to our store")).toBeVisible();

    //actionability checks wrks 
    await page.locator("#small-searchterms").fill("Laptop");
    await page.locator(".button-1.search-box-button").click();

    // but dont want to do actionability checks
    await page.locator("#small-searchterms").fill("Laptop",{force:true});
});