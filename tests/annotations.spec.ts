import { test } from '@playwright/test';

test("test-11", async () => {
    console.log("test-11");
});

test.fixme("test-31", async () => {
    console.log("test-31");
});

test.skip("test-21", async () => {
    console.log("test-21");
});

test("test-41", async ({browserName}) => {
    test.skip(browserName==='chromium',"skipped it coz not want to run it on chromium")
    console.log("test-41");
});
