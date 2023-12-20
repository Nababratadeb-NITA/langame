const User = require('../models/User');

// Get overall leaderboard based on highest score
exports.getOverallLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({ highestScore: { $exists: true } }, 'username highestScoreInLang highestScore').sort({ highestScore: -1 });
    res.json({ leaderboard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get leaderboard based on highest score and highestScoreInLang for a specific language
exports.getLanguageLeaderboard = async (req, res) => {
  try {
    const { language } = req.params;
    const leaderboard = await User.find({ 
      highestScoreInLang: language,
      highestScore: { $exists: true } }, 'username highestScore').sort({ highestScore: -1 });
    res.json({ leaderboard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
