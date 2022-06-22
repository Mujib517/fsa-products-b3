const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const homeRouter = require('./routes/homeRouter');
const productRouter = require('./routes/productRouter');
const reviewRouter = require('./routes/reviewRouter');
const config = require('./config');
const logger = require('./utils/appLogger');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


const dir = path.join(__dirname, 'logs');
if (!fs.existsSync(dir)) {
    // create a file
    fs.mkdirSync(dir);
}
const filePath = path.join(__dirname, 'logs', 'request.log');
const stream = fs.createWriteStream(filePath, { flags: 'a' });

app.use(morgan('combined', { stream: stream }));
app.use(morgan('combined'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

logger.info('App has started running');

mongoose.connect(config.dbConStr, (err, result) => {
    if (!err) {
        console.log('Connected to db');
    } else {
        console.log(err);
    }
});

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        // verify credentials
        const tokens = authHeader.split(' ');
        const encodedStr = tokens[1];
        let buff = new Buffer(encodedStr, 'base64');
        let decodedStr = buff.toString('utf-8');

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

// public
// encoding 
app.use(authenticate);
app.use('/', homeRouter);


// private
app.use('/api/products', productRouter);
app.use('/api/reviews', reviewRouter);

// POST http://localhost:3000/api/products body{}

