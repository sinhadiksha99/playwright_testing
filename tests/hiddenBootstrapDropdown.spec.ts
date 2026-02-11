import {test,expect, Locator} from '@playwright/test';

test("Bootstrap hidden dropdown", async({page})=>{
    await test.setTimeout(700000)
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button[type='submit']").click();
    await page.getByText("PIM").click();
    await page.waitForTimeout(3000);
    await page.locator("form i").nth(2).click();
    await page.waitForTimeout(3000);
    const countOfAvailableOptions = await page.locator("div[role='listbox'] span").count();
    for(let i =0; i<countOfAvailableOptions;i++){
        if(await page.locator("div[role='listbox'] span").textContent()==='Automation Tester'){
            await page.locator("div[role='listbox'] span").click();
            break;
        }
    }
});