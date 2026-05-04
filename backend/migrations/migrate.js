const { connect, disconnect } = require('../config/database');
const User = require('../models/User');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const Task = require('../models/Task');

const migrate = async () => {
  try {
    await connect();
    await Promise.all([
      User.syncIndexes(),
      Project.syncIndexes(),
      ProjectMember.syncIndexes(),
      Task.syncIndexes(),
    ]);
    console.log('MongoDB indexes synced successfully');
    await disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    await disconnect().catch(() => {});
    process.exit(1);
  }
};

migrate();
