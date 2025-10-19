require('dotenv').config();

console.log("MONG_URI from .env:", process.env.MONG_URI); // debug

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/auth'); 
const mailRoutes = require('./routes/mail');

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS config (restrict origin in production)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // e.g., "https://yourfrontend.com"
    credentials: true,
  })
);

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', mailRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.MONG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
  });
