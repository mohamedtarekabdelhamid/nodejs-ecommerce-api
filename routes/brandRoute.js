const express = require('express')

const router = express.Router()

const {
    createBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand
} = require('../services/brandService')

const {
    createBrandValidator,
    getBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
} = require('../utils/validators/brandValidator')

const {auth, allowedTo} = require('../services/authService')

const {uploadSingleImage} = require('../middlewares/uploadImagesMiddleware')

const {resizeSingleImage} = require('../middlewares/resizeImagesMiddleware')


router
    .route('/')
    .post(
        auth,
        allowedTo('admin', 'vendor'),
        uploadSingleImage('image'),
        resizeSingleImage('image', 'brand'),
        ...createBrandValidator,
        createBrand
    )
    .get(getBrands)

router.route('/:id')
    .get(
        ...getBrandValidator, getBrand)
    .put(
        auth,
        allowedTo('admin', 'vendor'),
        uploadSingleImage('image'),
        resizeSingleImage('image', 'brand'),
        ...updateBrandValidator,
        updateBrand
    )
    .delete(
        auth,
        allowedTo('admin'),
        ...deleteBrandValidator,
        deleteBrand
    )

module.exports = router