const Review = require('../models/reviewModel')
const factory = require('../services/handlerFactory')

const createFilterObj = (req, res, next) => {
    let filterObj = {}
    if (req.params.productId) {
        filterObj = {product: req.params.productId}
    }
    req.filterObj = filterObj
    next()
}

const setProductIdAndUserIdToBody = (req, res, next) => {
    if (!req.body.product) {
        req.body.product = req.params.productId
    }
    if (!req.body.user) {
        req.body.user = req.user._id
    }
    next()
}

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
    deleteReview,
    createFilterObj,
    setProductIdAndUserIdToBody
}