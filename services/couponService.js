const Coupon = require('../models/couponModel')
const factory = require('../services/handlerFactory')

const createCoupon = factory.createOne(Coupon)
const getCoupons = factory.getAll(Coupon)
const getCoupon = factory.getOne(Coupon)
const updateCoupon = factory.updateOne(Coupon)
const deleteCoupon = factory.deleteOne(Coupon)

module.exports = {
    createCoupon,
    getCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}