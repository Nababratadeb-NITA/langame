const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questions.controller');
const { authenticateAdmin } = require('../middleware/auth.middleware');

// Public routes
router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.get('/language/:language', questionController.getQuestionsByLanguage);
router.get('/language/:language/difficulty/:difficulty', questionController.getQuestionsByLanguageAndDifficulty);

// Admin routes (protected)
router.post('/', authenticateAdmin, questionController.addQuestion);
router.put('/:id', authenticateAdmin, questionController.updateQuestion);
router.delete('/:id', authenticateAdmin, questionController.deleteQuestion);

module.exports = router;
