const request = require('supertest');
const express = require('express');
const app = express();

// Mock the route in the app
app.get("/add", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isNaN(num1) && !isNaN(num2)) {
        const sum = num1 + num2;
        res.send(`The sum is ${sum}`);
    } else {
        res.send("Please provide two numbers as query parameters (num1 and num2).");
    }
});

describe('GET /add', () => {
    test('returns the sum of two numbers', async () => {
        const response = await request(app).get('/add?num1=10&num2=5');
        expect(response.text).toBe('The sum is 15');
    });

    test('returns an error message when non-numeric values are provided', async () => {
        const response = await request(app).get('/add?num1=a&num2=b');
        expect(response.text).toBe('Please provide two numbers as query parameters (num1 and num2).');
    });

    test('returns an error message when numbers are not provided', async () => {
        const response = await request(app).get('/add');
        expect(response.text).toBe('Please provide two numbers as query parameters (num1 and num2).');
    });
});