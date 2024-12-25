const serviceSelect = document.getElementById('service');
const form = document.getElementById('bookingForm');
const bookingsDiv = document.getElementById('bookings');

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
}

function showSignupForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

function login() {
    // TODO: Implement login logic (e.g., API call, local storage)
    // If login successful, redirect to index.html
    window.location.href = "index.html"; 
}

function signup() {
    // TODO: Implement signup logic (e.g., API call, local storage)
    // If signup successful, redirect to index.html
    window.location.href = "index.html"; 
}

// Initial display (show login form by default)
showLoginForm();
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, date, time })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Booking created:', data);
    displayBookings();

  } catch (error) {
    console.error('Error:', error);
  }
});

const newBookingDiv = document.createElement('div');
newBookingDiv.textContent = `Name: ${booking.name}, Date: ${booking.date}, Time: ${booking.time}`;
newBookingDiv.classList.add('show'); // Add the 'show' class to trigger the animation
bookingsDiv.appendChild(newBookingDiv);

// ... (rest of the code)

const displayBookings = async () => {
  try {
    const response = await fetch('/api/bookings');
    const bookings = await response.json();

    bookingsDiv.innerHTML = ''; 

    bookings.forEach(booking => {
      const bookingDiv = document.createElement('div');
      bookingDiv.textContent = `Name: ${booking.name}, Date: ${booking.date}, Time: ${booking.time}`;
      bookingsDiv.appendChild(bookingDiv);
    });

  } catch (error) {
    console.error('Error:', error);
  }
};

displayBookings();

function sendOtp(type) {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (type === 'email' && email) {
        alert('Email OTP sent to ' + email); // Replace with actual email OTP sending logic
    } else if (type === 'mobile' && phone) {
        alert('Mobile OTP sent to ' + phone); // Replace with actual mobile OTP sending logic
    } else {
        alert('Please provide a valid ' + type + ' to send OTP.');
    }
}

async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Check if passwords match
  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }

  // Create user data object
  const userData = {
      name: name,
      email: email,
      phone: phone,
      password: password // Password will be hashed on the server
  };

  try {
      // Send user data to the server
      const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Redirect to login page after successful registration
      alert("Registration successful! Please log in.");
      window.location.href = "signup.html"; // Redirect to login page

  } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
  }
}

const bcrypt = require('bcrypt');
// Register a new user
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser  = new User({ name, email, phone, password: hashedPassword });
        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
});

const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name, date, time, service: serviceSelect.value }) // Include service
});

if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) {
  alert("Passwords do not match!");
  return;
}

document.getElementById('toggleLogin').addEventListener('click', function() {
  showLoginForm();
});
document.getElementById('toggleSignup').addEventListener('click', function() {
  showSignupForm();
});

const data = await response.json();
console.log('Booking created:', data);
displayBookings(); // Call this after booking is created

const newBookingDiv = document.createElement('div');
newBookingDiv.textContent = `Name: ${booking.name}, Date: ${booking.date}, Time: ${booking.time}`;
newBookingDiv.classList.add('show');
bookingsDiv.appendChild(newBookingDiv);

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
      const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
          throw new Error('Login failed');
      }

      const data = await response.json();
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to home page

  } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please check your credentials.');
  }
}

