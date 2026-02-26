import { test, expect } from '@playwright/test';
import fs from 'fs';

test("update booking details-patch", async ({ request }) => {
    const requestBody = JSON.parse(fs.readFileSync("testData/getRequestBody.json", 'utf-8'));
    const response = await request.post("/booking", { data: requestBody });
    const status = response.status();
    await expect(status).toBe(200);
    const responseBody = await response.json();
    const id = responseBody.bookingid;

    const requesBody2 = JSON.parse(fs.readFileSync("testData/token.json", "utf-8"));
    const response2 = await request.post("/auth", { data: requesBody2 });
    const responseBody2 = await response2.json();
    const token = responseBody2.token;

    //put request using token
    const patchRequestBody = JSON.parse(fs.readFileSync("testData/patchRequestBody.json", 'utf-8'));
    const patchResponse = await request.patch(`/booking/${id}`, {
        data: patchRequestBody,
        headers: {
            'Cookie': `token=${token}`
        }
    });
    const patchResponseBody = await patchResponse.json();
    expect(patchResponse.ok()).toBeTruthy();
    console.log(patchResponseBody)
    await expect(patchResponseBody).toMatchObject(patchRequestBody)
});