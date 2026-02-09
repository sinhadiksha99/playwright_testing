import { test, expect } from '@playwright/test';

test("xpath axes", async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");
    const selfGermany = page.locator("//*[text()='Germany']/self::td");
    await expect(selfGermany).toHaveText("Germany");
    const parentRow = page.locator("//*[text()='Germany']/parent::tr");
    await expect(parentRow).toContainText("Maria Anders")
    const child = page.locator("//table[@id='customers']//tr[2]//child::td")
    await expect(child).toHaveCount(3);
    const ancestors = page.locator("//*[text()='Germany']/ancestor::table");
    await expect(ancestors).toHaveAttribute("id","customers");
    const descendants = page.locator("//table[@id='customers']//descendant::td");
    await expect(descendants).toHaveCount(18);
});