const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi There");
});

app.get("/add", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    // Check if num1 and num2 are numbers
    if (!isNaN(num1) && !isNaN(num2)) {
        const sum = num1 + num2;
        res.send(`The sum is ${sum}`);
    } else {
        res.send("Please provide two numbers as query parameters (num1 and num2).");
    }
});

app.get("/divide", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    // Check if num1 and num2 are numbers and num2 is not zero
    if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
        const result = num1 / num2;
        res.send(`The result is ${result}`);
    } else if (num2 === 0) {
        res.send("Division by zero is not allowed.");
    } else {
        res.send("Please provide two numbers as query parameters (num1 and num2).");
    }
});

app.listen("3001", () => {
});
