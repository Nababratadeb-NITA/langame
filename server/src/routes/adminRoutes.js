const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateAdmin } = require('../middleware/authMiddleware'); // Admin authentication middleware

// Admin login route
router.post('/admin/login', adminController.login);

module.exports = router;
