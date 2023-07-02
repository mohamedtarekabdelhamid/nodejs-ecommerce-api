const asyncHandler = require('express-async-handler')
const {v4: uuidv4} = require('uuid')
const sharp = require('sharp')

const resizeSingleImage = (filename, model, width = 600, height = 600, format = 'jpeg') => {
    return asyncHandler(async (req, res, next) => {
        const imageName = `${model}-${uuidv4()}-${Date.now()}.${format}`

        if (req.file) {
            await sharp(req.file.buffer)
                .resize({width, height})
                .toFormat(format)
                .jpeg({quality: 90})
                .toFile(`uploads/${model}/${imageName}`)

            req.body[filename] = imageName
        }

        next()
    })
}

const resizeCoverAndMultiImages = (
    model,
    coverWidth = 2000,
    coverHeight = 1333,
    imageWidth = 600,
    imageHeight = 600,
    format = 'jpeg') => {
    return asyncHandler(async (req, res, next) => {

        if (req.files.imageCover) {
            const imageCoverFileName = `${model}-${uuidv4()}-${Date.now()}-cover.${format}`

            await sharp(req.files.imageCover[0].buffer)
                .resize({width: coverWidth, height: coverHeight})
                .toFormat(format)
                .jpeg({quality: 90})
                .toFile(`uploads/${model}/${imageCoverFileName}`)

            req.body.imageCover = imageCoverFileName
        }

        if (req.files.images) {
            req.body.images = []

            await Promise.all(req.files.images.map(async (img, index) => {
                const filename = `${model}-${uuidv4()}-${Date.now()}-${index + 1}.${format}`

                await sharp(img.buffer)
                    .resize({width: imageWidth, height: imageHeight})
                    .toFormat(format)
                    .jpeg({quality: 90})
                    .toFile(`uploads/${model}/${filename}`)

                req.body.images.push(filename)
            }))
        }

        next()
    })
}

module.exports = {
    resizeSingleImage,
    resizeCoverAndMultiImages
}