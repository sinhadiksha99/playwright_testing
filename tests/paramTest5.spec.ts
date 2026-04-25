import { expect, test } from '@playwright/test';
import * as XLSX from 'xlsx';

//reading file--> workbook --> sheets --> rows --> columns
const path = "testData/excel.xlsx";
const workbook = XLSX.readFile(path);
const sheetNames = workbook.SheetNames[0];
const workSheet = workbook.Sheets[sheetNames];
 // convert sheet to json
const loginData:any = XLSX.utils.sheet_to_json(workSheet);

test.describe("Data driven Test", async () => {
    for (const {email, password, validity} of loginData) {
        test(`Login Test for ${email}`, async ({ browser }) => {
            const context = await browser.newContext({
                ignoreHTTPSErrors: true
            });
            const page = await context.newPage();
            await page.goto("https://demowebshop.tricentis.com/login");
            await page.locator("#Email").fill(email);
            await page.locator("#Password").fill(password);
            await page.locator('input.login-button').click();
            if (validity.toLowerCase() === 'valid') {
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
