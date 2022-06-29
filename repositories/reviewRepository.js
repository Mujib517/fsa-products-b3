const Review = require('../models/reviewModel');

const create = (data) => {
    const review = new Review(data);
    return review.save();
};

const getReviewsByProductId = (productId) => {
    return Review.find({ productId }, { __v: 0, _id: 0 });
};

const getAvgRating = (productId) => {
    return Review.aggregate([
        { $match: { productId: productId } },
        { $group: { _id: '$productId', avgRating: { $avg: '$rating' } } },
        { $project: { _id: 0 } }
    ]);
};

module.exports = {
    create,
    getReviewsByProductId,
    getAvgRating
};