const mysql = require('mysql');

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Abitha',  // Your MySQL username
  password: 'Abithaj@123',  // Your MySQL password
  database: 'taxi_booking'  // Database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;
