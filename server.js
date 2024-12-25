const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/booking-system', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String
});


// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String // In a real application, make sure to hash passwords
});

const User = mongoose.model('User ', userSchema);

// Register a new user
app.post('/api/register', async (req, res) => {
  try {
      const { name, email, phone, password } = req.body;
      const newUser  = new User({ name, email, phone, password });
      await newUser .save();
      res.status(201).json({ message: 'User  registered successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error registering user' });
  }
});
const Booking = mongoose.model('Booking', bookingSchema);

// Middleware
app.use(bodyParser.json());

// Create a booking
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.json(savedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
mongoose.connect('mongodb://localhost:27017/booking-system', { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
