const authRoute = require('./authRoute')
const categoryRoute = require('./categoryRoute')
const subCategoryRoute = require('./subCategoryRoute')
const brandRoute = require('./brandRoute')
const productRoute = require('./productRoute')
const userRoute = require('./userRoute')
const reviewRoute = require('./reviewRoute')
const couponRoute = require('./couponRoute')

const mountRoutes = (app) => {
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/categories', categoryRoute)
    app.use('/api/v1/subcategories', subCategoryRoute)
    app.use('/api/v1/brands', brandRoute)
    app.use('/api/v1/products', productRoute)
    app.use('/api/v1/users', userRoute)
    app.use('/api/v1/reviews', reviewRoute)
    app.use('/api/v1/coupons', couponRoute)
}

module.exports = mountRoutes