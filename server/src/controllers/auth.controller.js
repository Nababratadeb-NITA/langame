const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/User');
const JWTSecret = process.env.JWTSecret || 'secret';

// Register controller
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      jwtTokens: [], // Initialize jwtTokens array
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Create and sign JWT for initial login
    const token = jwt.sign({ userId: savedUser._id }, JWTSecret, { expiresIn: '24h' });
    
    // Add the token to the user's jwtTokens array
    await savedUser.addToken(token);

    // Return response
    res.json({ message: 'Registration successful', user: savedUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign JWT
    const token = jwt.sign({ userId: user._id }, JWTSecret, { expiresIn: '24h' });

    // Add the token to the user's jwtTokens array
    await user.addToken(token);

    // Return response
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Logout Controller
exports.logout = async (req, res) => {
  try {
    // Access the user and token from the request
    const { user, token } = req;

    // Remove the token from the user's jwtTokens array
    await user.removeToken(token);

    res.json({ message: 'Logout successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};