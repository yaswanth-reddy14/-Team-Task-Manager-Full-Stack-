const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

const app = express();
const databaseUrl = process.env.DATABASE_URL || process.env.MONGODB_URI || process.env.MONGO_URL;
let databaseConnectionPromise = null;

const defaultAllowedOrigins = ['http://localhost:3000'];
const configuredAllowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set([...defaultAllowedOrigins, ...configuredAllowedOrigins]);

const connectDatabase = async () => {
  if (!databaseUrl) {
    throw new Error('Missing DATABASE_URL, MONGODB_URI, or MONGO_URL environment variable');
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!databaseConnectionPromise) {
    mongoose.set('bufferCommands', false);
    databaseConnectionPromise = mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
  }

  await databaseConnectionPromise;
};

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    res.status(500).json({ error: 'Database connection error' });
  }
});

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
    await connectDatabase();

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

if (require.main === module) {
  startServer();
}

module.exports = app;
