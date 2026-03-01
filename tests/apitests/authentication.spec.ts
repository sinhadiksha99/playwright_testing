/*
    1. no auth(public api) 
    2. basic auth/preemptive auth (username and password required)
    3. bearer token
    4. API key authentication
*/

import { test, expect } from '@playwright/test';
import 'dotenv/config';

test("authentication - no auth", async ({ request }) => {
    const response = await request.get(`https://jsonplaceholder.typicode.com/posts/1`);
    const responseBody = await response.json();
    console.log(responseBody)
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test("authentication - basic auth", async ({ request }) => {
    const credentials = Buffer.from("user:pass").toString('base64');
    const response = await request.get(`https://httpbin.org/basic-auth/user/pass`, {
        headers: {
            Authorization: `Basic ` + Buffer.from("user:pass").toString('base64')
        }
    });
    const response1 = await request.get(`https://httpbin.org/basic-auth/user/pass`, {
        headers: {
            // Using a template literal is cleaner than +
            'Authorization': `Basic ${credentials}`
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response1.ok()).toBeTruthy();
    expect(response1.status()).toBe(200);
});

test("authentication - bearer token auth", async ({ request }) => {
    const bearerToken = process.env.GITHUB_TOKEN || "TOKEN_NOT_FOUND";
    
    const response = await request.get(`https://api.github.com/user/repos`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
        }
    });
    if (bearerToken !== "TOKEN_NOT_FOUND") {
        expect(response.status()).toBe(200);
    } else {
        console.warn("Skipping real assertion: No GITHUB_TOKEN provided in environment.");
    }
});

test("authentication - bearer token auth-2", async ({ request }) => {
    const bearerToken = process.env.GITHUB_TOKEN || "TOKEN_NOT_FOUND";
    
    const response = await request.get(`https://api.github.com/user`, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'User-Agent': 'Playwright-Automation-Test',
            'Accept': 'application/vnd.github+json'
        }
    });

    if (bearerToken !== "TOKEN_NOT_FOUND") {
        const responseBody = await response.json();
        console.log("GitHub User Data:", responseBody);
        
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        expect(responseBody).toHaveProperty('login');
    } else {
        console.warn("Test skipped: No GITHUB_TOKEN found in environment variables.");
    }
});

test("authentication - api key auth", async ({ request }) => {
    const response = await request.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            q: 'Delhi',
            appid: 'fe9c5cddb7e01d747b4611c3fc9eaf2c'
        }
    });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    await expect(responseBody.name).toBe("Delhi")
});


test("authentication - api key auth-2", async ({ request }) => {
    const response = await request.get('https://api.weatherapi.com/v1/current.json', {
        params: {
            q: 'India',
            key: '59f38ebe55d5436ca0552856250606'
        }
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
    expect(data.location.country).toBe("India")
});
