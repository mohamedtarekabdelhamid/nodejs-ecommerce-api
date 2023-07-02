const {check} = require('express-validator')

const User = require('../../models/userModel')
const ApiError = require('../apiError')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const registerValidator = [
    check('name')
        .notEmpty()
        .withMessage('User name is required')
        .isLength({min: 3})
        .withMessage('Too short name')
        .isLength({max: 32})
        .withMessage('Too long name'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom(async email => {
            const user = await User.findOne({email})

            if (user) {
                throw new ApiError('Email already exists')
            }
        }),
    check('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({min: 3})
        .withMessage('Too short username')
        .isLength({max: 32})
        .withMessage('Too long name')
        .custom(async username => {
            const user = await User.findOne({username})

            if (user) {
                throw new ApiError('Username already exists')
            }
        }),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 8})
        .withMessage('Too short password')
        .custom((password, {req}) => {
            if (password !== req.body.passwordConfirm) {
                throw new ApiError('Password confirmation incorrect')
            }

            return true
        }),
    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation required'),
    validatorMiddleware
]

const loginValidator = [
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom(async (email, {req}) => {
            const user = await User.findOne({email})

            if (!user) {
                throw new ApiError('Incorrect email or password', 401)
            }

            req.body.user = user
        }),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 8})
        .withMessage('Too short password'),
    validatorMiddleware
]

module.exports = {
    registerValidator,
    loginValidator
}