const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

const projectMemberMiddleware = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }
    
    const member = await ProjectMember.findOne({ project_id: projectId, user_id: req.user.id });

    if (!member) {
      const project = await Project.findById(projectId);
      
      if (!project || project.owner_id.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  projectMemberMiddleware
};
