const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToDatabase = require('./database');

//Routes 
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
const port = 8000;

app.use(cors({
  origin: '*', // Change this to your actual Next.js app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods (optional)
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers (optional)
  credentials: true, // Send cookies in response (optional, required for login/auth)
}))

app.use(bodyParser.json());


connectToDatabase()

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
