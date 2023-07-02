const Brand = require('../models/brandModel')
const factory = require('../services/handlerFactory')

const createBrand = factory.createOne(Brand)
const getBrands = factory.getAll(Brand)
const getBrand = factory.getOne(Brand)
const updateBrand = factory.updateOne(Brand)
const deleteBrand = factory.deleteOne(Brand)

module.exports = {
    createBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand
}