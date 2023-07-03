const {check} = require('express-validator')

const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const Review = require('../../models/reviewModel')
const Product = require('../../models/productModel')

const ApiError = require('../apiError')

const createReviewValidator = [
    check('rating')
        .notEmpty()
        .withMessage('Rating value is required')
        .isInt()
        .withMessage('Rating value must be between 1 to 5'),
    check('content')
        .optional()
        .isLength({min: 2, max: 100})
        .withMessage('Review content must be between 2 and 100 characters'),
    check('user')
        .notEmpty()
        .withMessage('User Id is required')
        .isMongoId()
        .withMessage('Invalid user Id')
        .custom((val, {req}) => {
            if (val.toString() !== req.user._id.toString()) {
                throw new ApiError('You are not allowed to perform this action', 400)
            }
            return true
        }),
    check('product')
        .notEmpty()
        .withMessage('Product Id is required')
        .isMongoId()
        .withMessage('Invalid product Id')
        .custom(async (val, {req}) => {
            const {user} = req.body

            const product = await Product.findById(val)
            if (!product) {
                throw new ApiError('Product Id is not exists', 404)
            }

            const review = await Review.findOne({user, product: val})
            if (review) {
                throw new ApiError('You already created a review before')
            }

            return true
        }),
    validatorMiddleware
]

const getReviewValidator = [
    check('id').isMongoId().withMessage('Invalid category Id'),
    validatorMiddleware
]

const updateReviewValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid review Id')
        .custom(async (val, {req}) => {
            const review = await Review.findById(val)
            if (!review) {
                throw new ApiError(`There is no review for this id ${val}`)
            }

            if (review.user._id.toString() !== req.user._id.toString()) {
                throw new ApiError('You are not allowed to perform this action')
            }
        }),
    validatorMiddleware
]

const deleteReviewValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid category Id')
        .custom(async (val, {req}) => {
            if (req.user.role === 'user') {
                const review = await Review.findById(val)
                if (!review) {
                    throw new ApiError(`There is no review for this id ${val}`)
                }

                if (review.user._id.toString() !== req.user._id.toString()) {
                    throw new ApiError('You are not allowed to perform this action')
                }
            }

            // TODO: Adding validation if the user is vendor that he can only delete the reviews of his products
            return true
        }),
    validatorMiddleware
]

module.exports = {
    createReviewValidator,
    getReviewValidator,
    updateReviewValidator,
    deleteReviewValidator
}