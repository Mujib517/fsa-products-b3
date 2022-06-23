const User = require('../models/userModel');

const register = (data) => {
    const user = new User(data);
    return user.save();
};
// username & password
// fetch db by email
// dbPassword
// hash(password) === dbPassword
// 200
// 401
const getUser = (data) => {
    return User.findOne({ email: data.email }, { email: 1, password: 1 });
};

module.exports = { register, getUser };