import {test,expect, Locator} from '@playwright/test';

test("Verify dropdown is sorted", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const animalsDropdown = await page.locator("#colors");
    const dropdownOptions: Locator = animalsDropdown.locator("option");
    const optionTexts:string[] = await dropdownOptions.allTextContents();
    const correctOptionTexts:string[]= optionTexts.map(i=>i.trim());
    // const originalList = [...correctOptionTexts];
    // const sortedOption: string[] = correctOptionTexts.sort();
    // sort changes correctOptionTexts to sorted

    const sortWithoutimmutable = [...correctOptionTexts].sort();
    await expect(correctOptionTexts).toEqual(sortWithoutimmutable);   
});