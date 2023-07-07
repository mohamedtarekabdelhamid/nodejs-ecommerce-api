const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    expire: Date,
    discount: Number
}, {
    timestamps: true
})

const CouponModel = mongoose.model('Coupon', couponSchema)

module.exports = CouponModel