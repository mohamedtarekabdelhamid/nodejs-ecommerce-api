const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
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

const BrandModel = mongoose.model('Brand', brandSchema)

module.exports = BrandModel