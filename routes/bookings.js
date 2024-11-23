const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection

// Get All Bookings
router.get('/', (req, res) => {
    const query = 'SELECT * FROM bookings'; // Assuming a table called 'bookings'
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).send('Error fetching bookings');
        }
        res.json(results);
    });
});

// Add a New Booking
router.post('/', (req, res) => {
    const { customer_name, pickup_location, dropoff_location, date } = req.body;
    const query = 'INSERT INTO bookings (customer_name, pickup_location, dropoff_location, date) VALUES (?, ?, ?, ?)';
    db.query(query, [customer_name, pickup_location, dropoff_location, date], (err, result) => {
        if (err) {
            console.error('Error adding booking:', err);
            return res.status(500).send('Error adding booking');
        }
        res.status(201).send('Booking added successfully!');
    });
});

// Update Booking
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { customer_name, pickup_location, dropoff_location, date } = req.body;
    const query = 'UPDATE bookings SET customer_name = ?, pickup_location = ?, dropoff_location = ?, date = ? WHERE id = ?';
    db.query(query, [customer_name, pickup_location, dropoff_location, date, id], (err, result) => {
        if (err) {
            console.error('Error updating booking:', err);
            return res.status(500).send('Error updating booking');
        }
        res.send('Booking updated successfully!');
    });
});

// Delete Booking
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM bookings WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting booking:', err);
            return res.status(500).send('Error deleting booking');
        }
        res.send('Booking deleted successfully!');
    });
});

module.exports = router;
