const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/booking-system', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
})
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String
});

const User = mongoose.model('User ', userSchema);

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String,
    service: String
});

const Booking = mongoose.model('Booking', bookingSchema);

// Seed database with sample data
async function seedDatabase() {
    // Sample users
    const users = [
        { name: 'John Doe', email: 'john@example.com', phone: '1234567890', password: 'password123' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', password: 'password123' }
    ];

    // Sample bookings
    const bookings = [
        { name: 'John Doe', date: '2023-10-01', time: '10:00', service: 'haircut' },
        { name: 'Jane Smith', date: '2023-10-02', time: '11:00', service: 'color' }
    ];

    // Insert users
    await User.insertMany(users);
    console.log('Sample users added.');

    // Insert bookings
    await Booking.insertMany(bookings);
    console.log('Sample bookings added.');

    // Close the connection
    mongoose.connection.close();
}

