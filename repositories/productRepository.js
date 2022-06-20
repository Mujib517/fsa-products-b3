const { listenerCount } = require('../models/productModel');
const Product = require('../models/productModel');

const get = (options) => {
    const { page, pageSize, sort, dir, search } = options;

    let direction;

    switch (dir.toLowerCase()) {
        case 'asc':
            direction = 1;
            break;
        case 'desc':
            direction = -1;
            break;

        default:
            direction = 1;
            break;
    }

    let filter = {};

    if (search) {
        filter = {
            $or: [{ brand: search },
            { model: search },
            { category: search }]
        };
    }

    return Product
        .find(filter, { __v: 0 })
        .sort({ [sort]: direction })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
};

const getCount = (options) => {
    const { search } = options;
    let filter = {};

    if (search) {
        filter = {
            $or: [{ brand: search },
            { model: search },
            { category: search }]
        };
    }
    return Product.count(filter);
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

const patch = (id, data) => {
    return Product.findOneAndUpdate({ _id: id }, data);
};

module.exports = {
    get,
    getById,
    create,
    remove,
    update,
    patch,
    getCount
};;
