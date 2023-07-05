const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')

const createOne = Model => {
    return asyncHandler(async (req, res) => {
        const document = await Model.create(req.body)
        res.status(201).send(document)
    })
}

const getAll = Model => {
    return asyncHandler(async (req, res) => {

        let filter = {}

        if (req.filterObj) {
            filter = req.filterObj
        }

        const documentsCount = await Model.countDocuments()

        const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
            .paginate(documentsCount)
            .filter()
            .sort()
            .fields()

        const {mongooseQuery, paginationResult} = apiFeatures

        const documents = await mongooseQuery

        res.status(200).send({
            result: documents.length,
            paginationResult,
            data: documents
        })

    })
}

const getOne = Model => {
    return asyncHandler(async (req, res, next) => {
        const {id} = req.params

        const document = await Model.findById(id)
        if (!document) {
            return next(new ApiError(`No document for this id ${id}`, 404))
        }

        res.status(200).send(document)
    })
}

const updateOne = Model => {
    return asyncHandler(async (req, res, next) => {
        const {id} = req.params

        const document = await Model.findByIdAndUpdate(id, req.body, {new: true})
        if (!document) {
            return next(new ApiError(`No document for this id ${id}`, 404))
        }

        res.status(200).send(document)
    })
}

const deleteOne = Model => {
    return asyncHandler(async (req, res, next) => {
        const {id} = req.params

        const document = await Model.findByIdAndDelete(id)
        if (!document) {
            return next(new ApiError(`No document for this id ${id}`, 404))
        }

        res.status(204).send()
    })
}

module.exports = {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
}