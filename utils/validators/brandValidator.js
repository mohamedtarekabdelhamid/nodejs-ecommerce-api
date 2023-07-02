const {check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const slugify = require("slugify");

const createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('Brand name is required')
        .isLength({min: 2})
        .withMessage('Too short brand name')
        .isLength({max: 32})
        .withMessage('Too long brand name')
        .custom((val, {req}) => {
            req.body.slug = slugify(val)
            return true
        }),
    validatorMiddleware
]

const getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand Id'),
    validatorMiddleware
]

const updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand Id'),
    check('name').optional().custom((val, {req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

const deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand Id'),
    validatorMiddleware
]

module.exports = {
    createBrandValidator,
    getBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
}