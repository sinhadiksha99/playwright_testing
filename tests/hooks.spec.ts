import { test } from '@playwright/test';

test.beforeAll(async()=>{
    console.log("beforeAll");
});

test.afterAll(async()=>{
    console.log("afterAll");
});

test("test-1",{tag:'@sanity'}, async () => {
    console.log("test-1");
});

test("test-3",{tag:'@smoke'}, async () => {
    console.log("test-3");
});


test("test-2", async () => {
    console.log("test-2");
});

test("test-4",{tag:['@sanity','@regression']}, async () => {
    console.log("test-4");
});

// for running that is tagged under both sanity and regression
//npx playwright test --grep "(?=.*@sanity)(?=.*@regression)"

//for running which is either sanity or regression
//npx playwright test --grep "@sanity|@regression"

//for running sanity but not regression
//npx playwright test --grep "@sanity" --grep-invert "@regression"