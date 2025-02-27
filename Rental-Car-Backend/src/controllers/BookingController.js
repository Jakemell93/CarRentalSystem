const Booking = require('../models/Booking');
const Car = require('../models/Car');

// Get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name email').populate('car', 'make model');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single booking
const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user', 'name email').populate('car', 'make model');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const { car, startDate, endDate, totalPrice } = req.body;

        // Ensure car exists
        const carExists = await Car.findById(car);
        if (!carExists || !carExists.available) return res.status(400).json({ message: 'Car not available' });

        // Create booking
        const booking = await Booking.create({
            user: req.user.id,
            car,
            startDate,
            endDate,
            totalPrice,
            status: 'confirmed'
        });

        // Mark car as unavailable
        carExists.available = false;
        await carExists.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a booking
const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking (Cancel)
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Mark car as available again
        const car = await Car.findById(booking.car);
        if (car) {
            car.available = true;
            await car.save();
        }

        await booking.deleteOne();
        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBookings, getBooking, createBooking, updateBooking, deleteBooking };