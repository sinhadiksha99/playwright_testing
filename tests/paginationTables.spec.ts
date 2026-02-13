import {test,expect, Locator} from '@playwright/test';

test("Read data from all the table pages", async({page})=>{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")
    let hasmorePages = true
    while(hasmorePages){
        const rows = await page.locator("#example tbody tr").all();
        for(const r of rows){
            console.log(await r.innerText());
        }
        if(await page.getByText('›').isEnabled()){
            await page.getByText('›').click();
        }else{
            hasmorePages = false;
        }
    }
});

test("Filter rows and verify number of rows", async({page})=>{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")
    const dropdown = page.locator("select.dt-input");
    await dropdown.selectOption("25");
    let numberOfRows = await page.locator("#example tbody tr").count();
    await expect(numberOfRows.toString()).toBe("25");
});

test("Search for specific data in a table", async({page})=>{
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html")
    const search = page.locator("#dt-search-0");
    await search.fill("paul byrd");
    const machingRow = await page.locator("#example tbody tr").innerText()
    console.log(machingRow);
    await expect(machingRow).toContain("Paul Byrd");
});