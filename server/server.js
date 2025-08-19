const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./config/Database');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); 
app.use(cors());

// Database connection
dbConnect();

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/Admin'));
app.use('/forgotPassword', require('./routes/ForgotPassword'));

// Default Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "✅ Hello from backend!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
