//AJV is used for json schema validation
import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test("Schema validation-1", async ({ request }) => {
    const response = await request.get(`https://mocktarget.apigee.net/json`);
    const schema = {
        type: "object",
        properties: {
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            city: {
                type: "string"
            },
            state: {
                type: "string"
            }
        },
        required: [
            "firstName",
            "lastName",
            "city",
            "state"
        ]
    }
    const responseBody = await response.json();
    const ajv = new Ajv();   // Initialize Ajv
    const validate = ajv.compile(schema); //returns a validator function
    const isValid = validate(responseBody);
    await expect(isValid).toBeTruthy();
});

test('Schema validation-2', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const responsebody = await response.json();
    const schema = {
        type: 'object',
        properties: {
            userId: { type: 'integer' },
            id: { type: 'integer' },
            title: { type: 'string' },
            body: { type: 'string' },
        },
        required: ['userId', 'id', 'title', 'body'],
        additionalProperties: false,
    };

    const ajv = new Ajv(); 
    const validate = ajv.compile(schema);
    const isValid = validate(responsebody);
    expect(isValid).toBeTruthy();
});