const jwt = require('jsonwebtoken');
const User =  require('../models/User'); 
const Admin = require('../models/Admin');

const JWTSecret = process.env.JWTSecret || 'secret';


const authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWTSecret);

    // Fetch admin from the database based on adminId in the decoded token
    const admin = await Admin.findOne({ _id: decoded.adminId });

    if (!admin) {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }

    req.admin = admin;
    req.token = token;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};


const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWTSecret);

    // Fetch user from the database based on userId in the decoded token
    const user = await User.findOne({ _id: decoded.userId, 'jwtTokens.token': token });
    const admin = await Admin.findOne({ _id: decoded.adminId })
    if (!user && !admin) {
      return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }

    if(user){
      req.user = user;
    }
    if(admin){
      req.user = admin;
    }
    req.token = token;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
};
