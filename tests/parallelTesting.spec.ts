import { test } from '@playwright/test';

test.describe.configure({mode:'serial'})

test.describe('Group-11', async() => {
    test("test-111", async () => {
        console.log("test-111");
    });

    test("test-112", async () => {
        console.log("test-112");
    });


    test("test-113", async () => {
        console.log("test-113");
    });

    test("test-114", async () => {
        console.log("test-114");
    });

});