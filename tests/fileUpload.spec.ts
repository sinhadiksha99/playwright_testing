import {test,expect, Locator} from '@playwright/test';

test("upload", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("#singleFileInput").setInputFiles("uploads/singleupload.png");
    await page.getByText("Upload Single File").click();
    await expect(page.locator("#singleFileStatus")).toBeVisible();
    await page.locator("#multipleFilesInput").setInputFiles(["uploads/singleupload.png","uploads/DIKSHA_SINHA_LATEST.pdf"]);
    await page.getByText("Upload Multiple Files").click();
     await expect(page.locator("#multipleFilesStatus")).toBeVisible();
});