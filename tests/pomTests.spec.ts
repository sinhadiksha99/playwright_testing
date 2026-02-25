import { CartPage } from "../pages/cartPage";
import { LoginPage } from "../pages/loginPage" ;
import { HomePage } from "../pages/homepage";
import { test, expect } from '@playwright/test';

test("User can login and product to cart", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/index.html");
    const loginPage = new LoginPage(page);
    await loginPage.performlogin("pavanol","test@123");

    const homepage = new HomePage(page);
    await homepage.addProductToCart("Samsung galaxy s6");
    await homepage.goToCart();
    await page.waitForTimeout(2000);

    const cartPage = new CartPage(page);
    const isProductPresent = await cartPage.checkProductInCart("Samsung galaxy s6");
    await expect(isProductPresent).toBeTruthy();
});
