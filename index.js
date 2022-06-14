const express = require('express');
const mongoose = require('mongoose');

const homeRouter = require('./routes/homeRouter');
const productRouter = require('./routes/productRouter');
const config = require('./config');

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(config.dbConStr, (err, result) => {
    if (!err) {
        console.log('Connected to db');
    } else {
        console.log(err);
    }
});

app.use('/', homeRouter);
app.use('/api/products', productRouter);

