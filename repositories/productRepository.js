const Product = require('../models/productModel');

const get = () => {
    return Product.find({}, { __v: 0 });
};

const getById = (id) => {
    return Product.findOne({ _id: id }, { __v: 0 });
}

const create = (data) => {
    const product = new Product(data);
    return product.save();
}

const remove = (id) => {
    return Product.deleteOne({ _id: id });
}

const update = (id, data) => {
    return Product.findOneAndUpdate({ _id: id }, {
        brand: data.brand,
        model: data.model,
        price: data.price,
        inStock: data.inStock,
        category: data.category,
    });
};

module.exports = {
    get,
    getById,
    create,
    remove,
    update
};;
