import React, { useCallback, useEffect, useState } from 'react';
import { taskAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = useCallback(async () => {
    try {
      const res = await taskAPI.getDashboardStats();
      setStats(res.data.stats);
      setOverdueTasks(res.data.overdue_tasks);
      setError('');
    } catch (err) {
      setError('Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>Welcome, {user?.username}!</h1>
      {error && <div className="error">{error}</div>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.total_tasks}</h3>
            <p>Total Tasks</p>
          </div>
          <div className="stat-card">
            <h3>{stats.todo_count}</h3>
            <p>To Do</p>
          </div>
          <div className="stat-card">
            <h3>{stats.in_progress_count}</h3>
            <p>In Progress</p>
          </div>
          <div className="stat-card">
            <h3>{stats.completed_count}</h3>
            <p>Completed</p>
          </div>
          <div className="stat-card danger">
            <h3>{stats.overdue_count}</h3>
            <p>Overdue</p>
          </div>
        </div>
      )}

      <h2>Overdue Tasks</h2>
      {overdueTasks.length > 0 ? (
        <div className="tasks-list">
          {overdueTasks.map((task) => (
            <div key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>Project: {task.project_name}</p>
              <p>Priority: {task.priority}</p>
              <p className="overdue-date">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No overdue tasks.</p>
      )}
    </div>
  );
};

export default Dashboard;
