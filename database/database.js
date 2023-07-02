const mongoose = require('mongoose')

const dbConnection = () => {
    mongoose.connect(process.env.DB_URL_LOCAL).then(con => {
        console.log(`Database is running`)
    }).catch(err => {
        console.error(`Database connection failed`)
    })
}
module.exports = dbConnection