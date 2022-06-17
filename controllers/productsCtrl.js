const productRepository = require('../repositories/productRepository');

const get = async (req, res) => {
    try {
        const pageSize = +req.params.size || 10;
        const page = +req.params.page || 1;
        const data = await productRepository.get(page, pageSize);
        const totalRecords = await productRepository.getCount();
        const totalPages = Math.ceil(totalRecords / pageSize);

        const repsonse = {
            metadata: {
                totalRecords,
                totalPages,
            },
            data
        };

        res.status(200);
        res.json(repsonse);
    } catch (err) {
        res.status(500);
        res.send('Internal Server Error');
    }
};

const getById = async (req, res) => {
    const id = req.params.id;
    const product = await productRepository.getById(id);
    res.status(200);
    res.json(product);
};

// index.js -> product router -> product ctrl -> product repo
const post = async (req, res) => {
    try {
        await productRepository.create(req.body);
        res.status(201);
        res.send();
    } catch (err) {
        if (err && err.message.indexOf('validation failed') > -1) {
            res.status(400);
            res.send(err);
        } else {
            res.status(500);
            res.send(err);
        }
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
    await productRepository.remove(id);

    res.status(204);
    res.send();
};

// full update
// CRUD: Create, Read, Update, Delete
// PATCH: partial update
// PATCH: http://localhost:3000/api/products/:id body{}
const update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    await productRepository.update(id, body);

    res.status(204);
    res.send();
};

const patch = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    await productRepository.patch(id, body);

    res.status(204);
    res.send();
};

module.exports = {
    get,
    post,
    getById,
    remove,
    update,
    patch
};
