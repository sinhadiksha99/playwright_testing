import { expect, test } from '@playwright/test';
import { parse } from 'csv-parse/sync'
import fs from 'fs';

//reading data from json
const path = "testData/testData.csv";
const loginData: any = fs.readFileSync(path, 'utf-8');
const records = parse(loginData,{ columns:true , skip_empty_lines:true});

test.describe("Data driven Test", async () => {
    for (const data of records) {
        test(`Login Test for ${data.email}`, async ({ browser }) => {
            const context = await browser.newContext({
                ignoreHTTPSErrors: true
            });
            const page = await context.newPage();
            await page.goto("https://demowebshop.tricentis.com/login");
            await page.locator("#Email").fill(data.email);
            await page.locator("#Password").fill(data.password);
            await page.locator('input.login-button').click();
            if (data.validity.toLowerCase() === 'valid') {
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
