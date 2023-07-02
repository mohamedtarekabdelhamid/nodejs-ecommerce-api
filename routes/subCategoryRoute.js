const express = require('express')

const router = express.Router()

const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
} = require('../services/subCategoryService')

const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
} = require('../utils/validators/subCategoryValidator')

const {auth, allowedTo} = require('../services/authService')

router
    .route('/')
    .post(
        auth,
        allowedTo('admin', 'vendor'),
        ...createSubCategoryValidator,
        createSubCategory
    )
    .get(getSubCategories)

router
    .route('/:id')
    .get(...getSubCategoryValidator, getSubCategory)
    .put(
        auth,
        allowedTo('admin', 'vendor'),
        ...updateSubCategoryValidator,
        updateSubCategory
    )
    .delete(
        auth,
        allowedTo('admin'),
        ...deleteSubCategoryValidator,
        deleteSubCategory
    )

module.exports = router