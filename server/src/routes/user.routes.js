const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.contoller');
const { authenticateUser } = require('../middleware/auth.middleware');

// getUser route
router.get('/',authenticateUser,userController.getAllUsers);
router.get('/:userId',authenticateUser, userController.getUserById);

//update Score route
router.post('/updateScore',authenticateUser, userController.updateUserScore);

module.exports = router;
