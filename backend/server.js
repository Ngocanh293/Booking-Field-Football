require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const timeSlotRoutes = require('./routes/timeSlotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

// Định tuyến API
app.use('/api/auth', authRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Football Field Booking API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
