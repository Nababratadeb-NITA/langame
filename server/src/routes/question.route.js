const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questions.controller');
const authenticateAdmin = require('../middleware/authMiddleware');

// Public routes
router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:id', questionController.getQuestionById);
router.get('/questions/language/:language', questionController.getQuestionsByLanguage);
router.get('/questions/language/:language/difficulty/:difficulty', questionController.getQuestionsByLanguageAndDifficulty);

// Admin routes (protected)
router.post('/admin/questions', authenticateAdmin, questionController.addQuestion);
router.put('/admin/questions/:id', authenticateAdmin, questionController.updateQuestion);
router.delete('/admin/questions/:id', authenticateAdmin, questionController.deleteQuestion);

module.exports = router;
