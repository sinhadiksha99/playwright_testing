import { expect, test } from "@playwright/test";
import { title } from "node:process";

test("Infinte Scrolling on books", async ({ page }) => {
    await test.slow();
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");
    let prevHeight = 0;
    while (true) {
        await page.evaluate(() => {
            window.scrollTo(0,document.body.scrollHeight)
        });
        await page.waitForTimeout(4000);
        const currHeight = await page.evaluate(() => {
            return document.body.scrollHeight;
        });
        console.log(currHeight,prevHeight)
        if(currHeight === prevHeight){
            break;
        }
        else{
            prevHeight = currHeight;
        }
    }
    console.log("reached end of page")
});

test("Infinte Scrolling on books- book name", async ({ page }) => {
    await test.setTimeout(1000000);
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");
    let prevHeight = 0;
    let bookFound = false;
    while (true) {
        const titles = await page.locator("#productsDiv h3").allTextContents();
        if(titles.includes("Rishi Sunak: The Rise")){
            console.log("book found")
            bookFound = true;
            break;
        }
        await page.evaluate(() => {
            window.scrollTo(0,document.body.scrollHeight)
        });
        await page.waitForTimeout(10000);
        const currHeight = await page.evaluate(() => {
            return document.body.scrollHeight;
        });
        console.log(currHeight,prevHeight)
        if(currHeight === prevHeight){
            break;
        }
        else{
            prevHeight = currHeight;
        }
    }
    await expect(bookFound).toBeTruthy();
});