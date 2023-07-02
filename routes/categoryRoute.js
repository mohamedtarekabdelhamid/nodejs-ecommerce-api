const express = require('express')

const router = express.Router()

const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require('../services/categoryService')

const {
    createCategoryValidator,
    getCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} = require('../utils/validators/categoryValidator')

const {auth, allowedTo} = require('../services/authService')

const {uploadSingleImage} = require('../middlewares/uploadImagesMiddleware')

const {resizeSingleImage} = require('../middlewares/resizeImagesMiddleware')


router
    .route('/')
    .post(
        auth,
        allowedTo('admin', 'vendor'),
        uploadSingleImage('image'),
        resizeSingleImage('image', 'category'),
        ...createCategoryValidator,
        createCategory
    )
    .get(getCategories)

router.route('/:id')
    .get(...getCategoryValidator, getCategory)
    .put(
        auth,
        allowedTo('admin', 'vendor'),
        uploadSingleImage('image'),
        resizeSingleImage('image', 'category'),
        ...updateCategoryValidator,
        updateCategory
    )
    .delete(
        auth,
        allowedTo('admin'),
        ...deleteCategoryValidator,
        deleteCategory
    )

module.exports = router