const request = require('supertest');
const express = require('express');
const app = express();

// Mock the division route
app.get("/divide", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
        const result = num1 / num2;
        res.send(`The result is ${result}`);
    } else if (num2 === 0) {
        res.send("Division by zero is not allowed.");
    } else {
        res.send("Please provide two numbers as query parameters (num1 and num2).");
    }
});

describe('GET /divide', () => {
    test('returns the division result of two numbers', async () => {
        const response = await request(app).get('/divide?num1=20&num2=4');
        expect(response.text).toBe('The result is 5');
    });

    test('returns an error message for division by zero', async () => {
        const response = await request(app).get('/divide?num1=10&num2=0');
        expect(response.text).toBe('Division by zero is not allowed.');
    });

    test('returns an error message when non-numeric values are provided', async () => {
        const response = await request(app).get('/divide?num1=a&num2=b');
        expect(response.text).toBe('Please provide two numbers as query parameters (num1 and num2).');
    });

    test('returns an error message when numbers are not provided', async () => {
        const response = await request(app).get('/divide');
        expect(response.text).toBe('Please provide two numbers as query parameters (num1 and num2).');
    });
});