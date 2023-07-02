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
    changeLoggedUserPassword
} = require('../services/userService')

const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserValidator
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
    .route('/')
    .post(
        auth,
        allowedTo('admin'),
        uploadSingleImage('avatar'),
        resizeSingleImage('avatar', 'user'),
        ...createUserValidator,
        createUser
    )
    .get(
        auth,
        allowedTo('admin'),
        getUsers
    )

router.route('/:id')
    .get(...getUserValidator, getUser)
    .put(
        auth,
        allowedTo('admin', 'vendor'),
        uploadSingleImage('avatar'),
        resizeSingleImage('avatar', 'user'),
        ...updateUserValidator,
        updateUser
    )
    .delete(
        auth,
        allowedTo('admin'),
        ...deleteUserValidator,
        deleteUser
    )

router.put(
    '/changePassword/:id',
    auth,
    allowedTo('admin', 'vendor, user'),
    ...changeUserPasswordValidator,
    changeUserPassword
)

module.exports = router