import { test, expect } from '@playwright/test';
import fs from 'fs';

test("delete booking details", async ({ request }) => {
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
    const deleteResponse = await request.delete(`/booking/${id}`, {
        headers: {
            'Cookie': `token=${token}`
        }
    });
    expect(deleteResponse.ok()).toBeTruthy();
});