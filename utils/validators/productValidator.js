const {check} = require('express-validator')

const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const Category = require('../../models/categoryModel')
const SubCategory = require('../../models/subCategoryModel')

const ApiError = require('../apiError')
const slugify = require('slugify')

const createProductValidator = [
    check('title')
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({min: 3})
        .withMessage('Too short product name')
        .isLength({max: 200})
        .withMessage('Too long product name')
        .custom((val, {req}) => {
            req.body.slug = slugify(val)
            return true
        }),
    check('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({min: 20})
        .withMessage('Too short product description')
        .isLength({max: 2000})
        .withMessage('Too long product description'),
    check('imageCover')
        .notEmpty()
        .withMessage('Product image cover is required'),
    check('images')
        .optional()
        .isArray()
        .withMessage('Product images should be array'),
    check('category')
        .notEmpty()
        .withMessage('Product must be belong to category')
        .isMongoId()
        .withMessage('Invalid ID format')
        .custom(async categoryId => {
            const category = await Category.findById(categoryId)

            if (!category) {
                throw new ApiError('Category is not found', 400)
            }
        }),
    check('subcategories')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID format')
        .custom(async subcategoriesIds => {
            const result = await SubCategory.find({_id: {$exists: true, $in: subcategoriesIds}})

            if (result.length < 1 || result.length !== subcategoriesIds.length) {
                throw new ApiError('Subcategories ids are not found', 400)
            }
        })
        .custom(async (val, {req}) => {
            const subCategories = await SubCategory.find({category: req.body.category})
            const subCategoriesIdsForSpecificCategory = []

            subCategories.forEach(subCategory => {
                subCategoriesIdsForSpecificCategory.push(subCategory._id.toString())
            })

            const checker = (target, array) => target.every(ele => array.includes(ele))

            if (!checker(val, subCategoriesIdsForSpecificCategory)) {
                throw new ApiError('Subcategories not belong the category', 400)
            }
        }),
    check('brand')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID format'),
    check('quantity')
        .notEmpty()
        .withMessage('Product quantity is required')
        .isNumeric()
        .withMessage('Quantity must be numeric'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Product sold quantity must be numeric'),
    check('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be numeric')
        .isLength({max: 32})
        .withMessage('Too long price'),
    check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .withMessage('Price after discount must be numeric')
        .toFloat()
        // Custom validation...
    ,
    check('colors')
        .optional()
        .isArray()
        .withMessage('Product colors should be array'),
    check('ratingAverage')
        .optional()
        .isNumeric()
        .withMessage('Rating must be numeric')
        .isLength({min: 1})
        .withMessage('Rating must be above or equal 1.0')
        .isLength({max: 5})
        .withMessage('Rating must be below or equal 5.0'),
    check('ratingQuantity')
        .optional()
        .isNumeric()
        .withMessage('Rating quantity must be numeric'),
    validatorMiddleware
]

const getProductValidator = [
    check('id').isMongoId().withMessage('Invalid product Id'),
    validatorMiddleware
]

const updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid product Id'),
    check('title').optional().custom((val, {req}) => {
        req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware
]

const deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid product Id'),
    validatorMiddleware
]

module.exports = {
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator
}