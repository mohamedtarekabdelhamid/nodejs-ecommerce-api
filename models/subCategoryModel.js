const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Subcategory name must be unique'],
        trim: true,
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    }
}, {timestamps: true})

const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema)

module.exports = SubCategoryModel