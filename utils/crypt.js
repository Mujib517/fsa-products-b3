const bcrypt = require('bcrypt');

const getHash = (password) => {
    return bcrypt.hash(password, 1);
};

const comparePasswords = (plainText, hash) => {
    return bcrypt.compare(plainText, hash);
};

module.exports = { getHash, comparePasswords };