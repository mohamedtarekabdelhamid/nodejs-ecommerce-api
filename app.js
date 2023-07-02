const path = require('path')

const express = require('express')
const morgan = require('morgan')

const {globalError} = require('./middlewares/errorMiddleware')
const dbConnection = require('./database/database')

const authRoute = require('./routes/authRoute')
const categoryRoute = require('./routes/categoryRoute')
const subCategoryRoute = require('./routes/subCategoryRoute')
const brandRoute = require('./routes/brandRoute')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const reviewRoute = require('./routes/reviewRoute')

const mode = process.env.NODE_ENV
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'uploads')))

dbConnection()

if (mode === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/categories', categoryRoute)
app.use('/api/v1/subcategories', subCategoryRoute)
app.use('/api/v1/brands', brandRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/reviews', reviewRoute)

app.use(globalError)

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
});