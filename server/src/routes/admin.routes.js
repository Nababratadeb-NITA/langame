const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

const Admin = require('../models/Admin');

// Admin login route
router.post('/login', adminController.login);

module.exports = router;
