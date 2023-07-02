const express = require('express')

const router = express.Router()

const {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
} = require('../services/reviewService')

const {
    createReviewValidator,
    getReviewValidator,
    updateReviewValidator,
    deleteReviewValidator
} = require('../utils/validators/reviewValidator')

const {auth, allowedTo} = require('../services/authService')

router
    .route('/')
    .post(
        auth,
        allowedTo('user'),
        ...createReviewValidator,
        createReview
    )
    .get(getReviews)

router.route('/:id')
    .get(
        ...getReviewValidator,
        getReview
    )
    .put(
        auth,
        allowedTo('user'),
        ...updateReviewValidator,
        updateReview
    )
    .delete(
        auth,
        allowedTo('admin', 'vendor', 'user'),
        ...deleteReviewValidator,
        deleteReview
    )

module.exports = router