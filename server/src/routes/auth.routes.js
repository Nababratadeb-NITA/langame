const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateUser } = require('../middleware/auth.middleware');


// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route 
router.get('/logout', authenticateUser, authController.logout);

module.exports = router;
