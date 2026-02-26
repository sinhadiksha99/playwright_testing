/* 
create booking 
request type :post
request body : static (hard code in the test)
*/
import { test, expect } from '@playwright/test';
import fs from 'fs';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

test("create booking using post request with static body ", async ({ request }) => {
    const requestBody = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 1000,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast bowls"
    };

    //send post request
    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    const status = response.status();
    await expect(status).toBe(200)
    await expect(response.ok()).toBeTruthy();
    console.log(responseBody.booking.totalprice)
    await expect(responseBody).toHaveProperty("booking.totalprice")
    console.log(responseBody.booking)
    const booking = responseBody.booking;
    await expect(booking).toMatchObject({
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 1000,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Breakfast bowls',
    })
    await expect(booking.bookingdates).toMatchObject({ checkin: '2018-01-01', checkout: '2019-01-01' })
})

/* 
create booking 
request type :post
request body : JSON file
*/
test("create booking using post request with json file", async ({ request }) => {
    const requestBody = JSON.parse(fs.readFileSync("testData/getRequestBody.json", 'utf-8'));
    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    const status = response.status();
    await expect(status).toBe(200)
    await expect(response.ok()).toBeTruthy();
    console.log(responseBody.booking.totalprice)
    await expect(responseBody).toHaveProperty("booking.totalprice")
    console.log(responseBody.booking)
    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: 1000,
        depositpaid: true,
        bookingdates: { checkin: requestBody.booking.checkin, checkout: '2019-01-01' },
        additionalneeds: 'Breakfast bowls',
    })
    await expect(booking.bookingdates).toMatchObject({ checkin: '2018-01-01', checkout: '2019-01-01' })
})

/* 
create booking 
request type :post
request body :random/dynamic data(faker library): npm install @faker-js/faker
install luxon for working with date and times : npm install luxon
*/
test("create booking using post request using faker library", async ({ request }) => {
    const firstname = faker.person.firstName();
    const lastnamename = faker.person.lastName();
    const totalprice = faker.number.int({ min: 100, max: 10000 });
    const depositpaid = faker.datatype.boolean();
    const checkin = DateTime.now().toFormat("yyyy-MM-dd");
    const checkout = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");
    const additionalneeds = "super bowls"

    const requestBody = {
        "firstname": firstname,
        "lastname": lastnamename,
        "totalprice": totalprice,
        "depositpaid": depositpaid,
        "bookingdates": {
            "checkin": checkin,
            "checkout": checkout
        },
        "additionalneeds": additionalneeds
    };
    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    const status = response.status();
    await expect(status).toBe(200)
    await expect(response.ok()).toBeTruthy();
    console.log(responseBody.booking.totalprice)
    await expect(responseBody).toHaveProperty("booking.totalprice")
    console.log(responseBody.booking)
    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        bookingdates: { checkin: requestBody.bookingdates.checkin, checkout: requestBody.bookingdates.checkout },
        additionalneeds: requestBody.additionalneeds,
    })
})