import { test, expect } from '@playwright/test';

test("get booking details using id-path param", async ({ request }) => {
    const bookingId = "619";
    const response = await request.get(`/booking/${bookingId}`);
    const responseBody = await response.json();
    console.log(responseBody)
    await expect(response.status()).toBe(200)
    await expect(response.ok()).toBeTruthy();
});

test("get booking details using name-query param", async ({ request }) => {
    const firstName = "Jim";
    const lastName = "Brown"
    const response = await request.get(`/booking`, {
        params: {
            firstname: firstName,
            lastname: lastName,
        }
    });
    const responseBody = await response.json();
    await expect(response.status()).toBe(200)
    await expect(response.ok()).toBeTruthy();
});

test("get booking details using name-query param-2", async ({ request }) => {
    const firstname = "Jim";
    const lastname = "Brown"
    const response = await request.get(`/booking`, {
        params: {
          firstname,lastname,
        }
    });
    const responseBody = await response.json();
    await expect(response.status()).toBe(200)
    await expect(response.ok()).toBeTruthy();
    await expect(responseBody.length).not.toBe(0)
    console.log(responseBody.length)
    for(const resb of responseBody){""
        expect(resb).toHaveProperty("bookingid");
        expect(typeof resb.bookingid).toBe("number")
        // console.log(resb.bookingid)
    }
});