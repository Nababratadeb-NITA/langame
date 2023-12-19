const express = require('express');
const router = express.Router();
const userController = require('../controllers/userContoller');

// getUser route
router.get('/:userId', userController.getUserById);

//update Score route
router.post('/updateScore',userController.updateUserScore);

module.exports = router;
