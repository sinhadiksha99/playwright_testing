import { test, expect, Locator } from '@playwright/test';

test("datePicker -jquery", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const datePicker = page.locator("#datepicker");
    await expect(datePicker).toBeVisible();
    // await datePicker.fill("06/20/2026");
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    await datePicker.click();
    const year = '2024';
    const month = 'May';
    const date = '16'
    const monthPicker = page.locator(".ui-datepicker-month")
    const yearPicker = page.locator(".ui-datepicker-year");
    let currYear = await yearPicker.innerText();
    while (year != currYear) {
        if (year > currYear) {
            await page.getByText("Next").click();
            await page.waitForTimeout(1000);
            currYear = await yearPicker.innerText();
        }
        else {
            await page.getByText("Prev").click();
            await page.waitForTimeout(1000);
            currYear = await yearPicker.innerText();
        }
    }

    let currMonth = (await monthPicker.innerText()).trim();
    while (months.indexOf(month) !== months.indexOf(currMonth)) {
        if (months.indexOf(month) > months.indexOf(currMonth)) {
            await page.getByText("Next").click();
        } else {
            await page.getByText("Prev").click();
        }
        await page.waitForTimeout(1000);
        currMonth = (await monthPicker.innerText()).trim();
    }
    await page.locator(`[data-date="${date}"]`).click();
    console.log(await page.locator("#datepicker").inputValue())
});

test("datePicker - bootstrap", async ({ page }) => {
    await page.goto("https://www.booking.com/");
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    await page.getByRole('button', { name: 'Dismiss sign-in info.' }).click();
    await page.locator("[data-testid='searchbox-dates-container']").click();
    const checkInYear = "2026"
    const checkInMonth = "December"
    const checkInDate = "28";

    const checkOutYear = "2027"
    const checkOutMonth = "January"
    const checkOutDate = "2";

    const currDate = page.locator("(//*[@aria-live='polite'])[1]")
    let currYear = (await currDate.innerText()).split(" ")[1];

    while (checkInYear != currYear) {
        if (checkInYear > currYear) {
            await page.locator("[aria-label='Next month']").click();
            await page.waitForTimeout(1000);
        }
        currYear = (await currDate.innerText()).split(" ")[1];
    }
    let currMonth = (await currDate.innerText()).split(" ")[0];

    while (months.indexOf(checkInMonth) != months.indexOf(currMonth)) {
        if (months.indexOf(checkInMonth) > months.indexOf(currMonth)) {
            await page.locator("[aria-label='Next month']").click();
            await page.waitForTimeout(1000);
        }
        currMonth = (await currDate.innerText()).split(" ")[0];
    }
    await page.locator('span').filter({ hasText: `${checkInDate}` }).first().click();
    await page.waitForTimeout(1000);
    console.log("checked in date done");

    const currCheckoutDate = page.locator("(//*[@aria-live='polite'])[2]")
    let currCheckoutYear = (await currCheckoutDate.innerText()).split(" ")[1];
    while (checkOutYear != currCheckoutYear) {
        if (checkInYear > currCheckoutYear) {
            await page.locator("[aria-label='Next month']").click();
            await page.waitForTimeout(1000);
        }
        currCheckoutYear = (await currCheckoutDate.innerText()).split(" ")[1];
    }

    let currCheckoutMonth = (await currCheckoutDate.innerText()).split(" ")[0];
    while (months.indexOf(checkOutMonth) != months.indexOf(currCheckoutMonth)) {
        if (months.indexOf(checkOutMonth) > months.indexOf(currCheckoutMonth)) {
            await page.locator("[aria-label='Next month']").click();
            await page.waitForTimeout(1000);
        }
        currCheckoutMonth = (await currCheckoutDate.innerText()).split(" ")[0];
    }
    await page.getByText('2', { exact: true }).last().click();
    console.log("checkout date done")
});