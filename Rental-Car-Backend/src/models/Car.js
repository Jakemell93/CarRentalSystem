const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    available: { type: Boolean, default: true },
    imageUrl: { type: String }, 
});

module.exports = mongoose.model('Car', carSchema);
