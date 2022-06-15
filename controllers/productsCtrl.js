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

const getById = async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findOne({ _id: id }, { __v: 0 });
    res.status(200);
    res.json(product);
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

const remove = async (req, res) => {
    const id = req.params.id;
    await ProductModel.deleteOne({ _id: id });

    res.status(204);
    res.send();
};

// full update
// CRUD: Create, Read, Update, Delete
const update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    await ProductModel.findOneAndUpdate({ _id: id }, {
        brand: body.brand,
        model: body.model,
        price: body.price,
        inStock: body.inStock,
        category: body.category,
    });

    res.status(204);
    res.send();
};

module.exports = {
    get,
    post,
    getById,
    remove,
    update
};
