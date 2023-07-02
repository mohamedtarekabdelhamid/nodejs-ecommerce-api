const {check} = require('express-validator')
const bcrypt = require('bcryptjs')

const User = require('../../models/userModel')
const ApiError = require('../apiError')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const createUserValidator = [
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
    check('phone')
        .optional()
        .isMobilePhone(['ar-EG', 'ar-SA'])
        .withMessage('Only accepted numbers for Egypt and KSA'),
    check('avatar')
        .optional(),
    check('role')
        .optional(),
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

const getUserValidator = [
    check('id').isMongoId().withMessage('Invalid user Id'),
    validatorMiddleware
]

const updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid user Id'),
    check('name')
        .optional()
        .isLength({min: 3})
        .withMessage('Too short name')
        .isLength({max: 32})
        .withMessage('Too long name'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address')
        .custom(async email => {
            const user = await User.findOne({email})

            if (user) {
                throw new ApiError('Email already exists')
            }
        }),
    check('username')
        .optional()
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
    check('phone')
        .optional()
        .isMobilePhone(['ar-EG', 'ar-SA'])
        .withMessage('Only accepted numbers for Egypt and KSA'),
    check('avatar')
        .optional(),
    check('role')
        .optional(),
    validatorMiddleware
]

const deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid user Id'),
    validatorMiddleware
]

const changeUserPasswordValidator = [
    check('currentPassword')
        .notEmpty()
        .withMessage('You must enter your current password')
        .custom(async (currentPassword, {req}) => {
            const user = await User.findById(req.params.id)

            if (!user) {
                throw new ApiError('Invalid user Id')
            }

            const isMatched = await bcrypt.compare(req.body.currentPassword, user.password)

            if (!isMatched) {
                throw new ApiError('Incorrect current password')
            }

            return true
        }),
    check('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({min: 8})
        .withMessage('Too short password')
        .custom((newPassword, {req}) => {
            if (newPassword !== req.body.passwordConfirm) {
                throw new ApiError('Password confirmation incorrect')
            }
            return true
        }),
    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation required'),
    validatorMiddleware
]

const updateLoggedUserValidator = [
    check('name')
        .optional()
        .isLength({min: 3})
        .withMessage('Too short name')
        .isLength({max: 32})
        .withMessage('Too long name'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address')
        .custom(async email => {
            const user = await User.findOne({email})

            if (user) {
                throw new ApiError('Email already exists')
            }
        }),
    check('username')
        .optional()
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
    check('phone')
        .optional()
        .isMobilePhone(['ar-EG', 'ar-SA'])
        .withMessage('Only accepted numbers for Egypt and KSA'),
    check('avatar')
        .optional(),
    validatorMiddleware
]


module.exports = {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserValidator
}