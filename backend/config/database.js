const mongoose = require('mongoose');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL || process.env.MONGODB_URI || process.env.MONGO_URL;

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL, MONGODB_URI, or MONGO_URL environment variable');
}

module.exports = {
  connect: () => mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  disconnect: () => mongoose.disconnect(),
};
