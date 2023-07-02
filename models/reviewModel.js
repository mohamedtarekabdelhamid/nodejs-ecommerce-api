const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    content: String,
    rating: Number,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
}, {timestamps: true})

reviewSchema.pre(/^find/, function (next) {
    this.populate({path: 'user', select: 'name'})
    next()
})

const ReviewModel = mongoose.model('Review', reviewSchema)

module.exports = ReviewModel