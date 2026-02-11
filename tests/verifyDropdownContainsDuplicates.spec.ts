import {test,expect, Locator} from '@playwright/test';

test("Verify dropdown contains duplicates", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const animalsDropdown = await page.locator("#colors");
    const dropdownOptions: Locator = animalsDropdown.locator("option");
    const optionTexts:string[] = (await dropdownOptions.allTextContents()).map(i=>i.trim());
    const unique = new Set<string>();
    optionTexts.forEach(text => unique.add(text));
    await expect(unique.size).toBeLessThan(optionTexts.length)
});