const express = require('express');
const router = express.Router();
const userController = require('../controllers/userContoller');
const { authenticateUser } = require('../middleware/authMiddleware');

// getUser route
router.get('/:userId',authenticateUser, userController.getUserById);

//update Score route
router.post('/updateScore',authenticateUser, userController.updateUserScore);

module.exports = router;
