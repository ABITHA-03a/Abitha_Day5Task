import React, { useState } from 'react';

const TaxiBookingForm = () => {
  const [name, setName] = useState('');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data object
    const formData = {
      name,
      pickup,
      drop,
      date,
      time
    };

    try {
      // Send data to the backend via a POST request
      const response = await fetch('http://localhost:5000/book-taxi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // If booking is successful, show success message
        setMessage('Taxi booked successfully!');
      } else {
        // If booking failed, show error message
        setMessage(data.message || 'Failed to book taxi');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error booking taxi');
    }
  };

  return (
    <div>
      <h2>Taxi Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Pickup Location:</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Drop Location:</label>
          <input
            type="text"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Taxi</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default TaxiBookingForm;
