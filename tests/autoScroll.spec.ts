import { test, expect, Locator } from '@playwright/test';

test("Auto-Scroll-test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page.locator("a[href='/wishlist']").last()).toBeVisible();
});

test("Scrolling inside dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("#comboBox").click();
    const lastInDropDown = page.locator("#dropdown div:nth-child(100)");
    await lastInDropDown.click();
    await expect(lastInDropDown).toHaveText("Item 100")
});

test("Scrolling inside table", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/scroll_xy.html");
    const tenthRowLastColumn = page.locator("table tbody tr:nth-child(10) td:nth-child(9)");
    console.log(await tenthRowLastColumn.innerText())

});
