import {test,expect, Locator} from '@playwright/test';

test("multi select dropdown", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const colorsDropDown = page.locator("#colors");

    // to check if dropdown is multiselect
    await expect(colorsDropDown).toHaveAttribute('multiple');

    //1. select options by visible text
    await colorsDropDown.selectOption(['Red','Blue','Green']);

    //2.select using value attribute
    await colorsDropDown.selectOption(['red','green','white']);
    await expect(colorsDropDown).toHaveValues(['red', 'white', 'green']);

    //3.select option using label 
    await colorsDropDown.selectOption([{label:'Red'},{label:'Green'},{label:'White'},{label:'Yellow'}]);

    //4.select option using index
    await colorsDropDown.selectOption([{index:0},{index:2},{index:4}]);

    //check number of options in dropdown
    const dropdownOptions: Locator = colorsDropDown.locator("option");
    const countOfOption = await dropdownOptions.count() //or #country>option
    await expect(countOfOption).toBe(7);

    //check option is present in dropdown
    const optionTexts:string[] = await dropdownOptions.allTextContents();
    const correctOptionTexts:string[]= optionTexts.map(i=>i.trim());
    expect(correctOptionTexts).toContain("Red");

});