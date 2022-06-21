const reviewRepository = require('../repositories/reviewRepository');
const logger = require('../utils/appLogger');

const post = async (req, res) => {
    try {
        const data = req.body;
        data.createdAt = new Date();
        await reviewRepository.create(data);

        res.status(201);
        res.send();
    } catch (err) {
        logger.error(err);
        res.status(500);
        res.send('Internal Server Error');
    }
};

module.exports = { post };
