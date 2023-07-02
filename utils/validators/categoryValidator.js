const {check} = require('express-validator')
const slugify = require('slugify')

const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const createCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({min: 3})
        .withMessage('Too short category name')
        .isLength({max: 32})
        .withMessage('Too long category name')
        .custom((val, {req}) => {
            req.body.slug = slugify(val)
            return true
        }),
    validatorMiddleware
]

const getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category Id'),
    validatorMiddleware
]

const updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category Id'),
    check('name').optional().custom((val, {req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

const deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category Id'),
    validatorMiddleware
]

module.exports = {
    createCategoryValidator,
    getCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
}