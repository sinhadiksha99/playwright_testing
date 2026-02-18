import { test } from '@playwright/test';

// Grouping Test 1 and Test 3
test.describe('Feature Group A', async() => {
    test("test-1", async () => {
        console.log("test-1");
    });

    test("test-3", async () => {
        console.log("test-3");
    });
});

// Grouping Test 2 and Test 4
test.describe('Feature Group B', () => {
    test("test-2", async () => {
        console.log("test-2");
    });

    test("test-4", async () => {
        console.log("test-4");
    });
});