const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const connectToDatabase = require('./database');
const cors = require('cors');


const app = express();
const port = 8000;

app.use(cors({
  origin: '*', // Change this to your actual Next.js app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods (optional)
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers (optional)
  credentials: true, // Send cookies in response (optional, required for login/auth)
}))

app.use(bodyParser.json());


connectToDatabase


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username and check password
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send user information
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
