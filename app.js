const path = require('path')

const express = require('express')
const morgan = require('morgan')

const {globalError} = require('./middlewares/errorMiddleware')
const dbConnection = require('./database/database')

const mountRoutes = require('./routes')

const mode = process.env.NODE_ENV
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'uploads')))

dbConnection()

if (mode === 'development') {
    app.use(morgan('dev'))
}

mountRoutes(app)

app.use(globalError)

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})