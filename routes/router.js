const express = require('express')
const userController = require('../controllers/userController')

const router = new express.Router()

// register
router.post('/register',userController.registerController)


module.exports = router