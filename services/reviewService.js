const Review = require('../models/reviewModel')
const factory = require('../services/handlerFactory')

const createReview = factory.createOne(Review)
const getReviews = factory.getAll(Review)
const getReview = factory.getOne(Review)
const updateReview = factory.updateOne(Review)
const deleteReview = factory.deleteOne(Review)

module.exports = {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
}