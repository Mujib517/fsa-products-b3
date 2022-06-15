const ProductModel = require('../models/productModel');

const get = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200);
        res.json(products);
    } catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};

const post = async (req, res) => {
    try {
        const product = new ProductModel(req.body);
        await product.save();
        res.status(201);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};

module.exports = { get, post };
