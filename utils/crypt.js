const bcrypt = require('bcrypt');

const getHash = (password) => {
    return bcrypt.hash(password, 1);
};

module.exports = { getHash };