const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Abitha', // MySQL username
    password: 'Abithaj@123', // MySQL password
    database: 'taxi_booking' // Database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

// Handle POST request for booking a taxi
app.post('/bookings', (req, res) => {
    // Destructure data from the request body
    const { name, pickup, drop, date, time } = req.body;

    // Log the incoming data to verify it
    console.log('Received booking data:', { name, pickup, drop, date, time });

    // SQL query with backticks to handle reserved keywords ('drop', 'date')
    const query = `
        INSERT INTO bookings (name, pickup, \`drop\`, \`date\`, time)
        VALUES (?, ?, ?, ?, ?)
    `;

    // Use parameterized queries to prevent SQL injection
    db.query(query, [name, pickup, drop, date, time], (err, result) => {
        if (err) {
            console.error('Error inserting booking:', err);
            return res.status(500).json({ error: 'Failed to insert booking' });
        }
        res.json({
            message: 'Booking successfully created',
            bookingDetails: { name, pickup, drop, date, time }
        });
    });
});

// Start the server and listen on port 5000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
