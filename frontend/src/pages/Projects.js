import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI } from '../api';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';
import '../styles/Dashboard.css';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectAPI.getProjects();
      setProjects(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleStartCreate = () => {
    setFormData({ name: '', description: '' });
    setEditingProject(null);
    setShowForm(true);
  };

  const handleStartEdit = (project) => {
    const projectId = project._id || project.id;
    setFormData({
      name: project.name || '',
      description: project.description || ''
    });
    setEditingProject({ id: projectId, name: project.name });
    setShowForm(true);
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectAPI.updateProject(editingProject.id, formData);
        setSuccess('Project updated successfully.');
      } else {
        await projectAPI.createProject(formData);
        setSuccess('Project created successfully.');
      }

      resetForm();
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${editingProject ? 'update' : 'create'} project`);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    const deleteTarget = projectToDelete;
    setProjectToDelete(null);

    try {
      await projectAPI.deleteProject(deleteTarget.id);
      setSuccess('Project deleted successfully.');
      if (editingProject?.id === deleteTarget.id) {
        resetForm();
      }
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete project');
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <Toast message={error} type="error" onClose={() => setError('')} />
      <Toast message={success} type="success" onClose={() => setSuccess('')} />

      <div className="page-header">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Projects</h1>
        </div>
        {!showForm && (
          <button onClick={handleStartCreate} className="btn btn-primary">
            New Project
          </button>
        )}
      </div>

      {!showForm ? (
        projects.length === 0 && (
          <div className="empty-state">
            <h2>No projects yet</h2>
            <p>Create your first project to start assigning tasks and tracking progress.</p>
            <button onClick={handleStartCreate} className="btn btn-primary">
              Create Project
            </button>
          </div>
        )
      ) : (
        <form onSubmit={handleSubmitProject} className="form">
          <h2>{editingProject ? 'Edit Project' : 'Create Project'}</h2>
          <input
            type="text"
            placeholder="Project Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit" className="btn btn-primary">
            {editingProject ? 'Save Changes' : 'Create'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </form>
      )}

      <div className="projects-grid">
        {projects.map((project) => {
          const projectId = project._id || project.id;

          return (
            <div key={projectId} className="project-card">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <div className="project-actions">
                <button
                  onClick={() => navigate(`/projects/${projectId}`)}
                  className="btn btn-small"
                >
                  View
                </button>
                <button
                  onClick={() => handleStartEdit(project)}
                  className="btn btn-small btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => setProjectToDelete({ id: projectId, name: project.name })}
                  className="btn btn-small btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmModal
        open={Boolean(projectToDelete)}
        title="Delete project?"
        message={`This will remove "${projectToDelete?.name}" and its team data.`}
        confirmText="Delete"
        onConfirm={handleDeleteProject}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  );
};

export default Projects;
