import {test,expect, Locator} from '@playwright/test';
import fs from "fs";

test("download", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    await page.getByLabel("Enter Text:").fill("Hello, I am Dikku");
    await page.locator("#generateTxt").click();
    const [download] = await Promise.all([page.waitForEvent('download'),page.locator("#txtDownloadLink").click()]);
    const downloadPath = 'downloads/f1.txt'
    await download.saveAs(downloadPath);
    // check if file exists
   expect(fs.existsSync(downloadPath)).toBeTruthy();

   // cleanup downloaded files
   if(fs.existsSync(downloadPath)){
    fs.unlinkSync(downloadPath)
   }

    await page.locator("#generatePdf").click();
    const [downloadPdf] = await Promise.all([page.waitForEvent('download'),page.locator("#pdfDownloadLink").click()]);
    const downloadPdfPath = 'downloads/f1.pdf'
    await downloadPdf.saveAs(downloadPdfPath);
    // check if file exists
   expect(fs.existsSync(downloadPdfPath)).toBeTruthy();

   if(fs.existsSync(downloadPdfPath)){
    fs.unlinkSync(downloadPdfPath)
   }
   
});