import { test, expect, Locator, Frame } from '@playwright/test';

test("iframes", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/")
    //total number of frames present on the page
    const frames: Frame[] = await page.frames();
    console.log(frames.length)

    // interact with elements present inside frame
    // Approach 1 - using page.frame()
    const frame1 = await page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_1.html' });
    // frame() - returns frame else retruns null
    if (frame1) {
        await frame1.locator("[name='mytext1']").fill("Heelo");
        await frame1.fill("[name='mytext1']", "john")
    }

    //Approach- 2 using frameLocator()
    const frame3 = page.frameLocator("[src='frame_3.html']");
    await frame3.locator("[name='mytext3']").fill("Frame3");

});

test("iframes inside iframe", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/")
    const frame3 = page.frameLocator("[src='frame_3.html']");
    await frame3.locator("[name='mytext3']").fill("Frame3");
    const frameInsideFrame = frame3.frameLocator("[src*='docs.google.com/forms/']")
    await frameInsideFrame.getByLabel("I am a human").click();
    await frameInsideFrame.locator("#i24").click();

});


test("inner/child frames demo", async ({ page }) => {
    await page.goto('https://ui.vision/demo/webtest/frames/');
    const frame3 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3.html' });
    if (frame3) {
        await frame3.locator("[name='mytext3']").fill("Welcome");
        const childFrames = frame3.childFrames();
        console.log("Child frames inside the Frame 3:", childFrames.length);
        const radio = childFrames[0].getByLabel("I am a human");
        await radio.click();
        await expect(radio).toBeChecked();
    }
    else {
        console.log("Frame 3 is not found..")
    }
    await page.waitForTimeout(5000);

})