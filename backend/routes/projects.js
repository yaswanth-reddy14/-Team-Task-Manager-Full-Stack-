const express = require('express');
const router = express.Router();
const { 
  createProject, 
  getProjects, 
  getProject, 
  updateProject, 
  deleteProject,
  addMember,
  getMembers,
  removeMember
} = require('../controllers/projectController');
const { authMiddleware, projectMemberMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjects);

router.get('/:projectId', authMiddleware, projectMemberMiddleware, getProject);
router.put('/:projectId', authMiddleware, projectMemberMiddleware, updateProject);
router.delete('/:projectId', authMiddleware, projectMemberMiddleware, deleteProject);

router.post('/:projectId/members', authMiddleware, projectMemberMiddleware, addMember);
router.get('/:projectId/members', authMiddleware, projectMemberMiddleware, getMembers);
router.delete('/:projectId/members/:memberId', authMiddleware, projectMemberMiddleware, removeMember);

module.exports = router;
