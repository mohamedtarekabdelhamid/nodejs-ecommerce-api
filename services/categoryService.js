const Category = require('../models/categoryModel')
const factory = require('./handlerFactory')

const createCategory = factory.createOne(Category)
const getCategories = factory.getAll(Category)
const getCategory = factory.getOne(Category)
const updateCategory = factory.updateOne(Category)
const deleteCategory = factory.deleteOne(Category)

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
}