const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route 
router.get('/logout', authMiddleware, authController.logout);

module.exports = router;
