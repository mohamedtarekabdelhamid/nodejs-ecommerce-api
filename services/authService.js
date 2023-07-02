const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')
const ApiError = require('../utils/apiError')
const createToken = require('../utils/createToken')

const register = asyncHandler(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        unhashedPassword: req.body.unhashedPassword
    })

    const token = createToken(user._id)

    res.status(201).send({
        user,
        token
    })
})

const login = asyncHandler(async (req, res, next) => {
    if (!(await bcrypt.compare(req.body.password, req.body.user.password))) {
        return next(new ApiError('Incorrect email or password', 401))
    }

    const token = createToken(req.body.user._id)

    res.send({user: req.body.user, token})
})

const auth = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ApiError('Unauthorized', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.userId)

    if (!currentUser) {
        return next(new ApiError('This user does not longer exists'))
    }

    if (currentUser.passwordChangedAt) {
        const passwordChangedAtTimestamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000
        )

        if (passwordChangedAtTimestamp > decoded.iat) {
            return next(new ApiError('User recently change this password', 401))
        }
    }

    req.user = currentUser
    next()
})

const allowedTo = (...roles) =>
    asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError('You are not allowed to access this route', 403))
        }
        next()
    })

module.exports = {
    register,
    login,
    auth,
    allowedTo
}