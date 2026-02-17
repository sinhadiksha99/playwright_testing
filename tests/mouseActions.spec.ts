import { test, expect, Locator } from "@playwright/test";

test("Mouse hover", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.getByRole("button", { name: 'Point Me' }).hover();
    const mobile: Locator = page.locator('#shadow_content').getByText('Mobiles');
    await expect(mobile).toBeVisible();
});

test("Right-click", async ({ page }) => {
    await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
    const rightClickContextMenu = page.locator(".context-menu-one:has-text('right click me')");
    await rightClickContextMenu.click({ button: "right" });
    const numberOfOptions = await page.locator(".context-menu-item").count();
    console.log(numberOfOptions);
});

test("Double-click", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.getByText("Copy Text").dblclick();
    await expect(page.locator("#field2")).toHaveValue("Hello World!");
});

test("Drag-and-Drop", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const dragFrom = page.locator("#draggable");
    const dragTo = page.locator("#droppable");
    //Approach - 1 mouse hover -> mouse down -> mouse hover-> mouse down
    // await dragFrom.hover();
    // await page.mouse.down();
    // await dragTo.hover();
    // await page.mouse.up();
    // await expect(page.locator(".ui-state-highlight")).toBeVisible();
    // await expect(page.getByText("Dropped!")).toBeVisible();

    //Approach - 2
    await dragFrom.dragTo(dragTo);
    await expect(page.locator(".ui-state-highlight")).toBeVisible();
    await expect(page.getByText("Dropped!")).toBeVisible();
});