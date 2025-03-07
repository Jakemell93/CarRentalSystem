const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const CarRoutes = require('./routes/CarRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const dotenv = require('dotenv');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

dotenv.config();

app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/cars', CarRoutes);
app.use('/api/Auth', AuthRoutes);
app.use('/api/bookings', bookingRoutes);

module.exports = app;