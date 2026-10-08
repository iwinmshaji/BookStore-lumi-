const express = require("express")
const userController = require('../controllers/userController')

// object for router class in express
const router = new express.Router()

// register
router.post('/register', userController.registerController)

// login
router.post('/login', userController.loginController)

// google login
router.post('/google-login', userController.googleLoginController)

module.exports = router