const Product = require('../models/productModel')
const factory = require('./handlerFactory')

const createProduct = factory.createOne(Product)
const getProducts = factory.getAll(Product)
const getProduct = factory.getOne(Product)
const updateProduct = factory.updateOne(Product)
const deleteProduct = factory.deleteOne(Product)

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}