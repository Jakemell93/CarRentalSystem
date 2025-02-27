const Car = require('../models/Car');

// Get all cars
const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single car by ID
const getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: "Car not found" });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new car
const addCar = async (req, res) => {
    try {
        const { make, model, year, pricePerDay, available, imageUrl } = req.body;
        const car = new Car({ make, model, year, pricePerDay, available, imageUrl });
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a car
const updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!car) return res.status(404).json({ message: "Car not found" });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a car
const deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) return res.status(404).json({ message: "Car not found" });
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCars, getCar, addCar, updateCar, deleteCar };
