const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows your React app (on port 5173/3000) to talk to this server
app.use(bodyParser.json());

// 1. Basic Health Check
app.get('/', (req, res) => {
    res.send("Backend Server is Running");
});

// 2. Submit Form Route
app.post('/api/questions', (req, res) => {
    const questions = req.body;

    if (!questions || !Array.isArray(questions)) {
        return res.status(400).json({ error: "Invalid data format. Expected an array." });
    }

    console.log("Received Nested Questions from Frontend:");
    console.dir(questions, { depth: null }); // Prints the entire nested tree to the console

    // In a real scenario, you would save this to MongoDB using Mongoose
    res.status(201).json({
        message: "Form submitted successfully to the backend!",
        receivedCount: questions.length
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});