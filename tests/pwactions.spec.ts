import { test, expect, Locator } from '@playwright/test';

test("pw actions", async ({ page }) => {
    //textbox
    await page.goto("https://testautomationpractice.blogspot.com/");
    const firstName: Locator = await page.locator("[id=name]");    
    await expect(firstName).toBeVisible();
    await expect(firstName).toBeEnabled();
    const value = await firstName.getAttribute("maxlength")
    expect(value).toBe("15"); // value comparison do not need await
    await firstName.fill("John Kennedy");
    const inputFirstName = await firstName.inputValue();
    expect(inputFirstName).toBe("John Kennedy");

    //radio buttons
    const male: Locator = page.locator("#male");
    await expect(male).toBeVisible();
    await expect(male).not.toBeChecked(); //can also use male.isChecked();
    await male.check();
    await expect(male).toBeChecked();
    await male.click();
    await expect(male).toBeChecked();
    // await male.uncheck(); - this will give error like :Cannot uncheck radio button. Radio buttons can only be unchecked by selecting another radio button in the same group.
    // await expect(male).not.toBeChecked(); 

    //checkboxes
    const sunday: Locator = page.getByLabel('Sunday'); // SUnday here is innerText
    // await sunday.check();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const daysLocators: Locator[] = days.map((index)=>page.getByLabel(index));
    expect(daysLocators.length).toBe(7);
    for(const checkbox of daysLocators){ //here all selected now unselect last 3 in slice
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    // const lastThreeday:Locator[] = daysLocators.slice(4,8);
    // for(const checkbox of lastThreeday){
    //     await checkbox.check();
    //     await expect(checkbox).toBeChecked();
    // }

    // uncheck last 3 checkboxes and assert
    for(const checkbox of daysLocators.slice(-3)){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }


    // if checked uncheck it if unchecked check it
    for(const checkbox of daysLocators){ 
        if(await checkbox.isChecked()){
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }
        else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    //randomly select checkbox by index (1,3,6) and assert it
    const indexes= [1,3,6]
    for(const index of indexes){
        await daysLocators[index].check();
        await expect(daysLocators[index]).toBeChecked();
    }

    // select the checbox based on label
    const label ="Friday";
    for(const l of days){
        if(label===l){
            await page.getByLabel(label).check();
            await expect(page.getByLabel(label)).toBeChecked();
        }
    }

});