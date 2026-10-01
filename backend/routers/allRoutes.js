const express = require('express');
const userController = require('../controllers/userController');

// Create an Express router
const router = express.Router();

// Register route
router.post('/register', userController.registerController);

module.exports = router;