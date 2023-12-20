const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware')
 
const Admin = require('../models/Admin');

// Admin login route
router.post('/login', adminController.login);
router.post('/logout',authenticateAdmin, adminController.logout);

module.exports = router;
