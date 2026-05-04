const Joi = require('joi');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');

const hasProjectAccess = async (projectId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return { project: null, allowed: false, invalid: true };
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return { project: null, allowed: false };
  }

  if (project.owner_id.toString() === userId) {
    return { project, allowed: true };
  }

  const member = await ProjectMember.findOne({ project_id: projectId, user_id: userId });
  return { project, allowed: Boolean(member) };
};

const isAssignableProjectUser = async (project, userId) => {
  if (!userId) {
    return true;
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return false;
  }

  if (project.owner_id.toString() === userId) {
    return true;
  }

  const member = await ProjectMember.findOne({ project_id: project._id, user_id: userId });
  return Boolean(member);
};

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('TODO', 'In Progress', 'Completed').default('TODO'),
  priority: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
  assigned_to: Joi.string().allow('', null).default(null),
  due_date: Joi.date().allow('', null).default(null),
});

const taskUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('TODO', 'In Progress', 'Completed'),
  priority: Joi.string().valid('Low', 'Medium', 'High'),
  assigned_to: Joi.string().allow('', null),
  due_date: Joi.date().allow('', null),
}).min(1);

// Create task
const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { project, allowed } = await hasProjectAccess(projectId, req.user.id);
    if (!project && !mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!allowed) {
      return res.status(403).json({ error: 'No access to this project' });
    }

    const { title, description, status, priority, assigned_to, due_date } = value;

    if (!(await isAssignableProjectUser(project, assigned_to))) {
      return res.status(400).json({ error: 'Assigned user must be a project owner or member' });
    }

    const task = new Task({
      project_id: projectId,
      title,
      description,
      status: status || 'TODO',
      priority: priority || 'Medium',
      assigned_to: assigned_to || null,
      created_by: req.user.id,
      due_date: due_date || null
    });

    await task.save();
    await task.populate(['assigned_to', 'created_by']);

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get tasks for project
const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, assigned_to } = req.query;

    const { project, allowed } = await hasProjectAccess(projectId, req.user.id);
    if (!project && !mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!allowed) {
      return res.status(403).json({ error: 'No access to this project' });
    }

    let filter = { project_id: projectId };

    if (status) {
      filter.status = status;
    }

    if (assigned_to) {
      filter.assigned_to = assigned_to;
    }

    const tasks = await Task.find(filter)
      .populate('assigned_to', 'username email')
      .populate('created_by', 'username email')
      .sort({ created_at: -1 });

    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get task by ID
const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await Task.findById(taskId)
      .populate('assigned_to', 'username email')
      .populate('created_by', 'username email')
      .populate('project_id');

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { allowed } = await hasProjectAccess(task.project_id._id, req.user.id);
    if (!allowed) {
      return res.status(403).json({ error: 'No access to this task' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const { error, value } = taskUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { project, allowed } = await hasProjectAccess(task.project_id, req.user.id);
    if (!allowed) {
      return res.status(403).json({ error: 'No access to this task' });
    }

    if (value.assigned_to !== undefined && !(await isAssignableProjectUser(project, value.assigned_to))) {
      return res.status(400).json({ error: 'Assigned user must be a project owner or member' });
    }

    // Update fields if provided
    if (value.title !== undefined) task.title = value.title;
    if (value.description !== undefined) task.description = value.description;
    if (value.status !== undefined) task.status = value.status;
    if (value.priority !== undefined) task.priority = value.priority;
    if (value.assigned_to !== undefined) task.assigned_to = value.assigned_to || null;
    if (value.due_date !== undefined) task.due_date = value.due_date || null;

    await task.save();
    await task.populate(['assigned_to', 'created_by']);

    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { allowed } = await hasProjectAccess(task.project_id, req.user.id);
    if (!allowed) {
      return res.status(403).json({ error: 'No access to this task' });
    }

    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ assigned_to: userId }).populate('project_id', 'name');

    const stats = {
      total_tasks: tasks.length,
      todo_count: tasks.filter(t => t.status === 'TODO').length,
      in_progress_count: tasks.filter(t => t.status === 'In Progress').length,
      completed_count: tasks.filter(t => t.status === 'Completed').length,
      overdue_count: tasks.filter(t => {
        return t.due_date && new Date(t.due_date) < new Date() && t.status !== 'Completed';
      }).length
    };

    const overdueTasks = tasks
      .filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'Completed')
      .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
      .map(task => ({
        id: task._id,
        title: task.title,
        project_name: task.project_id?.name || 'Unknown project',
        priority: task.priority,
        due_date: task.due_date
      }));

    res.json({
      stats,
      overdue_tasks: overdueTasks
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getDashboardStats
};
