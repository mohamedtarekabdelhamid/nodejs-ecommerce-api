const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'Product title must be unique'],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String
    },
    imageCover: {
        type: String
    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    subcategories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'SubCategory'
        }
    ],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand'
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
    },
    priceAfterDiscount: {
        type: Number
    },
    colors: [String],
    ratingAverage: {
        type: Number,
    },
    ratingQuantity: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel