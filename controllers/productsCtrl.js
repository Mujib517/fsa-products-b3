const productModel = require('../models/productModel');

const get = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200);
        res.json(products);
    } catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};


module.exports = { get };
