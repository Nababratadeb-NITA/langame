const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard.controller');

// Get overall leaderboard based on highest score
router.get('/', leaderboardController.getOverallLeaderboard);

// Get leaderboard based on highest score and highestScoreInLang for a specific language
router.get('/:language', leaderboardController.getLanguageLeaderboard);

module.exports = router;
