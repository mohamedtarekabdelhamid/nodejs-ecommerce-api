const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'fail'

    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        sendErrorForProd(err, res)
    }
}

const sendErrorForDev = (err, res) => {
    res.status(err.statusCode).send({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorForProd = (err, res) => {
    res.status(err.statusCode).send({
        status: err.status,
        message: err.message,
    })
}

module.exports = {
    globalError
}