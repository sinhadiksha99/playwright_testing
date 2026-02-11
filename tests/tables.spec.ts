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