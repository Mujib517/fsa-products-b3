const User = require('../models/userModel');

const register = (data) => {
    const user = new User(data);
    return user.save();
};

module.exports = { register };