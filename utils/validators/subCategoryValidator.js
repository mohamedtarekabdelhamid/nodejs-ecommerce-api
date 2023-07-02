const {check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const slugify = require("slugify");

const createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory name is required')
        .isLength({min: 2})
        .withMessage('Too short SubCategory name')
        .isLength({max: 32})
        .withMessage('Too long SubCategory name')
        .custom((val, {req}) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('category')
        .notEmpty()
        .withMessage('Subcategory must be belong to parent category')
        .isMongoId()
        .withMessage('Invalid category id'),
    validatorMiddleware
]

const getSubCategoryValidator = [
    check(' id').isMongoId().withMessage('Invalid SubCategory Id'),
    validatorMiddleware
]

const updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory Id'),
    check('name').optional().custom((val, {req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

const deleteSubCategoryValidator = [
    check(' id').isMongoId().withMessage('Invalid SubCategory Id'),
    validatorMiddleware
]

module.exports = {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
}