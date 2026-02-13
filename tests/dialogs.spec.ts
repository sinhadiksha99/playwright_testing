import { test, expect, Locator } from '@playwright/test';

test("simple alert - alert with ok", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog',dialog=>{
        console.log(dialog.type())
        expect(dialog.type()).toBe("alert")
        console.log(dialog.message())
        expect(dialog.message()).toContain("alert");
        dialog.accept();
    });
    await page.locator("#alertBtn").click();// open dialog or alert
});

test("confirmation alert - alert with ok and dismiss", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog',dialog=>{
        console.log(dialog.type())
        console.log(dialog.message())
        expect(dialog.message()).toContain("Press a button!");
        dialog.dismiss();
    });
    await page.locator("#confirmBtn").click();
    await expect(await page.locator("#demo").innerText()).toContain("Cancel!")
});

test("prompt alert - alert with ok, dismiss and input box", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog',dialog=>{
        console.log(dialog.type())
        console.log(dialog.message())
        expect(dialog.message()).toContain("Please enter your name:");
        expect(dialog.defaultValue()).toContain("Harry Potter");
        dialog.accept("John");
    });
    await page.locator("#promptBtn").click();
    await expect(await page.locator("#demo").innerText()).toContain("Hello John! How are you today?")
});