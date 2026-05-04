const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

const app = express();
const databaseUrl = process.env.DATABASE_URL || process.env.MONGODB_URI || process.env.MONGO_URL;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
if (!databaseUrl) {
  console.error('Missing DATABASE_URL, MONGODB_URI, or MONGO_URL environment variable');
  process.exit(1);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', database: 'MongoDB' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    mongoose.set('bufferCommands', false);

    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });

    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    if (databaseUrl.startsWith('mongodb+srv://')) {
      console.error('Atlas fix: add your current public IP in MongoDB Atlas -> Network Access, verify the database user password, and make sure the cluster is running.');
    }
    process.exit(1);
  }
};

startServer();
