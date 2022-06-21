const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    rating: { type: Number, required: true },
    subject: { type: String },
    message: { type: String },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, required: true },
    productId: { type: String, required: true }
});

module.exports = mongoose.model('review', schema);