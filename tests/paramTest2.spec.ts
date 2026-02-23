import { expect, test } from '@playwright/test';

const loginData: string[][] = [
    ["laura.taylor1234@example.com", "test@123", "invalid"],
    ["invaliduser@example.com", "test321", "invalid"],
    ["validuser@example.com", "testxyz", "invalid"],
    ["", "", "invalid"]
]

test.describe("Data driven Test", async () => {
    for (const data of loginData) {
        test(`Login Test for ${data[0]}`, async ({ browser }) => {
            const context = await browser.newContext({
                ignoreHTTPSErrors: true
            });
            const page = await context.newPage();
            await page.goto("https://demowebshop.tricentis.com/login");
            await page.locator("#Email").fill(data[0]);
            await page.locator("#Password").fill(data[1]);
            await page.locator('input.login-button').click();
            if (data[2].toLowerCase() === 'valid') {
                const logout = page.locator("a[href='/logout']");
                await expect(logout).toBeVisible();
            }
            else {
                const errorMsg = page.locator(".validation-summary-errors");
                await expect(errorMsg).toBeVisible();
                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login")
            }

        })
    }
});
