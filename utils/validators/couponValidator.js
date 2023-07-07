const {check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const createCouponValidator = [
    check('name')
        .notEmpty()
        .withMessage('Coupon name is required')
        .trim()
        .isLength({min: 2})
        .withMessage('Too short coupon name')
        .isLength({max: 32})
        .withMessage('Too long coupon name')
        .toUpperCase(),
    check('expire')
        .notEmpty()
        .withMessage('Expire date is required')
        .isISO8601()
        .withMessage('Invalid date'),
    check('discount')
        .notEmpty()
        .withMessage('Discount amount is required')
        .isInt({min: 1, max: 100})
        .withMessage('Only positive numbers form 0 to 100 is support'),
    validatorMiddleware
]

const getCouponValidator = [
    check('id').isMongoId().withMessage('Invalid coupon Id'),
    validatorMiddleware
]

const updateCouponValidator = [
    check('id').isMongoId().withMessage('Invalid coupon Id'),
    check('name')
        .optional()
        .trim()
        .isLength({min: 2})
        .withMessage('Too short coupon name')
        .isLength({max: 32})
        .withMessage('Too long coupon name')
        .toUpperCase(),
    check('expire')
        .optional()
        .isISO8601()
        .withMessage('Invalid date'),
    check('discount')
        .optional()
        .isInt({min: 1, max: 100})
        .withMessage('Only positive numbers form 0 to 100 is support'),
    validatorMiddleware
]

const deleteCouponValidator = [
    check('id').isMongoId().withMessage('Invalid coupon Id'),
    validatorMiddleware
]

module.exports = {
    createCouponValidator,
    getCouponValidator,
    updateCouponValidator,
    deleteCouponValidator
}