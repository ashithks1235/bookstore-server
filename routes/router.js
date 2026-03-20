const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// google login
router.post('/google-login',userController.googleLoginController)
//home books
router.get('/home/books',bookController.getHomeBookController)


//-----authorised user----------
//------role:user------

//add book - request body in form data, header should has token
router.post('/user/book-add',jwtMiddleware,multerMiddleware.array('uploadIMG',3),bookController.addBookController)

//all user books
router.get('/all-books',jwtMiddleware,bookController.getUserAllBooksController)

//user books
router.get('/user-books',jwtMiddleware,bookController.getUserProfileBooksController)

//bought books
router.get('/user-books/bought',jwtMiddleware,bookController.getUserBoughtBooksController)

// edit user
router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.userProfileUpdateController)

//view books
router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)

//delete books
router.delete('/books/:id',jwtMiddleware,bookController.deleteBookController)

//buy book
router.put('/books/:id/buy',jwtMiddleware,bookController.bookPaymentController)


//------role:adimin------
//all admin books
router.get('/books/all',adminMiddleware,bookController.getAllBooksController)

//all users
router.get('/users/all',adminMiddleware,userController.allUserController)

//update book status
router.put('/books/:id/update',adminMiddleware,bookController.updateBookStatusController)

module.exports = router

