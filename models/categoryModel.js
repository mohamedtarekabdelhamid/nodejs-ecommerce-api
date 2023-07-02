const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, {
    timestamps: true
})

const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel