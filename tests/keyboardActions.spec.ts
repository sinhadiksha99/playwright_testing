import { test, expect, Locator } from '@playwright/test';

/*
insetText, up,down,type,press
 */
test("keyboard-actions", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    /*
        steps:
        1. focus input 
        2. provide text
        3. Meta A
        4. Meta C
        5. press tab -2 time
        6. Meta V
        7.press tab -2 time
        8. Meta V
    */
    await page.locator("#input1").focus();
    // use page.locator("#input1").click both do the same thing
    await page.keyboard.type("Welcome");
    await page.keyboard.down("Meta")
    await page.keyboard.press("A");
    await page.keyboard.up("Meta");

    await page.keyboard.press("Meta+C");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await page.keyboard.press("Meta+V");

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await page.keyboard.down("Meta")
    await page.keyboard.press("V");
    await page.keyboard.up("Meta");

    await expect(page.locator("#input2")).toHaveValue("Welcome");
    await expect(page.locator("#input3")).toHaveValue("Welcome");
});