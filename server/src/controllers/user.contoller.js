const User = require('../models/User');

// Get All users
exports.getAllUsers = async (req, res) => {
  try {
    // Find user by userId
    const users = await User.find();

    // Return user data
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
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
    const { highestScore, highestScoreInLang } = req.body;
    
    // Access the user from the request (populated by the middleware)
    const { user } = req;

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
