const express = require('express')

const router = express.Router()

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    changeUserPassword,
    getLoggedUser,
    updateLoggedUser,
    deleteLoggedUser,
    activateLoggedUser,
    deactivateLoggedUser,
    changeLoggedUserPassword,
    addProductToWishlist,
    removeProductFromWishlist,
    getLoggedUserWishlist,
    addAddress,
    removeAddress,
    getLoggedUserAddresses
} = require('../services/userService')

const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserValidator,
    addProductToWishlistValidator,
    removeProductFromWishlistValidator,
    addAddressValidator,
    removeAddressValidator
} = require('../utils/validators/userValidator')

const {auth, allowedTo} = require('../services/authService')

const {uploadSingleImage} = require('../middlewares/uploadImagesMiddleware')
const {resizeSingleImage} = require('../middlewares/resizeImagesMiddleware')

router.use(auth)

router.get('/me', getLoggedUser, getUser)
router.put('/me/update', ...updateLoggedUserValidator, updateLoggedUser)
router.put('/me/activate', activateLoggedUser)
router.delete('/me/delete', deleteLoggedUser)
router.delete('/me/deactivate', deactivateLoggedUser)
router.put('/me/changePassword', changeLoggedUserPassword)
router
    .route('/me/wishlist')
    .post(
        allowedTo('user'),
        ...addProductToWishlistValidator,
        addProductToWishlist
    )
    .get(getLoggedUserWishlist)
router.delete(
    '/me/wishlist/:productId',
    ...removeProductFromWishlistValidator,
    removeProductFromWishlist
)
router
    .route('/me/addresses')
    .post(
        allowedTo('user'),
        ...addAddressValidator,
        addAddress
    )
    .get(getLoggedUserAddresses)
router.delete(
    '/me/addresses/:addressId',
    ...removeAddressValidator,
    removeAddress
)

router
    .route('/')
    .post(
        allowedTo('admin'),
        uploadSingleImage('avatar'),
        resizeSingleImage('avatar', 'user'),
        ...createUserValidator,
        createUser
    )
    .get(
        allowedTo('admin'),
        getUsers
    )

router.route('/:id')
    .get(...getUserValidator, getUser)
    .put(
        allowedTo('admin', 'vendor'),
        uploadSingleImage('avatar'),
        resizeSingleImage('avatar', 'user'),
        ...updateUserValidator,
        updateUser
    )
    .delete(
        allowedTo('admin'),
        ...deleteUserValidator,
        deleteUser
    )

router.put(
    '/changePassword/:id',
    allowedTo('admin', 'vendor, user'),
    ...changeUserPasswordValidator,
    changeUserPassword
)

module.exports = router