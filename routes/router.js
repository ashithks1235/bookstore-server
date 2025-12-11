const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// google login
router.post('/google-login',userController.googleLoginController)

//-----authorised user----------

//add book
router.post('/user/book-add',jwtMiddleware,bookController.addBookController)

module.exports = router