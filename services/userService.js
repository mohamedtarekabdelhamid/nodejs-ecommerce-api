const User = require('../models/userModel')
const factory = require('../services/handlerFactory')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const bcrypt = require('bcryptjs')
const createToken = require('../utils/createToken')

const createUser = factory.createOne(User)
const getUsers = factory.getAll(User)
const getUser = factory.getOne(User)

const updateUser = asyncHandler(async (req, res, next) => {
    const {id} = req.params

    const user = await User.findByIdAndUpdate(id, {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar,
        role: req.body.role
    }, {new: true})

    if (!user) {
        return next(new ApiError(`No user for this id ${id}`, 404))
    }

    res.status(200).send(user)
})

const changeUserPassword = asyncHandler(async (req, res, next) => {
    const {id} = req.params

    const user = await User.findByIdAndUpdate(id, {
        password: await bcrypt.hash(req.body.newPassword, 12),
        unhashedPassword: req.body.newPassword,
        passwordChangedAt: Date.now()
    }, {new: true})

    if (!user) {
        return next(new ApiError(`No user for this id ${id}`, 404))
    }

    res.status(200).send(user)
})

const deleteUser = factory.deleteOne(User)

const getLoggedUser = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id
    next()
})

const updateLoggedUser = asyncHandler(async (req, res, next) => {
    if (req.body.password) {
        return next(new ApiError(`You are not allowed to change password here go to change password page`, 400))
    }


    const user = await User.findByIdAndUpdate(req.user._id, {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
    }, {new: true})

    res.status(200).send(user)
})

const deleteLoggedUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.user._id)

    res.status(204).send()
})

const activateLoggedUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, {active: true})

    res.status(200).send(user)
})

const deactivateLoggedUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, {active: false})

    res.status(204).send()
})

const changeLoggedUserPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
        unhashedPassword: req.body.password
    }, {new: true})

    const token = createToken(user._id)

    res.status(200).send({user, token})
})

const addProductToWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {wishlist: req.body.product}
    }, {new: true})

    res.status(200).send({
        status: 'Success',
        message: 'Product added to wishlist',
        data: user.wishlist
    })
})

const removeProductFromWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        $pull: {wishlist: req.params.productId}
    }, {new: true})

    res.status(200).send({
        status: 'Success',
        message: 'Product removed from wishlist',
        data: user.wishlist
    })
})

const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).populate('wishlist')
    res.status(200).send({
        result: user.wishlist.length,
        data: user.wishlist
    })
})

// TODO: Refactoring this code with the previous code

const addAddress = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {addresses: req.body}
    }, {new: true})

    res.status(200).send({
        status: 'Success',
        message: 'Address added',
        data: user.addresses
    })
})

const removeAddress = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, {
        $pull: {addresses: {_id: req.params.addressId}}
    }, {new: true})

    res.status(200).send({
        status: 'Success',
        message: 'Address removed',
        data: user.addresses
    })
})

const getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    res.status(200).send({
        result: user.addresses.length,
        data: user.addresses
    })
})

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    changeUserPassword,
    getLoggedUser,
    updateLoggedUser,
    deleteLoggedUser,
    activateLoggedUser,
    deactivateLoggedUser,
    changeLoggedUserPassword,
    addProductToWishlist,
    removeProductFromWishlist,
    getLoggedUserWishlist,
    addAddress,
    removeAddress,
    getLoggedUserAddresses
}