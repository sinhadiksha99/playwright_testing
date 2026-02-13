import {test,expect, Locator} from '@playwright/test';

test("static table", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table: Locator = page.locator("[name=BookTable] tbody");
    await expect(table).toBeVisible();

    //no. of rows 
    const rows:Locator[] = await table.locator("tr").all(); // or "[name=BookTable] tbody tr"
    await expect(rows.length).toBe(7);

    //no. of columns/headers
    const columns:Locator[] = await table.locator("th").all();
    await expect(columns.length).toBe(4);

    // read all data from 2nd row(index 2 and 3rd row including header)
    const header:Locator[] = await table.locator("tr").nth(0).locator("th").all();
    const row3:Locator[] = await table.locator("tr").nth(2).locator("td").all();
    const allRows:Locator[] = await table.locator("tr").all();

    for(let r in row3){
        console.log(await header[r].innerText(),":",await row3[r].innerText())
    }

     for(let r of allRows){
        // console.log(await r.locator("td").allInnerTexts())
        const cols = (await r.locator("td").allInnerTexts()).join("\t")
        console.log(cols) 
    }

    // print book name where author is Mukesh
    const row = await table.locator("tr td").filter({ hasText: "Mukesh"}).first().locator("//../td[1]")

    // calculate total price of books
    const bookPrice:string[] = await table.locator("tr").locator("//td[4]").allInnerTexts();
    let totalSum = 0;
    for(let bP of bookPrice){
        totalSum+= parseInt(bP);
    }
    await expect(totalSum).toBe(7100);

});

test("dynamic table", async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    const table: Locator = page.locator(".table tbody");
    const expectedCPu = (await page.locator("#chrome-cpu").innerText()).split(" ")[2];
    await expect(table).toBeVisible();
    // for chrome process get cpu load
    // read each row and check if chrome is present or not
    const rows: Locator[] = await table.locator("tr").all();
    for(const r of rows){
        const procesName = await r.locator("td").nth(0).innerText();
        if(procesName === "Chrome"){
            const cpuValue = await r.locator("td").filter({hasText:"%"}).innerText();
           await expect(expectedCPu).toContain(cpuValue);
            break;
        }
    }
    
});

test("dynamic table - minimal", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    // 1. Extract only the Number + % from the summary (ignores "QA", spaces, etc.)
    const summaryText = await page.locator("#chrome-cpu").innerText();
    const expectedValue = summaryText.match(/[\d.]+/)?.[0] + "%";

    // 2. Locate the CPU cell specifically for the "Chrome" row
    // const chromeCPU = page.locator("table tbody tr")
    //     .filter({ has: page.locator("td").first(), hasText: "Chrome" })
    //     .locator("td", { hasText: "%" });

    const chromeCPU = page.locator("table tbody tr")
        .filter({ hasText: "Chrome" })        // Find the row containing "Chrome"
        .locator("td", { hasText: "%" });

    // 3. Web-First Assertion: Automatically waits and retries
    await expect(chromeCPU).toHaveText(expectedValue);
});