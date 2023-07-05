const express = require('express')

const router = express.Router()

const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../services/productService')

const {
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../utils/validators/productValidator')

const reviewRoute = require('../routes/reviewRoute')

const {auth, allowedTo} = require('../services/authService')

const {uploadMultiImages} = require('../middlewares/uploadImagesMiddleware')

const {resizeCoverAndMultiImages} = require('../middlewares/resizeImagesMiddleware')

router.use('/:productId/reviews', reviewRoute)

router
    .route('/')
    .post(
        auth,
        allowedTo('admin', 'vendor'),
        uploadMultiImages([{name: 'imageCover', maxCount: 1}, {name: 'images', maxCount: 20}]),
        resizeCoverAndMultiImages('product'),
        ...createProductValidator,
        createProduct
    )
    .get(getProducts)

router
    .route('/:id')
    .get(...getProductValidator, getProduct)
    .put(
        auth,
        allowedTo('admin', 'vendor'),
        uploadMultiImages([{name: 'imageCover', maxCount: 1}, {name: 'images', maxCount: 20}]),
        resizeCoverAndMultiImages('product'),
        ...updateProductValidator,
        updateProduct
    )
    .delete(
        auth,
        allowedTo('admin', 'vendor'),
        ...deleteProductValidator,
        deleteProduct
    )

module.exports = router