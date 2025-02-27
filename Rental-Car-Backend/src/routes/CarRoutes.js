const express = require('express');
const { getCars, getCar, addCar, updateCar, deleteCar } = require('../controllers/carController');
const router = express.Router();

// Car inventory CRUD routes
router.get('/', getCars);
router.get('/:id', getCar);
router.post('/', addCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
