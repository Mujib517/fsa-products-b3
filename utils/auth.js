const jwt = require('jsonwebtoken');
const config = require('../config');

function basicAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        // verify credentials
        const tokens = authHeader.split(' ');
        const encodedStr = tokens[1];
        let buff = new Buffer(encodedStr, 'base64');
        let decodedStr = buff.toString('utf-8');

        // username:password
        const credentials = decodedStr.split(':');
        const username = credentials[0];
        const password = credentials[1];

        if (username === 'admin' && password === 'password') {
            next();
        }
        else {
            res.status(401);
            res.send('Unauthorized');
        }

    } else {
        res.status(401);
        res.send('Unauthorized');
    }
}

function generateToken(payload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' });
}

function tokenAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401);
            res.send('Unauthorized');
        } else {
            // Bearer akdjfkajdf.adkfjadkf.adkfjdka
            const tokens = authHeader.split(' ');
            const jwtToken = tokens[1];
            const response = jwt.verify(jwtToken, config.jwtSecret);
            if (response) {
                req.role = response.role;
                next();
            }
            else {
                res.status(401);
                res.send('Unauthorized');
            }
        }
    }
    catch (e) {
        res.status(401);
        res.send('Unauthorized');
    }
}

// api/products/page/1/size/10
// index.js -> auth.js -> products
// delete
// api/products/:id
function authorizeAdmmin(req, res, next) {
    const role = req.role;
    if (role === 'Admin') next();
    else {
        res.status(403);
        res.send('Forbidden');
    }
}

module.exports = {
    basicAuth,
    generateToken,
    tokenAuth,
    authorizeAdmmin
};
