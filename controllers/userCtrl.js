const userRepository = require('../repositories/userRepository');
const logger = require('../utils/appLogger');
const crypt = require('../utils/crypt');
const auth = require('../utils/auth');

const post = async (req, res) => {
    try {
        logger.info('Saving data to db');
        const data = req.body;
        data.createdAt = new Date();
        data.password = await crypt.getHash(data.password);
        await userRepository.register(data);
        logger.info('Saved data to db');
        res.status(201);
        res.send();
    } catch (e) {
        logger.error(e);
        if (e && e.message.indexOf('duplicate key error') > -1) {
            res.status(400);
            res.send('Email already exists');
        } else {
            res.status(500);
            res.send('Internal Server Error');
        }
    }
};

const login = async (req, res) => {
    const data = req.body;
    const user = await userRepository.getUser(data);
    console.log('dbuser', user);
    if (!user) {
        res.status(401);
        res.send('Wrong email or password');
    } else {
        // compare
        const response = await crypt.comparePasswords(data.password, user.password);
        if (response) {
            // ok
            res.status(200);
            const token = auth.generateToken({ role: user.role, email: user.email });
            res.json({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: token
            });
        } else {
            res.status(401);
            res.send('Wrong username or password');
        }
    }
}

module.exports = { post, login };

