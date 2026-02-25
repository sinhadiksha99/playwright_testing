import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test("accessibilty testing-1", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");
    // 1. scanning and detect all types of WCAG violations
    const accessibilityScanResult = await new AxeBuilder({ page }).analyze();
    console.log(accessibilityScanResult)
    expect(accessibilityScanResult.violations.length).toBe(0)
});

test("accessibilty testing-tag specific violation", async ({ page }, testInfo) => {
    await page.goto("https://demo.nopcommerce.com/");
    // 1. scanning and detect tags of WCAG violations
    const accessibilityScanResult = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    await testInfo.attach('accessibility results', {
        body: JSON.stringify(accessibilityScanResult, null, 2),
        contentType:'application/json'
    });
    expect(accessibilityScanResult.violations.length).toBe(0)
});

test("accessibilty testing-rule specific violation", async ({ page }, testInfo) => {
    await page.goto("https://demo.nopcommerce.com/");
    // 1. scanning and detect tags of WCAG violations
    const accessibilityScanResult = await new AxeBuilder({ page }).withRules(['duplicate-id']).analyze();
    await testInfo.attach('accessibility results', {
        body: JSON.stringify(accessibilityScanResult, null, 2),
        contentType:'application/json'
    });
    expect(accessibilityScanResult.violations.length).toBe(0)
});


test("accessibilty testing-disable rule specific violation", async ({ page }, testInfo) => {
    await page.goto("https://demo.nopcommerce.com/");
    // 1. scanning and detect tags of WCAG violations
    const accessibilityScanResult = await new AxeBuilder({ page }).disableRules(['duplicate-id']).analyze();
    await testInfo.attach('accessibility results', {
        body: JSON.stringify(accessibilityScanResult, null, 2),
        contentType:'application/json'
    });
    expect(accessibilityScanResult.violations.length).toBe(0)
});