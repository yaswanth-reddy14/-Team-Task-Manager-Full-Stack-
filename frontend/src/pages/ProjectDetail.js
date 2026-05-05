import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectAPI, taskAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';
import '../styles/Dashboard.css';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('tasks');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assigned_to: '',
    due_date: '',
  });
  const [memberData, setMemberData] = useState({
    email: '',
    role: 'Member',
  });

  const fetchData = useCallback(async () => {
    try {
      const [projectRes, tasksRes, membersRes] = await Promise.all([
        projectAPI.getProject(projectId),
        taskAPI.getTasks(projectId),
        projectAPI.getMembers(projectId),
      ]);
      setProject(projectRes.data);
      setTasks(tasksRes.data);
      setMembers(membersRes.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch project data');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchData();
    }
  }, [fetchData, projectId]);

  const emptyTaskData = {
    title: '',
    description: '',
    priority: 'Medium',
    assigned_to: '',
    due_date: '',
  };

  const formatDateForInput = (dateValue) => {
    if (!dateValue) return '';

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return '';

    const timezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
  };

  const resetTaskForm = () => {
    setTaskData(emptyTaskData);
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleStartCreateTask = () => {
    setTaskData(emptyTaskData);
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleStartEditTask = (task) => {
    const taskId = task._id || task.id;
    setTaskData({
      title: task.title || '',
      description: task.description || '',
      priority: task.priority || 'Medium',
      assigned_to: task.assigned_to?._id || task.assigned_to?.id || task.assigned_to || '',
      due_date: formatDateForInput(task.due_date),
    });
    setEditingTask({ id: taskId, title: task.title });
    setShowTaskForm(true);
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask.id, taskData);
        setSuccess('Task updated successfully.');
      } else {
        await taskAPI.createTask(projectId, taskData);
        setSuccess('Task created successfully.');
      }

      resetTaskForm();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${editingTask ? 'update' : 'create'} task`);
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    const deleteTarget = taskToDelete;
    setTaskToDelete(null);

    try {
      await taskAPI.deleteTask(deleteTarget.id);
      setSuccess('Task deleted successfully.');
      if (editingTask?.id === deleteTarget.id) {
        resetTaskForm();
      }
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskAPI.updateTask(taskId, { status: newStatus });
      setSuccess('Task status updated.');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await projectAPI.addMember(projectId, {
        ...memberData,
        email: memberData.email.trim().toLowerCase(),
      });
      setMemberData({ email: '', role: 'Member' });
      setSuccess('Member added successfully.');
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add member');
    }
  };

  const handleRemoveMember = async () => {
    if (!memberToRemove) return;

    try {
      await projectAPI.removeMember(projectId, memberToRemove.membershipId);
      setSuccess('Member removed successfully.');
      setMemberToRemove(null);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to remove member');
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!project) return <div className="container">Project not found</div>;

  const currentMember = members.find((member) => String(member.id) === String(user?.id));
  const canManageTeam = currentMember?.is_owner || currentMember?.role === 'Admin';

  return (
    <div className="container">
      <Toast message={error} type="error" onClose={() => setError('')} />
      <Toast message={success} type="success" onClose={() => setSuccess('')} />

      <div className="page-header">
        <div>
          <p className="eyebrow">Project</p>
          <h1>{project.name}</h1>
          <p className="page-subtitle">{project.description || 'No description added.'}</p>
        </div>
        {activeTab === 'tasks' && !showTaskForm && (
          <button onClick={handleStartCreateTask} className="btn btn-primary">
            New Task
          </button>
        )}
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button
          className={`tab ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          Team ({members.length})
        </button>
      </div>

      {activeTab === 'tasks' && (
        <div>
          {!showTaskForm ? (
            tasks.length === 0 && (
              <div className="empty-state">
                <h2>No tasks yet</h2>
                <p>Create a task, assign it to a member, and track the work from here.</p>
                <button onClick={handleStartCreateTask} className="btn btn-primary">
                  Create Task
                </button>
              </div>
            )
          ) : (
            <form onSubmit={handleSubmitTask} className="form">
              <h2>{editingTask ? 'Edit Task' : 'Create Task'}</h2>
              <input
                type="text"
                placeholder="Task Title"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={taskData.description}
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              />
              <select
                value={taskData.priority}
                onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <select
                value={taskData.assigned_to}
                onChange={(e) => setTaskData({ ...taskData, assigned_to: e.target.value })}
              >
                <option value="">Unassigned</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.username} ({member.role})
                  </option>
                ))}
              </select>
              <input
                type="datetime-local"
                value={taskData.due_date}
                onChange={(e) => setTaskData({ ...taskData, due_date: e.target.value })}
              />
              <button type="submit" className="btn btn-primary">
                {editingTask ? 'Save Changes' : 'Create Task'}
              </button>
              <button
                type="button"
                onClick={resetTaskForm}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </form>
          )}

          <div className="tasks-list">
            {tasks.map((task) => (
              <div key={task._id || task.id} className="task-item">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Assigned to: {task.assigned_to?.username || 'Unassigned'}</p>
                <div className="task-info">
                  <span className="priority">{task.priority}</span>
                  <select
                    value={task.status}
                    onChange={(e) => handleUpdateTaskStatus(task._id || task.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="TODO">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <button
                  onClick={() => handleStartEditTask(task)}
                  className="btn btn-small btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => setTaskToDelete({ id: task._id || task.id, title: task.title })}
                  className="btn btn-small btn-danger"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div>
          {canManageTeam && (
            <form onSubmit={handleAddMember} className="form">
              <h2>Add Team Member</h2>
              <input
                type="email"
                placeholder="Registered member email"
                value={memberData.email}
                onChange={(e) => setMemberData({ ...memberData, email: e.target.value })}
                required
              />
              <select
                value={memberData.role}
                onChange={(e) => setMemberData({ ...memberData, role: e.target.value })}
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
              <button type="submit" className="btn btn-primary">Add Member</button>
            </form>
          )}

          <div className="members-list">
            {members.map((member) => (
              <div key={member.id} className="member-item">
                <div>
                  <strong>{member.username}</strong>
                  <p>{member.email}</p>
                  <span className="role">{member.role}</span>
                </div>
                {canManageTeam && !member.is_owner && (
                  <button
                    onClick={() => setMemberToRemove({
                      membershipId: member.membership_id,
                      username: member.username,
                    })}
                    className="btn btn-small btn-danger"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmModal
        open={Boolean(taskToDelete)}
        title="Delete task?"
        message={`This will permanently remove "${taskToDelete?.title}".`}
        confirmText="Delete"
        onConfirm={handleDeleteTask}
        onCancel={() => setTaskToDelete(null)}
      />

      <ConfirmModal
        open={Boolean(memberToRemove)}
        title="Remove member?"
        message={`${memberToRemove?.username} will lose access to this project.`}
        confirmText="Remove"
        onConfirm={handleRemoveMember}
        onCancel={() => setMemberToRemove(null)}
      />
    </div>
  );
};

export default ProjectDetail;
