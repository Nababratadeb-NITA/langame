const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware')
const jwt = require('jsonwebtoken');
 
const Admin = require('../models/Admin');

// Admin login route
router.post('/login', adminController.login);
router.post('/logout',authenticateAdmin, adminController.logout);

router.post('/register',adminController.register);

module.exports = router;
