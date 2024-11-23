// Example of handling form submission (optional)
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const pickup = document.getElementById('pickup').value;
    const destination = document.getElementById('destination').value;
    const time = document.getElementById('time').value;

    // You can add logic to send this data to your backend or display a success message
    alert(`Taxi booked from ${pickup} to ${destination} at ${time}`);
});
