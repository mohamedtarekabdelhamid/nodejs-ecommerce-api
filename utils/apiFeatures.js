class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
        this.paginationResult = {}
    }

    filter() {
        const queryStringObj = {...this.queryString}
        const excludesFields = ['page', 'sort', 'limit', 'fields']

        excludesFields.forEach(field => delete queryStringObj[field])

        let queryStr = JSON.stringify(queryStringObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr))

        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.mongooseQuery = this.mongooseQuery.sort(sortBy)
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt')
        }

        return this
    }

    fields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.mongooseQuery = this.mongooseQuery.select(fields)
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v')
        }

        return this
    }

    paginate(documentsCount) {
        const page = +this.queryString.page || 1
        const limit = +this.queryString.limit || 10
        const skip = (page - 1) * limit
        const endPageIndex = page * limit

        this.paginationResult.currentPage = page
        this.paginationResult.limit = limit
        this.paginationResult.numberOfPages = Math.ceil(documentsCount / limit)

        if (endPageIndex < documentsCount) {
            this.paginationResult.next = page + 1
        }

        if (skip > 0) {
            this.paginationResult.prev = page - 1
        }

        this.mongooseQuery = this.mongooseQuery
            .skip(skip)
            .limit(limit)

        return this
    }
}

module.exports = ApiFeatures