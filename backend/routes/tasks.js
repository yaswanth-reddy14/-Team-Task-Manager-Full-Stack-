const express = require('express');
const router = express.Router();
const { 
  createTask, 
  getTasks, 
  getTask, 
  updateTask, 
  deleteTask,
  getDashboardStats
} = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/auth');

router.get('/dashboard/stats', authMiddleware, getDashboardStats);

router.post('/:projectId', authMiddleware, createTask);
router.get('/:projectId', authMiddleware, getTasks);

router.get('/task/:taskId', authMiddleware, getTask);
router.put('/task/:taskId', authMiddleware, updateTask);
router.delete('/task/:taskId', authMiddleware, deleteTask);

module.exports = router;
