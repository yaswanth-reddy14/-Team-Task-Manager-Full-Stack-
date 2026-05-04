const Joi = require('joi');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const User = require('../models/User');

const projectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('Active', 'Completed', 'Archived')
});

const memberSchema = Joi.object({
  user_id: Joi.string(),
  email: Joi.string().email().lowercase().trim(),
  role: Joi.string().valid('Admin', 'Member').default('Member')
}).or('user_id', 'email');

const canManageProject = async (project, userId) => {
  if (project.owner_id.toString() === userId) {
    return true;
  }

  const member = await ProjectMember.findOne({
    project_id: project._id,
    user_id: userId,
    role: 'Admin'
  });

  return Boolean(member);
};

// Create project
const createProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, description, status } = value;
    const project = new Project({
      name,
      description,
      owner_id: req.user.id,
      status: status || 'Active'
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all projects for user
const getProjects = async (req, res) => {
  try {
    const ownedProjects = await Project.find({ owner_id: req.user.id }).sort({ created_at: -1 });
    
    const memberProjects = await ProjectMember.find({ user_id: req.user.id })
      .populate('project_id')
      .sort({ added_at: -1 });

    const allProjects = [
      ...ownedProjects,
      ...memberProjects
        .map(pm => pm.project_id)
        .filter(project => project && !ownedProjects.find(op => op._id.equals(project._id)))
    ];

    res.json(allProjects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get project by ID
const getProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate('owner_id', 'username email');

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!(await canManageProject(project, req.user.id))) {
      return res.status(403).json({ error: 'Only project admins can update' });
    }

    project.name = value.name;
    project.description = value.description;
    if (value.status) project.status = value.status;
    
    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!(await canManageProject(project, req.user.id))) {
      return res.status(403).json({ error: 'Only project admins can delete' });
    }

    await Project.findByIdAndDelete(projectId);
    await ProjectMember.deleteMany({ project_id: projectId });
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add member to project
const addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { error, value } = memberSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { user_id, email, role } = value;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!(await canManageProject(project, req.user.id))) {
      return res.status(403).json({ error: 'Only project admins can add members' });
    }

    const user = user_id ? await User.findById(user_id) : await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found. Ask this teammate to sign up first, then add their registered email.' });
    }

    if (project.owner_id.toString() === user._id.toString()) {
      return res.status(400).json({ error: 'Project owner is already an admin' });
    }

    const existingMember = await ProjectMember.findOne({ project_id: projectId, user_id: user._id });
    if (existingMember) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    const member = new ProjectMember({
      project_id: projectId,
      user_id: user._id,
      role: role || 'Member'
    });

    await member.save();
    await member.populate(['project_id', 'user_id']);

    res.status(201).json(member);
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get project members
const getMembers = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate('owner_id', 'username email role');

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const members = await ProjectMember.find({ project_id: projectId })
      .populate('user_id', 'username email')
      .sort({ added_at: 1 });

    res.json([
      {
        id: project.owner_id._id,
        username: project.owner_id.username,
        email: project.owner_id.email,
        role: 'Admin',
        membership_id: null,
        is_owner: true
      },
      ...members
        .filter(member => member.user_id)
        .map(member => ({
          id: member.user_id._id,
          username: member.user_id.username,
          email: member.user_id.email,
          role: member.role,
          membership_id: member._id,
          is_owner: false
        }))
    ]);
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove member from project
const removeMember = async (req, res) => {
  try {
    const { projectId, memberId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!(await canManageProject(project, req.user.id))) {
      return res.status(403).json({ error: 'Only project admins can remove members' });
    }

    await ProjectMember.deleteOne({ project_id: projectId, _id: memberId });

    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addMember,
  getMembers,
  removeMember
};
