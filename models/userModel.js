const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, required: true },
    role: { type: String, default: 'User' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', schema);