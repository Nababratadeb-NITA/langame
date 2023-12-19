const User = require('../models/User');

// Get one user by userId
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by userId
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update highest score and highestScoreLang for a user
exports.updateUserScore = async (req, res) => {
  try {
    const { userId, highestScore, highestScoreInLang } = req.body;

    // Find user by userId
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's highest score and highestScoreLang
    user.highestScore = highestScore;
    user.highestScoreInLang = highestScoreInLang;

    // Save updated user to the database
    const updatedUser = await user.save();

    // Return updated user data
    res.json({ message: 'User score updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
