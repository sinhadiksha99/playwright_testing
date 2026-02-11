import {test,expect, Locator} from '@playwright/test';

test("single select dropdown", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countryDropdown = await page.locator("#country");

     // to check if dropdown is single select
    await expect(countryDropdown).not.toHaveAttribute('multiple');

    // 1. select option from dropdown by visible text
    await countryDropdown.selectOption("Australia");

    //2. select option from dropdown using value attribute of option
    await countryDropdown.selectOption('uk');

    //3. select option from dropdown using label(inner text)
    await countryDropdown.selectOption({label:'Brazil'});
    await expect(countryDropdown).toHaveValue('brazil');

    //4. select option from dropdown by using index
    await countryDropdown.selectOption({index:4});

    //check number of options in dropdown
    const dropdownOptions: Locator = countryDropdown.locator("option");
    const countOfOption = await dropdownOptions.count() //or #country>option
    await expect(countOfOption).toBe(10);

    //check option is present in dropdown
    const optionTexts:string[] = await dropdownOptions.allTextContents();
    const correctOptionTexts:string[]= optionTexts.map(i=>i.trim());
    expect(correctOptionTexts).toContain("Australia");
});