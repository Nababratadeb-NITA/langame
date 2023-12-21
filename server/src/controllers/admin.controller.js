const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const JWTSecret = process.env.JWTSecret || 'secret';


//Admin Register
exports.register = async (req,res)=>{
  const { username, password } = req.body;

  // Create new user
  const newAdmin = new Admin({
    username,
    password: password,
    jwtTokens: [], // Initialize jwtTokens array
  });

  // Save user to database
  const savedAdmin = await newAdmin.save();

  // Create and sign JWT for initial login
  const token = jwt.sign({ adminId: savedAdmin._id }, JWTSecret, { expiresIn: '24h' });
  
  // Add the token to the user's jwtTokens array
  await savedAdmin.addToken(token);

  // Return response
  res.json({ message: 'Registration successful', Admin: savedAdmin, token });
}
// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = (password === admin.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign JWT
    const token = jwt.sign({ adminId: admin._id }, JWTSecret, { expiresIn: '24h' });

    // Save the token to the admin's jwtTokens array
    admin.addToken(token);

    // Return response with token
    res.json({ message: 'Login successful', token, admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Admin logout
exports.logout = async (req, res) => {
  try {
    const admin = req.admin;

    // Remove the current token from the admin's jwtTokens array
    admin.removeToken(req.token);

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
