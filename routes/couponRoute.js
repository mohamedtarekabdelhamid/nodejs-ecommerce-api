const express = require('express')

const router = express.Router()

const {
    createCoupon,
    getCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
} = require('../services/couponService')

const {
    createCouponValidator,
    getCouponValidator,
    updateCouponValidator,
    deleteCouponValidator
} = require('../utils/validators/couponValidator')

const {auth, allowedTo} = require('../services/authService')

router.use(
    auth,
    allowedTo('admin', 'vendor'),
)

router
    .route('/')
    .post(
        ...createCouponValidator,
        createCoupon
    )
    .get(getCoupons)

router.route('/:id')
    .get(...getCouponValidator, getCoupon)
    .put(
        ...updateCouponValidator,
        updateCoupon
    )
    .delete(
        ...deleteCouponValidator,
        deleteCoupon
    )

module.exports = router