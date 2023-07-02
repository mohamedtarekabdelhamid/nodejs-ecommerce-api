const jwt = require('jsonwebtoken')

const createToken = (payload) =>
    jwt.sign({userId: payload}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP_DATE
    })

module.exports = createToken