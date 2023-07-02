const multer = require('multer')
const ApiError = require('../utils/apiError')

const multerOptions = () => {
    const multerStorage = multer.memoryStorage()

    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new ApiError('Only image allowed', 400), null)
        }
    }

    return multer({storage: multerStorage, fileFilter: multerFilter})
}

const uploadSingleImage = filename => multerOptions().single(filename)

const uploadMultiImages = arrayOfFields => multerOptions().fields(arrayOfFields)


module.exports = {
    uploadSingleImage,
    uploadMultiImages
}