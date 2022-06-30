const productRepository = require('../repositories/productRepository');
const reviewRepository = require('../repositories/reviewRepository');
const logger = require('../utils/appLogger');
// request
// application
// INFO, WARN, ERROR, DEBUG
// file, db 
const getOptions = (req) => {
    const pageSize = +req.params.size || 10;
    const page = +req.params.page || 1;

    let sort = req.query.sort;
    let dir = req.query.dir || '';
    const search = req.query.search || '';

    if (!sort) {
        sort = 'updatedAt';
        if (!dir) {
            dir = 'DESC'
        }
    }

    return {
        page,
        pageSize,
        sort,
        dir,
        search
    };
};

const get = async (req, res) => {
    logger.info('Get Request made');
    try {
        const options = getOptions(req);
        const data = await productRepository.get(options);
        const totalRecords = await productRepository.getCount(options);

        const protocol = req.protocol;
        const host = req.get('host');

        const transformedData = data.map(product => {
            return {
                ...product._doc,
                img: product._doc.img ? `${protocol}://${host}/${product._doc.img}` : ''
            }
        })

        const totalPages = Math.ceil(totalRecords / options.pageSize);

        const repsonse = {
            metadata: {
                totalRecords,
                totalPages,
            },
            data: transformedData
        };

        logger.info({ msg: 'data successfully fetched', data: data });

        res.status(200);
        res.json(repsonse);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send('Internal Server Error');
    }
};

const getById = async (req, res) => {
    const id = req.params.id;
    const product = await productRepository.getById(id);
    const reviews = await reviewRepository.getReviewsByProductId(id);
    const ratingRes = await reviewRepository.getAvgRating(id);

    const jsonProduct = product.toJSON();
    jsonProduct.reviews = reviews;
    const avgRating = ratingRes && ratingRes.length > 0 ? ratingRes[0].avgRating : undefined;
    jsonProduct.avgRating = avgRating;

    res.status(200);
    res.json(jsonProduct);
};

// index.js -> product router -> product ctrl -> product repo
const post = async (req, res) => {
    try {
        req.body.createdAt = new Date();
        await productRepository.create(req.body);
        res.status(201);
        res.send();
    } catch (err) {
        logger.error(err);
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
